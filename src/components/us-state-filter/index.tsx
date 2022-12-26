import { TextField, Autocomplete, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import { useAppSelector } from "hooks/store";
import { selectActiveUsStates, setActiveUsStates } from "slices/config";
import { US_STATES } from "constants/index";

const UsStateFilter = () => {
  const dispatch = useDispatch();
  const activeUsStates = useAppSelector(selectActiveUsStates);
  const allUsStates = Object.keys(US_STATES);

  const handleChange = (_params: React.SyntheticEvent, val: string[]) => {
    dispatch(setActiveUsStates(val));
  };

  return (
    <Stack spacing={3} sx={{ minWidth: 320 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={allUsStates}
        getOptionLabel={(option) => US_STATES[option as keyof typeof US_STATES]}
        filterSelectedOptions
        size="small"
        renderInput={(params) => <TextField {...params} label="States" />}
        onChange={handleChange}
        value={allUsStates.filter((usState) =>
          activeUsStates.includes(usState)
        )}
      />
    </Stack>
  );
};

export default UsStateFilter;
