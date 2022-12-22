import type { NextApiRequest, NextApiResponse } from "next";

type Actualstimeseries = {
  date: string;
  newDeaths: number | null;
  newCases: number | null;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let data = {};
  const fipsArr: string[] = (req.headers.fips as string).split(",");
  const urls = fipsArr.map(
    (fips) =>
      `https://api.covidactnow.org/v2/county/${fips}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW_API_KEY}`
  );

  data = await Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((r) => r.json())
        .then((d) => {
          const actualsTimeseries: Actualstimeseries[] =
            d.actualsTimeseries.map(
              ({ date, newDeaths, newCases }: Actualstimeseries) => ({
                date,
                newDeaths,
                newCases,
              })
            );
          return { fips: d.fips, data: actualsTimeseries };
        })
        .catch((error) => ({ error, url }))
    )
  );

  return res.status(200).json(data);
};
