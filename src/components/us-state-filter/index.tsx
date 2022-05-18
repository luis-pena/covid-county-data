import { Skeleton, TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { selectActiveUsStates, setActiveUsStates } from "slices/config";
import { selectAllUsStates } from "slices/us-state-data";
import { useEffect, useState } from "react";

const UsStateFilter = () => {
  const dispatch = useDispatch();
  const activeUsStates = useAppSelector(selectActiveUsStates);
  const usStates = useAppSelector(selectAllUsStates);
  const [hasSetUsState, setHasSetUsState] = useState(false);

  useEffect(() => {
    if (activeUsStates.length > 0 && !hasSetUsState) {
      setHasSetUsState(true);
    }
  }, [activeUsStates]);

  const handleChange = (
    _params: React.SyntheticEvent,
    val: { title: string }[]
  ) => {
    const newActiveStates = val.map((countyObj) => countyObj.title);
    dispatch(setActiveUsStates(newActiveStates));
  };

  if (hasSetUsState || (usStates.length > 0 && activeUsStates.length > 0)) {
    const defaultValue = activeUsStates.map((usState) => {
      const i = usStates.findIndex(
        (usStateObj) => usStateObj.title === usState
      );
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
