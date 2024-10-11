const { readFileSync } = require("fs");
const { execSync } = require("node:child_process");
const { join } = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
import { parseString } from "xml2js";

import dbConnect from "../../../lib/dbConnect";
import { fetchRecords } from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";

import * as dbVars from "../../../sites60-0841df01437a.js";
import { log } from "console";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {
    await dbConnect();

    const { method } = req;

    switch (method) {
      // case "GET":
      //   try {
      //     let url = req.url;

      //     let getObj = {
      //       modal: "UserInfo",
      //       url: url,
      //       type: "findOne",
      //       selectFields: [
      //         "verified_email",
      //         "verified_phone",
      //         "onboarded",
      //         "revoked_access",
      //         "trial_expires",
      //         "is_paid_user",
      //         "profile_pic",
      //         "plan_id",
      //       ],
      //       condition: { user_id: user_id },
      //     };

      //     let userInfo = await fetchRecords(getObj);

      //     res.status(200).json({ success: true, userInfo: userInfo });
      //   } catch (error) {
      //     res.status(400).json({ success: false });
      //   }
      //   break;

      case "POST":
        try {
          let url = req.url;
          // const API_KEY = '920f2429510b427ebf8a8d5f394737b4'; // Replace with your Namecheap API key
          // const USERNAME = "venky"; // Replace with your Namecheap username
          // const CLIENT_IP = "122.173.158.124"; // Replace with your IP address
          const API_KEY = "4a5adbfd2d7f456d89a34feebf18d7f5"; // Replace with your Namecheap API key
          const USERNAME = "Sites60"; // Replace with your Namecheap username
          const CLIENT_IP = "49.37.131.24"; // Replace with your IP address

          if (req.body.type == "search") {
            try {
              let searchTerm = req.body.searchTerm;

              const apiBaseURL = "https://api.namecheap.com/xml.response";

              // Function to send requests to the Namecheap API
              const sendRequest = async (params) => {
                console.log(params, "params>>");
                try {
                  const response = await axios.get(apiBaseURL, { params });
                  return response.data;
                } catch (error) {
                  res.status(400).json({ success: false });

                  console.error("Error:", error.message);
                  throw error;
                }
              };

              // Function to search for available domains based on a query
              const searchDomains = async (query) => {
                const params = {
                  ApiUser: USERNAME,
                  ApiKey: API_KEY,
                  UserName: USERNAME,
                  Command: "namecheap.domains.check",
                  ClientIp: CLIENT_IP,
                  // RequestIP: CLIENT_IP,
                  DomainList: query,
                };
                const result = await sendRequest(params);
                return result;
              };

              const result = await searchDomains(searchTerm);

              console.log(result, "result");

              parseString(
                result,
                { trim: true, explicitArray: false },
                async (err, parsedResult) => {
                  if (err) {
                    console.error("Error parsing XML:", err);
                    res.status(400).json({ success: false });
                  } else {
                    // Extract domain availability and pricing details

                    const domainInfo =
                      parsedResult.ApiResponse.CommandResponse
                        ?.DomainCheckResult.$;

                    // You may need to adapt this based on the actual structure of the XML response
                    const domainAvailability = domainInfo?.Available === "true";
                    // Include availability and pricing in the response
                    const jsonResponse = {
                      success: true,
                      availability: domainAvailability,
                      domain: searchTerm,
                    };

                    let domainEnding = await extractDomain(searchTerm);

                    if (domainAvailability) {
                      const pricingParams = {
                        ApiUser: USERNAME,
                        ApiKey: API_KEY,
                        UserName: USERNAME,
                        Command: "namecheap.users.getPricing",
                        ClientIp: CLIENT_IP,
                        RequestIP: CLIENT_IP,
                        ProductType: "DOMAIN",
                        ProductCategory: "DOMAINS",
                        ActionName: "REGISTER",
                        ProductName: domainEnding.toUpperCase(),
                      };

                      try {
                        const pricingResult = await sendRequest(pricingParams);

                        parseString(
                          pricingResult,
                          { trim: true, explicitArray: false },
                          async (err, parsedResult) => {
                            if (err) {
                              console.error("Error parsing XML:", err);
                              res.status(400).json({ success: false });
                            } else {
                              const domainInfoList = parsedResult;

                              let finalPriceList =
                                domainInfoList.ApiResponse.CommandResponse
                                  .UserGetPricingResult.ProductType
                                  .ProductCategory.Product.Price;

                              jsonResponse["pricing"] = finalPriceList;
                              res.status(200).json(jsonResponse);
                            }
                          }
                        );
                      } catch (error) {
                        console.log(error, "error ");
                        res.status(400).json({ success: false });
                      }
                      // Extract pricing details for the specific TLD (Top-Level Domain) you are interested in
                      // Adjust this part based on the structure of the API response
                      // const tldPricing = pricingResult.TldList.find((tld) => tld.Tld === '.com');

                      // Include pricing details in the response
                      // jsonResponse.price = tldPricing?.Price;
                    } else {
                      res.status(200).json(jsonResponse);
                    }
                  }
                }
              );
            } catch (error) {
              console.error("Error:", error);
              res.status(400).json({ success: false });
            }
          } else if (req.body.type == "buy") {
            const domainToBuy = req.body.domainName;
            const apiUrl = "https://api.sandbox.namecheap.com/xml.response";
            const command = "namecheap.domains.create";

            const requestBody = {
              ApiUser: USERNAME,
              ApiKey: API_KEY,
              UserName: USERNAME, // You might need to adjust this based on the Namecheap API requirements
              ClientIp: CLIENT_IP,
              Command: command,
              DomainName: domainToBuy,
              Years: 1,
              RegistrantFirstName: req.body.registrantFirstName,
              RegistrantLastName: req.body.registrantLastName,
              RegistrantAddress1: req.body.registrantAddress,
              RegistrantCity: req.body.city,
              RegistrantStateProvince: req.body.stateProvince,
              RegistrantPostalCode: req.body.postalCode,
              RegistrantCountry: req.body.country,
              RegistrantPhone: addPeriodToPhoneNumber(req.body.phoneNumber),
              RegistrantEmailAddress: req.body.emailAddress,
              RegistrantOrganizationName: req.body.organizationName,
              TechFirstName: req.body.registrantFirstName,
              TechLastName: req.body.registrantLastName,
              TechAddress1: req.body.registrantAddress,
              TechCity: req.body.city,
              TechStateProvince: req.body.stateProvince,
              TechPostalCode: req.body.postalCode,
              TechCountry: req.body.country,
              TechPhone: addPeriodToPhoneNumber(req.body.phoneNumber),
              TechEmailAddress: req.body.emailAddress,
              TechOrganizationName: req.body.organizationName,
              AdminFirstName: "App",
              AdminLastName: "Space",
              AdminAddress1: "Hyderabad",
              AdminCity: "Hyderabad",
              AdminStateProvince: "TG",
              AdminPostalCode: "500034",
              AdminCountry: "IN",
              AdminPhone: "+91.8297087872",
              AdminEmailAddress: "apps@appspace.co.in",
              AdminOrganizationName: "Appspace Technologies Pvt Ltd",
              AuxBillingFirstName: "App",
              AuxBillingLastName: "Space",
              AuxBillingAddress1: "Hyderabad",
              AuxBillingCity: "Hyderabad",
              AuxBillingStateProvince: "TG",
              AuxBillingPostalCode: "500034",
              AuxBillingCountry: "IN",
              AuxBillingPhone: "+91.8297087872",
              AuxBillingEmailAddress: "apps@appspace.co.in",
              AddFreeWhoisguard: "",
              WGEnabled: "",
              GenerateAdminOrderRefId: "",
              IsPremiumDomain: "",
              EapFee: "",
              // Add other required parameters based on Namecheap API documentation
            };

            try {
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(requestBody).toString(),
              });

              if (!response.ok) {
                res.status(500).json({ success: false });
                return res
                  .status(response.status)
                  .json({ error: "Failed to buy the domain." });
              }

              const rawData = await response.text();
              // Parse the XML response
              parseString(
                rawData,
                { trim: true, explicitArray: false },
                (err, result) => {
                  if (err) {
                    console.error("Error parsing XML:", err);
                    return res
                      .status(500)
                      .json({ error: "Failed to parse XML response." });
                  }

                  const apiResponse = result.ApiResponse;
                  if (apiResponse && apiResponse.$.Status === "OK") {
                    // The domain purchase was successful
                    return res
                      .status(200)
                      .json({ success: "Domain purchased successfully." });
                  } else {
                    // Handle the case where the domain purchase was not successful
                    const errorMessage = apiResponse.Errors.Error._
                      ? apiResponse.Errors
                      : "Unknown error";
                    return res.status(400).json({
                      error: `Failed to buy the domain. ${apiResponse.Errors.Error._}`,
                    });
                  }
                }
              );
            } catch (error) {
              console.error("Error during API request:", error);
              return res
                .status(500)
                .json({ error: "An error occurred. Please try again later." });
            }
          } else if (req.body.type == "connect") {
            const domainToConnect = req.body.domainName;

            const makeApiRequest = async (requestBody) => {
              try {
                const url = "https://api.sandbox.namecheap.com/xml.response";

                const response = await fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: new URLSearchParams(requestBody).toString(),
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.text();
                return result;
              } catch (error) {
                res.status(400).json({ success: false });
                console.error("Error making API request:", error);
                throw error;
              }
            };

            const parseXmlResponse = (xmlResponse) => {
              return new Promise((resolve, reject) => {
                parseString(
                  xmlResponse,
                  { trim: true, explicitArray: false },
                  (err, result) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  }
                );
              });
            };

            const setARecord = async () => {
              try {
                const requestBody = {
                  ApiUser: USERNAME,
                  ApiKey: API_KEY,
                  UserName: USERNAME, // You might need to adjust this based on the Namecheap API requirements
                  ClientIp: CLIENT_IP,
                  Command: "namecheap.domains.dns.setHosts",
                  SLD: domainToConnect.split(".")[0],
                  TLD: domainToConnect.split(".")[1],
                  request: {
                    RequestValues: [
                      {
                        Key: "HostName",
                        Value: "@",
                      },
                      {
                        Key: "RecordType",
                        Value: "A",
                      },

                      {
                        Key: "Address",
                        Value: CLIENT_IP,
                      },
                    ],
                  },

                  Address: CLIENT_IP,
                  TTL: "1800", // TTL in seconds (adjust as needed)
                };

                const xmlResponse = await makeApiRequest(requestBody);
                const parsedResponse = await parseXmlResponse(xmlResponse);

                // Check for errors in the response
                if (parsedResponse.ApiResponse.$.Status === "ERROR") {
                  const errorMessage =
                    parsedResponse.ApiResponse.Errors.Error._;
                  res.status(400).json({ success: false });
                  throw new Error(`Error setting A record: ${errorMessage}`);
                }

                setCnameRecord();
              } catch (error) {
                console.error("Error setting A record:", error.message);
                res.status(400).json({ success: false });
              }
            };

            const setCnameRecord = async () => {
              try {
                const requestBody = {
                  ApiUser: USERNAME,
                  ApiKey: API_KEY,
                  UserName: USERNAME, // You might need to adjust this based on the Namecheap API requirements
                  ClientIp: CLIENT_IP,
                  Command: "namecheap.domains.dns.setHosts",
                  SLD: domainToConnect.split(".")[0],
                  TLD: domainToConnect.split(".")[1],

                  request: {
                    RequestValues: [
                      {
                        Key: "HostName",
                        Value: "www",
                      },
                      {
                        Key: "RecordType",
                        Value: "CNAME",
                      },
                      {
                        Key: "Address",
                        Value: domainToConnect,
                      },
                    ],
                  },
                  Address: domainToConnect,
                  TTL: "1800", // TTL in seconds (adjust as needed)
                };

                const xmlResponse = await makeApiRequest(requestBody);
                const parsedResponse = await parseXmlResponse(xmlResponse);

                // Check for errors in the response
                if (parsedResponse.ApiResponse.$.Status === "ERROR") {
                  const errorMessage =
                    parsedResponse.ApiResponse.Errors.Error._;
                  res.status(400).json({ success: false });
                  throw new Error(
                    `Error setting CNAME record: ${errorMessage}`
                  );
                }

                res
                  .status(200)
                  .json({ success: "Domain connected successfully." });
              } catch (error) {
                console.error("Error setting CNAME record:", error.message);
                res.status(400).json({ success: false });
              }
            };

            setARecord();
          }
        } catch (error) {
          console.error("Error>>>>", error);
          res.status(400).json({ success: false });
        }

        break;

      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, message: "Not Authorized" });
  }
}

function addPeriodToPhoneNumber(phoneNumber) {
  // if (typeof phoneNumber !== 'string') {
  //   throw new Error('Input must be a string');
  // }

  // Extract the first 3 characters
  const firstThreeDigits = phoneNumber.slice(0, 3);

  // Extract the remaining characters
  const remainingDigits = phoneNumber.slice(3);

  // Concatenate with a period ('.') in between
  const formattedPhoneNumber = firstThreeDigits + "." + remainingDigits;

  return formattedPhoneNumber;
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
const extractDomain = (url) => {
  // Remove protocol (http, https) and www from the URL
  const withoutProtocol = url.replace(/(^\w+:|^)\/\//, "");
  const withoutWww = withoutProtocol.replace(/^www\./, "");

  // Extract only the domain name
  const parts = withoutWww.split(".");

  const extractedDomain =
    parts.length > 1 ? parts.slice(1).join(".") : withoutWww;
  return extractedDomain;
};
