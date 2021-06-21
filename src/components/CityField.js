import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import useSWR from "swr";

function CityField({ name, value, handleChange, error }) {
  const { data } = useSWR("/region");
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

          {data?.data.regions.map((region) => (
            <MenuItem key={region._id} value={region.city}>
              {region.city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CityField;
