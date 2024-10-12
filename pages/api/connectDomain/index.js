const { GoogleAuth } = require('google-auth-library');


import dbConnect from "../../../lib/dbConnect";
import {
  fetchRecords,
  updateRecord
} from "../../../lib/genericController";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret });
  const user_id = token.sub;

  if (token) {

    await dbConnect();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
              let url = req.url;
    
              let getObj = {
                modal: "Smartsite",
                url: url,
                condition: { user_id: user_id, is_del: false },
                selectFields: [
                  "key",
                  "title",
                  "siteKey",
                  "description",
                  "color",
                  "font",
                  "status",
                  "thumbnail",
                  "created_at",
                  "trial_expires",
                  "is_paid",
                  "subscription_start",
                  "subscription_end",
                  "link_domain",
                  "ip_address"
                ],
                type: "find",
              };
    
              let smartsitesInfo = await fetchRecords(getObj);
    
              // console.log("smartsitesInfo>>>>>>", smartsitesInfo);
    
              res.status(200).json({ success: true, list: smartsitesInfo });
            } catch (error) {
              console.log("Error>>>>", error);
              res.status(400).json({ success: false });
            }
            break;

        case "POST":
            try {
              let url = req.url;
              let domain = req.body.domain;
              let siteKey = req.body.siteKey;


                      try {
                        // Ping the google recaptcha verify API to verify the captcha code you received

                            async function getAccessToken() {
                            const keyFilePath = 'sites60-0841df01437a.js';

                            // Create a new GoogleAuth instance
                            const auth = new GoogleAuth({
                                keyFile: {
     																type: "service_account",
																     project_id: process.env.PROJECT_ID,
																     private_key_id: process.env.PRIVATE_KEY_ID,
																     private_key: process.env.PRIVATE_KEY,
																     client_email: process.env.CLIENT_EMAIL,
																     client_id: process.env.CLIENT_ID,
																     auth_uri: process.env.AUTH_URI,
																     token_uri: process.env.TOKEN_URI,
																     auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
																     client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
																     universe_domain: process.env.UNIVERSE_DOMAIN
																},
                                scopes: ['https://www.googleapis.com/auth/compute'],
                            });

                            // Get the JWT token
                            const jwtToken = await auth.getAccessToken();
                            // Extract the access token from the JWT token
                            const accessToken = jwtToken;

                            return accessToken;
                            }


                          function generateSslCertificateName(domain) {
                              const domainParts = domain.split('.');
                              const domainName = domainParts[0];
                              const domainExtension = domainParts[1];

                              // Generate a unique name using domain name, extension, and timestamp
                              const uniqueName = `${domainName}-${domainExtension}`;                       

                              return uniqueName;
                          }

                            // Example usage
                            getAccessToken()
                            .then(async (accessToken) => {
                    
                                const project = 'sites60';
                                const sslCertificateName = generateSslCertificateName(domain);

                                const domainName = domain; // Replace with the actual domain from the input box
                    
                                // Step 1: Create SSL Certificate
                                const sslCertificateUrl = `https://compute.googleapis.com/compute/v1/projects/${project}/global/sslCertificates`;
                    
                                const sslCertificateRequestBody = {
                                    name: sslCertificateName,
                                    type: 'MANAGED',
                                    managed: {
                                        domains: [domainName],
                                    },
                                };
                    
                                const sslCertificateResponse = await fetch(sslCertificateUrl, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${accessToken}`,
                                    },
                                    body: JSON.stringify(sslCertificateRequestBody),
                                });
                    
                                if (sslCertificateResponse.ok || sslCertificateResponse.status == 409) {
                                    if (sslCertificateResponse.status == 409) {
                                        console.log('SSL Certificate already exists');
                                    }
                    
                                    // Step 2: Register Domain
                                    const targetHttpsProxyUrl = `https://compute.googleapis.com/compute/v1/projects/${project}/global/targetHttpsProxies`;
                    
                                    const targetHttpsProxyRequestBody = {
                                        "name": `lb-sites60-target-proxy-${sslCertificateName}`,
                                        "quicOverride": "NONE",
                                        "sslCertificates": [
                                            `projects/${project}/global/sslCertificates/${sslCertificateName}`
                                        ],
                                        "urlMap": `projects/${project}/global/urlMaps/lb-sites60`
                                    };
                    
                                    const targetHttpsProxyResponse = await fetch(targetHttpsProxyUrl, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${accessToken}`,
                                        },
                                        body: JSON.stringify(targetHttpsProxyRequestBody),
                                    });
                    
                                    if (targetHttpsProxyResponse.ok || targetHttpsProxyResponse.status == 409) {
                                        if (targetHttpsProxyResponse.status == 409) {
                                            console.log('Domain already registered');
                                        }
                    
                                        // Step 3: Create IP Address (added step)
                                        const ipAddressUrl = `https://compute.googleapis.com/compute/v1/projects/${project}/global/addresses`;
                    
                                        const ipAddressRequestBody = {
                                            "ipVersion": "IPV4",
                                            "name": sslCertificateName,
                                            "networkTier": "PREMIUM"
                                        };
                  
                                        const ipAddressResponse = await fetch(ipAddressUrl, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${accessToken}`,
                                            },
                                            body: JSON.stringify(ipAddressRequestBody),
                                        });
                    
                                        if (ipAddressResponse.ok) {

                                            await new Promise((resolve) => setTimeout(resolve, 3000));


                                        const ipAddressListUrl = `https://compute.googleapis.com/compute/v1/projects/${project}/global/addresses`;

                                        const ipAddressListResponse = await fetch(ipAddressListUrl, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: `Bearer ${accessToken}`,
                                        },
                                        });

                                        if (ipAddressListResponse.ok) {
                                        const ipAddressListData = await ipAddressListResponse.json();      
                                        
                                        const matchingIpAddressItem = ipAddressListData.items.find(item => item.name === sslCertificateName);

                                        if (matchingIpAddressItem) {
                                        // The matching IP address was found
                                        const matchingIpAddress = matchingIpAddressItem.address;
                                                                                                                    

                                        await new Promise((resolve) => setTimeout(resolve, 5000));

                                        // Step 4: Create Forwarding Rule
                                        const forwardingRuleUrl = `https://compute.googleapis.com/compute/v1/projects/${project}/global/forwardingRules`;
                    
                                        const forwardingRuleRequestBody = {
                                            "IPAddress": `projects/${project}/global/addresses/${sslCertificateName}`,
                                            "IPProtocol": "TCP",
                                            "loadBalancingScheme": "EXTERNAL_MANAGED",
                                            "name": sslCertificateName,
                                            "networkTier": "PREMIUM",
                                            "portRange": "443",
                                            "target": `projects/${project}/global/targetHttpsProxies/lb-sites60-target-proxy-${sslCertificateName}`
                                        };
                    
                                        const forwardingRuleResponse = await fetch(forwardingRuleUrl, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                                Authorization: `Bearer ${accessToken}`,
                                            },
                                            body: JSON.stringify(forwardingRuleRequestBody),
                                        });
                    
                                        if (forwardingRuleResponse.ok) {

                                            //final success response

                                            let updateFields = [
                                                { key: "link_domain", value: sslCertificateName },
                                                { key: "ip_address", value: matchingIpAddress },                            
                                                { key: "updated_at", value: new Date() },
                                              ];
                                    
                                              let updateObj = {
                                                modal: "Smartsite",
                                                url: url,
                                                condition: { siteKey: siteKey },
                                                type: "findOne",
                                                updateFields: updateFields,
                                                selectFields: ["siteKey"],
                                              };
                                    
                                              let updateresponse = await updateRecord(updateObj);


                                            res.status(200).json({ success: true, ip: matchingIpAddressItem });


                                          } else {
                                            console.error('Error creating Forwarding Rule. Status:', forwardingRuleResponse.status);
                                            const errorText = await forwardingRuleResponse.text();
                                            console.error('Error details:', errorText);
                                            res.status(400).json({ success: false, error: 'Error creating Forwarding Rule', details: forwardingRuleResponse.status });
                                          }

                                        } else {
                                            // No matching IP address found
                                            console.log('No matching IP address found for SSL certificate name:', sslCertificateName);
                                            res.status(400).json({ success: false });
                                            }

                                        } else {
                                        console.error('Error fetching list of IP addresses. Status:', ipAddressListResponse.status);
                                        const errorText = await ipAddressListResponse.text();
                                        console.error('Error details:', errorText);
                                        // Handle the error as needed
                                        }

           
                                        } else {
                                            console.error('Error creating IP Address. Status:', ipAddressResponse.status);
                                            const errorText = await ipAddressResponse.text();
                                            console.error('Error details:', errorText);
                                            res.status(400).json({ success: false, error: 'Error creating IP Address', details: ipAddressResponse.status });
                                          }
                                               
                                    } else {
                                        console.error('Error creating registering domain:', targetHttpsProxyResponse.statusText);
                                        res.status(400).json({ success: false });
                                    }
                    
                                } else {
                                    console.error('Error creating SSL Certificate:', sslCertificateResponse.statusText);
                                    res.status(400).json({ success: false });
                                }
                            })
                            .catch((error) => {
                                console.error('Error getting access token:', error.message);
                                res.status(400).json({ success: false });
                            });
                    
                      } catch (captchaError) {
                        
                        res
                          .status(403)
                          .json({ success: false, message: "Invalid Captcha2", status: 403 });
                      }
    
            } catch (error) {
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

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}



