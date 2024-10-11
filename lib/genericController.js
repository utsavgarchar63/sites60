// All the Generic Functions which will be used through out the app will go here

import * as moment from "moment";
import User from "../models/User";
import Smartsite from "../models/Smartsite";
import UserInfo from "../models/UserInfo";
import Template from "../models/Template";
import UserBilling from "../models/UserBilling";
import Media from "../models/Media";
import Track from "../models/Track";
import WhiteLabel from "../models/WhiteLabel";
import Contact from "../models/Contact";
import BusinessType from "../models/BusinessType";
import Product from "../models/Product";

const { Storage } = require("@google-cloud/storage");

// Function to Pick which Object the operations should be performed
function getObject(name) {
  switch (name) {
    case "User":
      return User;

    case "Smartsite":
      return Smartsite;

    case "Template":
      return Template;

    case "UserInfo":
      return UserInfo;

    case "UserBilling":
      return UserBilling;

    case "Media":
      return Media;

    case "Track":
      return Track;

    case "WhiteLabel":
      return WhiteLabel;

    case "Contact":
      return Contact;
    case "BusinessType":
      return BusinessType;
    case "Product":
      return Product;
  }
}

// GET Request
// const fetchRecords = (data) => {
//   console.log(data,"data")
//   let url = data.url;

//   let query = undefined;

//   return new Promise(function (resolve, reject) {

//   if (data.type == "find") {
//     query = getObject(data.modal).find(data.condition);

//     if (data.limit) {
//       query.limit(data.limit);
//     }

//     if (data.skip) {
//       query.skip(data.skip);
//     }
//   } else if (data.type == "findById") {
//     query = getObject(data.modal).findById(data.id);
//   } else if (data.type == "findOne") {
//     query = getObject(data.modal).findOne(data.condition);
//   }

//   if (data.selectFields) {
//     query.select(data.selectFields);
//   } else {
//     reject("selectFields is Missing");
//   }

//   if (data.populate) {

//     for (const iterator of data.populate) {

//         let obj = iterator.select;
//         let key = getKeyByValue(obj, 1);

//         if (key == "all") {
//           // Populate all fields
//           if (iterator.hasOwnProperty("match")) {
//             let newObj = {
//               match: iterator.match,
//               path: iterator.path,
//             };
//             query.populate(newObj);
//           } else {
//             query.populate(iterator.path);
//           }
//         } else {
//           query.populate(iterator);
//         }

//     }

//   }

//   if (data.orderBy) {
//     if (data.orderByKey) {
//       let order = -1;
//       if (data.orderBy == "asc") {
//         order = 1;
//       }

//       if (data.orderByKey == "name") {
//         query.sort({ name: order });
//       }
//       if (data.orderByKey == "created_at") {
//         query.sort({ created_at: order });
//       }
//       if (data.orderByKey == "email") {
//         query.sort({ email: order });
//       }
//     } else {
//       if (query.orderBy == "desc") {
//         query.sort({ created_at: 1 });
//       } else {
//         query.sort({ created_at: -1 });
//       }
//     }
//   }

//      query.exec(function (err, result) {
//       if (err) {
//         errorLog(url, err);
//         reject(err);
//       } else {
//         if (result) {
//           resolve(result);
//         } else {
//           resolve([]);
//         }
//       }
//     });
//   });
// };

