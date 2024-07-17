import { syncAll } from "../index";

export default async (req, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  console.log("calling sheets-to-sanity-background");

  let status = null;

  await fetch(
    `https://${process.env.URL}/.netlify/functions/sheets-to-sanity-background`,
    {
      method: "post",
    }
  )
    .then((res) => {
      status = "queued";
      console.log(res);
    })
    .catch((error) => {
      status = "error";
      console.log(error);
    });

  return {
    statusCode: status === "queued" ? 200 : 500,
    headers,
    body: JSON.stringify({ status: status }),
  };
};
