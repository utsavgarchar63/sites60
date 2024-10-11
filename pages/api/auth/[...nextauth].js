import NextAuth from "next-auth";
import dbConnect from "../../../lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import UserInfo from "../../../models/UserInfo";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import { v4 as uuidv4 } from "uuid";
import randomstring from "randomstring";
import sendLeads from "../../../lib/sendLeads";
import {
  verificationRules,
  companyName,
  companyLogo,
} from "../../../lib/customRules";
import sendEmail from "../../../lib/emailController";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,

  //The providers are the authentication method
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", role: "role" },
        mobile: { label: "Mobile", type: "mobile" },
      },
      async authorize(credentials, req) {
        try {
          await dbConnect();
          const email = credentials.email;
          const password = credentials.password;
          const role = credentials.role;
          const mobile = credentials.mobile;

 
          if (role == "owner") {
            const user = await User.findOne({ email: email });
 
            if (!user) {
              return null;
            }
            if (user) {
              let allow = await signInUser({ password, user });

              if (allow == true) {
                return user;
              } else {
                return null;
              }
            }
          }
        } catch (error) {
          console.log(error , "<error nextauth")
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
  ],
  // adapter: FirestoreAdapter({
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   appId: process.env.FIREBASE_APP_ID,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   // Optional emulator config (see below for options)
  //   emulator: {},
  // }),
  pages: {
    signIn: "/login",
  },
  database: process.env.MONGODB_URI,
  callbacks: {
    async jwt({ token, user, account }) {
      await dbConnect();
     
      if (account) {

        try {
          let platform = account.provider;

          let name = "";
          let email = "";
          let image = "";
          let fname = "";
          let lname = "";
  
          if (platform != "credentials") {
           
            name = user.name;
            email = user.email;
            image = user.image;
  console.log("heeeeeeeerrrrrrr")
            const count = await User.countDocuments({ email: email });
  
   
            if (count == 0) {
              const verification_key = uuidv4();
              const salt = await bcrypt.genSalt(12);
  
              let tempPwd = randomstring.generate({
                length: 8,
                charset: "alphanumeric",
              });
  
              const hash = await bcrypt.hash(tempPwd, salt);
  
              let role = "owner";
  
              let uid = randomstring.generate({
                length: 8,
                charset: "alphanumeric",
              });
  
              let nameList = name.split(" ");
  
              if (nameList.length > 0) {
                fname = nameList[0];
                lname = nameList[1];
              } else {
                fname = nameList[0];
                lname = nameList[0];
              }
  
              let currentDate = new Date();
  
              let uInfo = await User.create({
                uid: uid,
                first_name: fname,
                last_name: lname,
                email: email,
                from: platform,
                pic: image,
                role: role,
                verification_key: verification_key,
                verification_expires: currentDate.getTime() + 7200000,
                password: hash,
              });
  
              token.sub = uInfo._id;
  
              createUserInfo(uInfo._id, uInfo.role, {
                fname: fname,
                email: email,
                uuid: verification_key,
              });
  
              sendLeads(fname, lname, email, uid, role);
            } else {
              const response = await fetch(
                process.env.NEXT_PUBLIC_BASE_URL + "/api/getUser?email=" + email
              );
              const data = await response.json();
              token.sub = data.userInfo._id;
            }
          }
  
          token.accessToken = account.access_token;
        } catch (error) {
          console.log(error , "Next auth error");
        }

      


      }
      return token;
    },
  },
});

const signInUser = async ({ password, user }) => {
  await dbConnect();
  let allow = true;

  if (!password) {
    allow = false;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    allow = false;
  }

  return allow;
};

async function createUserInfo(user_id, role, more_info) {
  try {
    if (role == "owner") {
      UserInfo.create({
        user_id: user_id,
      });

      let userRule = verificationRules.filter((e) => e.role === "owner")[0];

      // Send Verification Email Logic
      if (userRule.verify_email == true) {
        console.log("Send Verification Email>>>>");

        var importEmail = require("../../../emails/verify-email");

        let verifyURL =
          process.env.LIVE_URL + "/confirm-email?key=" + more_info.uuid;
        let verifyTemplate = importEmail.emailTemplate(
          more_info.fname,
          companyName,
          companyLogo,
          verifyURL
        );

        let sendSmtpEmail = {
          subject: `${companyName} - Verify your Email`,
          sender: { email: "support@sites60.com", name: companyName },
          replyTo: { email: "support@sites60.com", name: companyName },
          to: [{ name: more_info.fname, email: more_info.email }],
          htmlContent: verifyTemplate,
        };

        sendEmail(sendSmtpEmail);
      } else {
        console.log("Ignore Send Verification Email>>>>");
      }
    }
  } catch (error) {
    console.log("createUserInfo Error>>>>", error);
  }
}
