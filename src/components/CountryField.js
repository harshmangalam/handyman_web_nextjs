import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import useSWR from "swr";
function CountryField({ name, value, handleChange, error }) {
  const { data } = useSWR("/region");

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    new Set(data?.data.regions.map((c) => c.country)).forEach((c) =>
      setCountries((countries) => [...countries, c])
    );
  }, [data]);

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
          {countries.map((c) => (
            <MenuItem value={c} key={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CountryField;
