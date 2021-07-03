const ReactSelectStyles = (errors) => {
  return {
    control: (styles, state) => ({
      ...styles,
      boxShadow: 'none',
      backgroundColor: 'transparent',
      borderRadius: '7px',
      border: state.isFocused
        ? '2px solid #3182CE'
        : errors?.categories
        ? '2px solid #E53E3E'
        : '1px solid #E2E8F0',
      '&:hover': {
        border: state.isFocused ? '2px solid #3182CE' : '1px solid #CBD5E0'
      }
    }),
    option: (provided) => ({
      ...provided
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: '#C2EBED',
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
