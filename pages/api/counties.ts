import type { NextApiRequest, NextApiResponse } from "next";
import { County } from "slices/county-data";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  let data;
  await fetch(
    `https://api.covidactnow.org/v2/counties.json?apiKey=${process.env.COVID_ACT_NOW_API_KEY}`
  ).then((covidActNowResponse) =>
    covidActNowResponse.json().then((d: County[]) => {
      data = d.map((countyObj) => ({
        fips: countyObj.fips,
        state: countyObj.state,
        county: countyObj.county,
      }));
    })
  );
  return res.status(200).json(data);
};
