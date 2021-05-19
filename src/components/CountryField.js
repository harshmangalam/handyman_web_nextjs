import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

function CountryField({ name, value, handleChange,error }) {
  return (
    <div>
      <FormControl variant="outlined" fullWidth error={error}>
        <InputLabel id="country">Country</InputLabel>
        <Select
          labelId="country"
          id="country"
          value={value}
          onChange={handleChange}
          label="Country"
          name={name}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>

          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default CountryField;
