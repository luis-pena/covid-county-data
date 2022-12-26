import type { NextApiRequest, NextApiResponse } from "next";

type Actualstimeseries = {
  date: string;
  newDeaths: number | null;
  newCases: number | null;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let data = {};
  const usStatesArr: string[] = (req.headers.states as string).split(",");
  const urls = usStatesArr.map(
    (state) =>
      `https://api.covidactnow.org/v2/state/${state}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW_API_KEY}`
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
          return {
            state: d.state,
            data: actualsTimeseries,
          };
        })
        .catch((error) => ({ error, url }))
    )
  );

  return res.status(200).json(data);
};
