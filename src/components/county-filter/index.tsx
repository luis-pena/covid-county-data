import { Skeleton, TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { selectAllCounties } from "slices/county-data";
import { selectActiveCounties, setActiveCounties } from "slices/config";

const CountyFilter = () => {
  const counties = useAppSelector(selectAllCounties);
  const activeCounties = useAppSelector(selectActiveCounties);
  const dispatch = useDispatch();

  const handleChange = (
    _params: React.SyntheticEvent,
    val: { title: string }[]
  ) => {
    const newActiveCounties = val.map((countyObj) => countyObj.title);
    dispatch(setActiveCounties(newActiveCounties));
  };

  if (counties.length > 0) {
    const defaultValue = activeCounties.map((county) => {
      const i = counties.findIndex((countyObj) => countyObj.title === county);
      return counties[i];
    });
    return (
      <Stack spacing={3} sx={{ width: 500, my: 2 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={counties}
          getOptionLabel={(option) => option?.title}
          defaultValue={defaultValue}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="Counties" />}
          onChange={handleChange}
        />
      </Stack>
    );
  }

  return <Skeleton width={360} height={20} sx={{ my: 2 }} />;
};

export default CountyFilter;
