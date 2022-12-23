import { Skeleton, TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { County, selectCounties } from "slices/county-data";
import { selectActiveCounties, setActiveCounties } from "slices/config";

const CountyFilter = () => {
  const dispatch = useDispatch();
  const activeCounties = useAppSelector(selectActiveCounties);
  const counties = useAppSelector(selectCounties);

  const handleChange = (_params: React.SyntheticEvent, val: County[]) => {
    dispatch(setActiveCounties(val));
  };

  if (counties.length) {
    return (
      <Stack sx={{ minWidth: 320 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={counties}
          groupBy={(option: County) => option.state}
          getOptionLabel={(countyObj: County) =>
            `${countyObj?.county.substring(0, countyObj?.county.length - 7)}`
          }
          defaultValue={activeCounties}
          isOptionEqualToValue={(option, value) => option.fips === value.fips}
          filterSelectedOptions
          size="small"
          renderInput={(params) => <TextField {...params} label="Counties" />}
          onChange={handleChange}
          value={activeCounties}
        />
      </Stack>
    );
  }

  return <Skeleton width={360} height={20} sx={{ my: 2 }} />;
};

export default CountyFilter;
