import { Skeleton, TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { selectActiveUsStates, setActiveUsStates } from "slices/config";
import { selectAllUsStates } from "slices/us-state-data";

const UsStateFilter = () => {
  const dispatch = useDispatch();
  const activeUsStates = useAppSelector(selectActiveUsStates);
  const usStates = useAppSelector(selectAllUsStates);

  const handleChange = (
    _params: React.SyntheticEvent,
    val: { title: string }[]
  ) => {
    const newActiveStates = val.map((countyObj) => countyObj.title);
    dispatch(setActiveUsStates(newActiveStates));
  };

  if (usStates.length > 0) {
    return (
      <Stack spacing={3} sx={{ minWidth: 320 }}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={usStates}
          getOptionLabel={(option) => option?.title}
          filterSelectedOptions
          size="small"
          renderInput={(params) => <TextField {...params} label="States" />}
          onChange={handleChange}
          value={usStates.filter((usState) =>
            activeUsStates.includes(usState.title)
          )}
        />
      </Stack>
    );
  }

  return <Skeleton width={360} height={20} sx={{ my: 2 }} />;
};

export default UsStateFilter;
