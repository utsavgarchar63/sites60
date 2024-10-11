const SibApiV3Sdk = require("sib-api-v3-sdk");
const defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;


let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        
  const sendEmail = (sendSmtpEmail) => {
  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
      console.log("Email Sent>>>", data);
      return true;
    },
    function (error) {
      console.log("Email Sent Failed>>", error);
      return false;
    }
  );
  };
    

module.exports = sendEmail;