const fetchRecords = (data) => {
  console.log("Fetching records with data:", data);

  let url = data.url;
  let query = undefined;

  return new Promise(function (resolve, reject) {
    if (data.type == "find") {
      query = getObject(data.modal).find(data.condition);

      if (data.limit) {
        query.limit(data.limit);
      }

      if (data.skip) {
        query.skip(data.skip);
      }
    } else if (data.type == "findById") {
      query = getObject(data.modal).findById(data.id);
    } else if (data.type == "findOne") {
      query = getObject(data.modal).findOne(data.condition);
    }

    console.log("Query before execution:", query);

    if (data.selectFields) {
      query.select(data.selectFields);
    } else {
      reject("selectFields is Missing");
    }

    if (data.populate) {
      for (const iterator of data.populate) {
        let obj = iterator.select;
        let key = getKeyByValue(obj, 1);
        if (key == "all") {
          if (iterator.hasOwnProperty("match")) {
            let newObj = {
              match: iterator.match,
              path: iterator.path,
            };
            query.populate(newObj);
          } else {
            query.populate(iterator.path);
          }
        } else {
          query.populate(iterator);
        }
      }
    }

    if (data.orderBy) {
      let order = data.orderBy == "asc" ? 1 : -1;
      let orderKey = data.orderByKey || "created_at";
      query.sort({ [orderKey]: order });
    }

    query.exec(function (err, result) {
      if (err) {
        errorLog(url, err);
        reject(err);
      } else {
        console.log("Query result:", result);
        resolve(result || []);
      }
    });
  });
};

// PUT Request
const updateRecord = (data) => {
  let url = data.url;
  let updateFields = data.updateFields;

  let query = undefined;

  return new Promise(function (resolve, reject) {
    if (data.type == "findOne") {
      query = getObject(data.modal).findOne(data.condition);
    } else {
      query = getObject(data.modal).findById(data.id);
    }

    if (data.selectFields) {
      query.select(data.selectFields);
    } else {
      reject("selectFields are Missing");
    }

    query.exec(function (err, result) {
      if (err) {
        errorLog(url, err);
        reject(err);
      } else {
        if (result) {
          for (let i = 0; i < updateFields.length; i++) {
            result[updateFields[i].key] = updateFields[i].value;
          }

          result.save(function (err1, updatedResult) {
            if (err1) {
              errorLog(url, err1);
              reject(err1);
            } else {
              resolve(updatedResult);
            }
          });
        } else {
          resolve("empty");
        }
      }
    });
  });
};

// DELETE Request
const deleteRecord = (data) => {
  let url = data.url;
  let query = undefined;

  if (data.type == "findOne") {
    query = getObject(data.modal).findOne(data.condition);
  } else {
    query = getObject(data.modal).findById(data.id);
  }

  return new Promise(function (resolve, reject) {
    query.exec(function (err, result) {
      if (err) {
        errorLog(url, err);
        reject(err);
      } else {
        result.is_del = true;

        result.save(function (err1) {
          if (err1) {
            errorLog(url, err1);
            reject(err1);
          } else {
            resolve("deleted");
          }
        });
      }
    });
  });
};

// DELETE Request
const deleteRecordPermanently = (data) => {
  let url = data.url;
  let query = getObject(data.modal).findById(data.id);

  return new Promise(function (resolve, reject) {
    query.exec(function (err, result) {
      if (err) {
        errorLog(url, err);
        reject(err);
      } else {
        result.remove(function (err1) {
          if (err1) {
            errorLog(url, err1);
            reject(err1);
          } else {
            resolve("deleted");
          }
        });
      }
    });
  });
};

// GET Request
const getRecordsCount = (data) => {
  let url = data.url;

  let p = getObject(data.modal).find(data.condition);

  return new Promise(function (resolve, reject) {
    p.countDocuments(function (err, count) {
      if (err) {
        errorLog(url, err);
        reject(err);
      } else {
        resolve(count);
      }
    });
  });
};

function hasJsonStructure(str) {
  if (typeof str !== "string") return false;
  try {
    const result = JSON.parse(str);
    const type = Object.prototype.toString.call(result);
    return type === "[object Object]" || type === "[object Array]";
  } catch (err) {
    return false;
  }
}

