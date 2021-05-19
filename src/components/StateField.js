import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function StateField({ name, value, handleChange, error }) {
  return (
    <div>
      <FormControl variant="outlined" fullWidth error={error}>
        <InputLabel id="state">State</InputLabel>
        <Select
          labelId="state"
          id="state"
          value={value}
          onChange={handleChange}
          label="State"
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          <MenuItem value="Washington">Washington</MenuItem>
         
        </Select>
      </FormControl>
    </div>
  );
}

export default StateField;
