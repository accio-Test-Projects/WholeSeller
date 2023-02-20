import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function AsyncDropdown({
  options,
  onChange,
  onTextChange,
  value
}) {
  return (
    <Autocomplete
      id="country-select-demo"
      fullWidth
      options={options}
      autoHighlight
      onChange={(event, newValue) => onChange(newValue)}
      getOptionLabel={(option) => option.SKU}
      renderOption={(props, option) => (
        <div style={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="50"
           src={option.image}
            alt=""
          />
          <div>{option.product_name}</div>
         
        </div>
      )}
      renderInput={(params) => (
        <TextField
          value={value}
          onChange={(e)=>onTextChange(e.target.value)}
          {...params}
          label="select a product"
          placeholder='type product SKU'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js


export default AsyncDropdown