const errorLog = (url, errorObj) => {
  if (
    process.env.NODE_ENV == "production" ||
    process.env.NODE_ENV == "staging"
  ) {
    let nowDate = new Date();
    let errorText = "";
    if (errorObj) {
      if (hasJsonStructure(errorObj)) {
        errorText = JSON.stringify(errorObj);
      } else {
        errorText = errorObj;
      }
    }
    let errorFile =
      "Time - " +
      moment().format("DD-MMM-YYYY h:mm:ss a") +
      "\n" +
      "URL - " +
      url +
      "\n" +
      "Error - " +
      errorText +
      "\n\n";

    let fileName = moment(nowDate).format("DD-MMM-YYYY") + "-logs.txt";

    // Add Code to Send Error to CloudWatch
  } else {
    console.log("Error in URL>>>>>", url);
    console.log("Error Details>>>>>", errorObj);
  }
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function uploadMedia(imageBuffer, bucketName, fileName) {
  return new Promise(async function (resolve, reject) {
    try {
      let storage = undefined;
      if (process.env.NODE_ENV == "development") {
        const jsonKey = {
          type: "service_account",
          project_id: "anirudhtest-e263d",
          private_key_id: "cfad16dd663bec996da2df5d1a35ddffca036e73",
          private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDU9TzbI3ikE2Db\n5yE0rzUkQjDVDASyAVWqqV9xagpLSoajDsC7FEzWUTolw/RbKPNv5wSr3FnwSmGz\nBJUA01Q/TZSG9dl+erAFi1Jecj3ntPJhMZjpT+f8sJV0yY1y52VBNxdLaQ+dzOIj\n8NORgR59Wup3/0FFR4mWbFlxJx9wYKgqqCr2YQgHJlcf6byxdVmWRpUuhVBWKu2s\nrziszY7kRr02Vltzp+2816WeQJ9ZmBn1fNcb9F6/SGn27JltUUqEo0KrNmvTJI6E\nx4EYVmUnZ3xMh6rWmGiL6NO60L5PNq6mHEUFBZaK0VnWLdfTHKfM4wQn6OsxpsPe\nui7VXe2DAgMBAAECggEASuJ/x1lmU2ADF+DjQtj3mWvzKv+iaQviGXScvM96ljY7\nOPx3lnGRgW2nwl7xPtscG3YDpQGD2OT3DRHn6ZXmkqoPuBOcqwaufgybZt3KWf+9\nmaLsr+Jq4+cebyZu6IBpETEzrk9f7+/7d4L4irp6Q79kItUuGRQKVEx+eTU2L3gR\nSo+pHhGqJXFuox3xtZLTolyhR8xzrv0sr0fr2EO/kFCtxgpq6gVlMBQE6lYyeoa9\nO57RFcOX5287qP/CR+s/HvM0sFrNknKDmj/ypV/pQmauHJ/SVPPYJLs83ZdcgQBG\n8LjoiWZQ1LtrxDcChXJ0zEd3vUPSjTCOf1K3brBkwQKBgQD2EUVWz+WlVvEULvYJ\nccue5F69jWqAiWOiEW0gTVy6JPqYbMtImNVNksuc2QhIAtuL2zTJidJnokfPHC+0\nhVJvyCFbwwPM7kprBo7WC6s+QiakhZe63OvU5mMG/iT20YLFhsHwvV/IFuFf4nFj\neQO+Y1PZ1ncTD79uoOt7YELOQQKBgQDdjdS9CV/q3Z/GKMsUF4+iGUXAa0JrS/o8\nnyUcoX8EuVcyFOgOuR3CzPvMoA+gCov4KBxmaOsWbuuQfkQymMlOQERMaO8LDeLD\niQYWQlroktceM4ufeYwVW/VMwiJEPwDmAa2jyQYkWqQBcXhAYamUfyVEpe3thB4t\nzVwTVepSwwKBgA4724X1CrSwvctMGCFdusibLzvJxWJgECpc1bIrp3SBFRniGTQ+\n2v/cwPh2uXro52hEqt4JoekqwvqhB8VqfOVIb12Of1bIZfeg7nxFOoekbfXQYIGH\nrACpvwq1gs/gOK9SZz+UxMifQjQ4thRp+KR3vG76b/LjU1CD8Hs3i0XBAoGBAJiK\n5dW+Fad9LlvejGxqCIAATJE+iH2d005X+NJssyrKfanC0UAJ3t7YCeqKrhdwC40x\n+NPeGzbX6iMTfNslbT0ObLf7a9K9ncspleJPj44gRDLMJK8JnhS6uvs9kyBQDMtQ\njoB9kVgIfHFt8fDKDVtr63oHkPj/BVRd166McgjHAoGAE7QHtqQrOwhVYc6PGhZv\ntQ/lv9QU7wA7vVMEez633B65XEqsKPpMnZYiGD92sByPJDBR4DhXAZwltLH1XstI\nlVWhYKR2Oe4hy73UhiIO2s40ZQMdMXs5B4pK94081FvOOpUQIuCgO7fGAt9pkKfK\nAgMAvaJ9NaiLjB1Zw1pw+YY=\n-----END PRIVATE KEY-----\n",
          client_email:
            "firebase-adminsdk-jv72y@anirudhtest-e263d.iam.gserviceaccount.com",
          client_id: "105491560819671705313",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jv72y%40anirudhtest-e263d.iam.gserviceaccount.com",
        };
        //  storage = new Storage({
        //    keyFilename:
        //      "anirudhtest-e263d-firebase-adminsdk-jv72y-cfad16dd66.json",
        //  });

        storage = new Storage({
          credentials: {
            client_email: jsonKey.client_email,
            private_key: jsonKey.private_key,
          },
        });
      } else {
        const jsonKey = {
          type: "service_account",
          project_id: "sites60",
          private_key_id: "7224c1b48aff2f593954fd8096cf2b2e397e6902",
          private_key:
            "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCihcBl3EG0cvIB\nenC2yXlSwJ4ZdU/+S29/DkQd1BtVT0yWMbZecwM5DT1HLDb3ERcM7pKzgEK5zNgY\nVOS/PO00lPJRUvjiIm1cubWdLgSyLAjrS+b0Dkee/pg1OMf+YNQcF4KBQ2GZAcCT\nMNITB4JtvLUV01lmatON49BiqPLiQ7rbcFhyo2QKie/Jg+6Dwkf98UcGZoxNz95+\nrmaFxxs1tttJZvqAozJ/d35FpXT9bspv9xYOIUGbi2WCmv8pEG5L4XskMM9fX6HR\nlDrXtheAoMQdcOMD6rcG21gPSy4CHYemuU/BEivkXI89u6qb5TxRs5d/Evd4Wld1\nThfwsI+zAgMBAAECggEAActPNfCqCwdv04NaBjKQM9ErjaVlZi3IA9OQ/fFPAfCX\nrFrNJBrJ8NHMGOKMksquAfcKSJAEbI+t3Qrm4ZOXHMr+J9auJ7TwlyL3tc4BwEPL\nL2nNmWkk8kTmQkQntQ+1l7/MsYegZrOFwDo8P3iIQJTiPOTx6jcIsdrPfJ9X2xaW\ny+bRRQeQ98ytdqKy3V7hF5rmC3BTVV0ey4r55VWXY3WWIg51yRoqt7mlT0c17Ak2\n4L2uygWPLzSLNm6A0TLXDGUtGbcoIiujVneCPgBKOolftEUP+AAAtU5Jh1RjNZyp\nQYN4XuZIFTshRGLZcwmQtrPRSd0F51fcTYo4ZiTAxQKBgQDkBA5q0cELFbohvwnD\ntCwPmaG5bV/u9+a65BwEbxuQ4J0liCCULguFgJW0iteX2hkFzXDL1NVxDOuwr8yd\nC7aiLa+ITjJV8eWWU6eKX5Vs/i8L5Fv4RpZk1T4yzQKKsR0BN24eYBTNe86FLZVJ\nUyaadHXDK3AhSCg3ZHqKuUu1xwKBgQC2d/vJPM6ImDt0aOTZOi6PQ5WPP1/cmuzM\nU1raSGN0uwOQBVr6YXhs0AwPG792cD755yWupAf7dFv51H++ZPJj1ISSGambdPz2\nDDiDWgpLCQrYXwZTRqCtBTWHwsF1frFQDyW6LrDyTqZHGBHqb3wFumCvdruCuvuV\nOHKfT2amtQKBgFYKWc5hHDEsn7IAPpUEteOlG2u3JA4uqXg4f4IE0ygWOfZhqbmA\nroRQAy2/fp8kg3C3FyszQt+H+qAPlmxkcSQ9jREoQMJBp1rUclI6w03/lI0uPK4x\nJKsj9HaC+cSQFNvSqND5fKAVadbDXqPuppB+BboB+Cv26IYOeldCmJkdAoGAaiRz\nkAVSMz0y4K2f6gkhSm9LEdAQyHhKpTUb1XxkdmPPV7j1yk5myg1f5m4CuzfiOmbO\nkb+TcR+n3TVStgNsyMu37nEFK4wrFknXmfkHocx5xZHJUSn1j5BHKlkNRnbTWDnn\nfV1pyxobOaHz0gbWA1L+qTMNMqfob04txyReFz0CgYBxlEU3h3+19Zm+q4xNcswd\nceDnUx95Nt8D5L1cIqeps5dhGFjVsXxRrpbKqorK/BGXV5Xb61w5PnaICmtb4Unl\nnSI0/8i5f7ZPMttxS8UeFLKirWV8xGFJrPVB8qvsaXZdc69P2OAbg1EL4CRsyMoQ\nIPxzQMnpOmvXgiC3TJ4UGQ==\n-----END PRIVATE KEY-----\n",
          client_email: "file-upload@sites60.iam.gserviceaccount.com",
          client_id: "118155821482123156229",
          auth_uri: "https://accounts.google.com/o/oauth2/auth",
          token_uri: "https://oauth2.googleapis.com/token",
          auth_provider_x509_cert_url:
            "https://www.googleapis.com/oauth2/v1/certs",
          client_x509_cert_url:
            "https://www.googleapis.com/robot/v1/metadata/x509/file-upload%40sites60.iam.gserviceaccount.com",
        };
        //  storage = new Storage({
        //    keyFilename: "sites60-7224c1b48aff.json",
        //  });

        storage = new Storage({
          credentials: {
            client_email: jsonKey.client_email,
            private_key: jsonKey.private_key,
          },
        });
      }

      const bucket = storage.bucket(process.env.GOOGLE_BUCKET);
      // const bucket = admin.storage().bucket(bucketName);

      const file = bucket.file(fileName);
      file.save(imageBuffer, function (err) {
        if (!err) {
          console.log("File written successfully");

          resolve(
            "uploaded",
            `https://storage.googleapis.com/${bucketName}/${fileName}`
          );
        } else {
          console.log(`Unable to upload encoded file ${err}`);
          reject(err);
        }
      });
    } catch (error) {
      console.log("Error>>>>", error);
      reject(error);
    }
  });
}

function generateV4ReadSignedUrl(bucketName, fileName) {
  // These options will allow temporary read access to the file
  const options = {
    version: "v4",
    action: "read",
    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
  };

  // Get a v4 signed URL for reading the file

  return new Promise(async function (resolve, reject) {
    const [url] = await admin
      .storage()
      .bucket(bucketName)
      .file(fileName)
      .getSignedUrl(options);
    resolve(url);
  });
}

module.exports = {
  errorLog,
  fetchRecords,
  deleteRecord,
  updateRecord,
  getRecordsCount,
  deleteRecordPermanently,
  uploadMedia,
  generateV4ReadSignedUrl,
};
