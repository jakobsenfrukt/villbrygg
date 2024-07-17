import { syncAll } from "../index"

export default async (req, context) => {
  console.log('start sheets-to-sanity-background')
  console.log(`sanity projectId=${process.env.SANITY_PROJECT_ID} dataset=${process.env.SANITY_DATASET}`)
  await syncAll();
  console.log("done sheets-to-sanity-background");
};