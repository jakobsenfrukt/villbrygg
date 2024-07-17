import { syncAll } from "../index"

export default async (req, context) => {
  console.log('start sheets-to-sanity-background')
  await syncAll();
  console.log("done sheets-to-sanity-background");
};