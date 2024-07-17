import { syncAll } from "../index";

export default async (req, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  const webhookUrl = `${process.env.URL}/.netlify/functions/sheets-to-sanity-background`;
  console.log("calling sheets-to-sanity-background at", webhookUrl);

  let status = null;

  await fetch(webhookUrl, {
    method: "post",
  })
    .then((res) => {
      status = "queued";
      console.log(res);
    })
    .catch((error) => {
      status = "error";
      console.log(error);
    });

  const body = { status: status };
  return Response.json(body, {
    statusCode: status === "queued" ? 200 : 500,
    headers,
  });
};
