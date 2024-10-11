
const companyName = "Sites60"
const companyLogo =
  "https://app.sites60.com/main-logo.png";

const verificationRules = [
  {
    role: "owner",
    verify_email: true,
    verify_phone: false,
    verify_onboard: true,
    verify_revoke: true,
    sms_gateway: "firebase", //firebase or //internal
  },
  {
    role: "customer",
    verify_email: true,
    verify_phone: false,
    verify_onboard: false,
    verify_revoke: true,
    sms_gateway: "firebase",
  },
];



module.exports = {
  verificationRules, companyName, companyLogo
}
