import { Skeleton, TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { selectActiveUsStates, setActiveUsStates } from "slices/config";
import { selectAllUsStates } from "slices/us-state-data";

const UsStateFilter = () => {
  const usStates = useAppSelector(selectAllUsStates);
  const activeCounties = useAppSelector(selectActiveUsStates);
  const dispatch = useDispatch();

  const handleChange = (
    _params: React.SyntheticEvent,
    val: { title: string }[]
  ) => {
    const newActiveStates = val.map((countyObj) => countyObj.title);
    dispatch(setActiveUsStates(newActiveStates));
  };

  if (usStates.length > 0) {
    const defaultValue = activeCounties.map((county) => {
      const i = usStates.findIndex((usStateObj) => usStateObj.title === county);
      return usStates[i];
    });
    return (
      <Stack spacing={3} sx={{ width: 500, my: 2 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={usStates}
          getOptionLabel={(option) => option?.title}
          defaultValue={defaultValue}
          filterSelectedOptions
          renderInput={(params) => <TextField {...params} label="States" />}
          onChange={handleChange}
        />
      </Stack>
    );
  }

  return <Skeleton width={360} height={20} sx={{ my: 2 }} />;
};

export default UsStateFilter;
