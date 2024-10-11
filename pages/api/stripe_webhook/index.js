import dbConnect from "../../../lib/dbConnect";
import { fetchRecords, updateRecord } from "../../../lib/genericController";
import { buffer } from "micro";
import Stripe from "stripe";
import moment from "moment";

const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: null }); // version null sets the most recent API version
const endpointSecret = process.env.STRIPE_ENDPOINT;

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  let url = req.url;

  switch (method) {
    case "POST":
      const requestBuffer = await buffer(req);
      const signature = req.headers["stripe-signature"];

      let event;

      try {
        event = stripe.webhooks.constructEvent(
          requestBuffer.toString(), // Stringify the request for the Stripe library
          signature,
          endpointSecret // you get this secret when you register a new webhook endpoint
        );
      } catch (error) {
        console.log("Event Error>>>>", error);
      }

      // Handle the event
      switch (event.type) {
        case "invoice.created":
          try {
            const invoiceIntent = event.data.object;

            if (invoiceIntent.discount) {
              const promotionCodes = await stripe.promotionCodes.retrieve(
                invoiceIntent.discount.promotion_code
              );

              const customerData = await stripe.customers.retrieve(
                invoiceIntent.customer
              );

              const customerMetaData = customerData.metadata;

              let updateFields = [
                { key: "promo_code", value: promotionCodes.code },
                { key: "updated_at", value: new Date() },
              ];

              let updateParams = {
                modal: "Smartsite",
                url: url,
                type: "findById",
                updateFields: updateFields,
                id: customerMetaData.smartsite_id,
                selectFields: ["key"],
              };

              let x = await updateRecord(updateParams);
              res.status(200).json({ success: true });
            } else {
              res.status(200).json({
                success: true,
                message: "No Discount code for this request",
              });
            }
          } catch (error) {
            res.status(400).json({ success: false, message: error });
            console.log("invoice.created.error>>", error);
          }

          break;
        case "customer.subscription.updated":
        case "customer.subscription.created":
          try {
            const subscriptionIntent = event.data.object;
            const customerId = subscriptionIntent.customer;
            const customer = await stripe.customers.retrieve(customerId);
            const custMetadata = customer.metadata;
            const smartsiteId = custMetadata.smartsite_id;

            let getObj = {
              modal: "UserInfo",
              url: url,
              type: "findOne",
              selectFields: ["stripe_cust_id", "user_id"],
              condition: { stripe_cust_id: subscriptionIntent.customer },
            };

            let userInfo = await fetchRecords(getObj);

            console.log(userInfo, " << userInfo");
            console.log(subscriptionIntent, " << subscriptionIntent");
            console.log(customer, " << customer");

            if (!Array.isArray(userInfo)) {
              let metadata = subscriptionIntent.metadata;

              let updateFields = [
                { key: "is_paid_user", value: true },
                { key: "platform", value: "stripe" },
                {
                  key: "plan_id",
                  value: subscriptionIntent.items.data[0].price.id,
                },
                { key: "updated_at", value: new Date() },
              ];

              let updateObj = {
                modal: "UserInfo",
                url: url,
                type: "findById",
                updateFields: updateFields,
                id: userInfo._id,
                selectFields: ["stripe_cust_id"],
              };

              const periodStart = moment
                .unix(subscriptionIntent.current_period_start)
                .toDate();
              const periodEnd = moment
                .unix(subscriptionIntent.current_period_end)
                .toDate();

              let updateFields2 = [
                { key: "is_paid", value: true },
                {
                  key: "plan_id",
                  value: subscriptionIntent.items.data[0].price.id,
                },
                { key: "updated_at", value: new Date() },
                { key: "subscription_start", value: periodStart },
                { key: "subscription_end", value: periodEnd },
              ];

              let updateObj2 = {
                modal: "Smartsite",
                url: url,
                type: "findById",
                updateFields: updateFields2,
                id: smartsiteId,
                selectFields: ["key"],
              };

              try {
                console.log(updateObj, "<< updateObj");
                console.log(updateObj2, "<< updateObj2");
                let x = await updateRecord(updateObj);
                let y = await updateRecord(updateObj2);
              } catch (error) {
                console.log(error, "Updated error");
                res
                  .status(200)
                  .json({ success: false, message: "User updated error" });
                return;
              }
            } else {
              console.log("User not found");
              res
                .status(200)
                .json({ success: false, message: "User not found" });
              return;
            }

            res.status(200).json({ success: true });
          } catch (error) {
            console.log(error, "<< error webhook");
            res.status(400).json({ success: false, message: error });
          }

          break;

        case "customer.subscription.deleted":
          const abortIntent = event.data.object;
          console.log("abortIntent>>>>\n", abortIntent + "\n");

          // Get User Info
          const customer1 = await stripe.customers.retrieve(
            abortIntent.customer
          );
          const custMetadata1 = customer1.metadata;
          console.log(customer1, "<< customer1");
          // Access the "smartsite_id" metadata value
          const smartsiteId1 = custMetadata1.smartsite_id;

          let getCancelObj = {
            modal: "UserInfo",
            url: url,
            type: "findOne",
            selectFields: ["stripe_cust_id", "user_id"],
            condition: { stripe_cust_id: abortIntent.customer },
          };

          let userCancelInfo = await fetchRecords(getCancelObj);

          console.log(userCancelInfo, "<< userCancelInfo");
          if (!Array.isArray(userCancelInfo)) {
            // Update User Info

            let updateFields = [
              { key: "is_paid_user", value: false },
              { key: "platform", value: "stripe" },
              { key: "plan_id", value: abortIntent.items.data[0].price.id },
              { key: "updated_at", value: new Date() },
            ];

            let updateObj = {
              modal: "UserInfo",
              url: url,
              type: "findById",
              updateFields: updateFields,
              id: userCancelInfo._id,
              selectFields: ["stripe_cust_id"],
            };

            let updateFields2 = [
              { key: "is_paid", value: false },
              { key: "plan_id", value: abortIntent.items.data[0].price.id },
              { key: "updated_at", value: new Date() },
            ];

            let updateObj2 = {
              modal: "Smartsite",
              url: url,
              type: "findById",
              updateFields: updateFields2,
              id: smartsiteId1,
              selectFields: ["key"],
            };

            console.log(updateObj2, "<< updateObj2");
            console.log(updateObj, "<< updateObj");

            await updateRecord(updateObj2);
            await updateRecord(updateObj);
          } else {
            res.status(400).json({ success: false, message: "User not found" });
            return;
          }

          res.status(200).json({ success: true });

          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
          res.status(400).json({ success: false, error: event.type });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
