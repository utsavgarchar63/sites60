import dbConnect from "../../../lib/dbConnect";
const secret = process.env.NEXTAUTH_SECRET;
import initMiddleware from "../../../lib/initMiddleware";
import validateMiddleware from "../../../lib/validateMiddleware";
import { check, validationResult } from "express-validator";
import Contact from "../../../models/Contact";

export default async function handler(req, res) {
  
  await dbConnect();
  
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

   const validateBody = initMiddleware(
     validateMiddleware(
       [
         check("name")
           .escape()
           .trim()
           .isLength({ min: 2, max: 100 })
           .optional({ checkFalsy: true })
           .withMessage("Invalid Name"),
         check("email")
           .escape()
           .trim()
           .isEmail()
           .optional({ checkFalsy: true })
           .withMessage("Invalid Email"),
         check("phone")
           .matches(phoneRegExp)
           .optional({ checkFalsy: true })
           .withMessage("Invalid Phone Number"),
         check("message")
           .escape()
           .trim()
           .isLength({ min: 2, max: 5000 })
           .withMessage("Invalid Message")
           .optional({ checkFalsy: true }),
       ],
       validationResult
     )
   );
  
    const { method } = req;

    switch (method) {
      case "POST":
        try {

          console.log("Post Request>>>>", req.body);
          await validateBody(req, res);

          const errors = validationResult(req);
          
          if (!errors.isEmpty()) {
            console.log("Error>>>>", errors.array());
            return res
              .status(422)
              .json({ errors: errors.array(), success: false });
          }
          else
          {
            let contactInfo = await Contact.create({
                smartsite_id: req.body.smartsite_id,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message,
            });
            
            console.log("contactInfo>>>>>", contactInfo);

            res.status(200).json({ success: true });
          }

         
        } catch (error) {

          console.log("Error>>>>", error);
          res.status(400).json({ success: false });
        }
        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  
}
