const ReactSelectStyles = (errors, colorMode) => {
  return {
    control: (styles, state) => ({
      ...styles,
      boxShadow: 'none',
      backgroundColor: colorMode == 'light' ? 'tranparent' : '#2D3748',
      borderRadius: '7px',
      border: state.isFocused
        ? '2px solid #3182CE'
        : errors?.categories
        ? '2px solid #E53E3E'
        : colorMode == 'light'
        ? '1px solid #E2E8F0'
        : '1px solid #3F444E',
      '&:hover': {
        border: state.isFocused ? '2px solid #3182CE' : '1px solid #CBD5E0'
      }
    }),
    menuList: (base) => ({
      ...base,
      padding: '10px'
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: '10px',
      backgroundColor: state.isFocused
        ? colorMode == 'light'
          ? '#B2D5FE'
          : '#008080'
        : null
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: colorMode == 'light' ? 'white' : '#1C1D1F',
      border: colorMode == 'light' ? null : '1px solid #39393B'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: colorMode == 'light' ? '#C2EBED' : '#81E6D9',
      color: colorMode == 'light' ? 'red' : 'black',
      borderRadius: '5px'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: 'pink',
        color: 'white'
      }
    })
  };
};

export default ReactSelectStyles;
