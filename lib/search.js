import React, { useState, useContext, createContext } from 'react';

const searchContext = createContext();

export function SearchProvider({ children }) {
  const auth = useProvideSearch();
  return (
    <searchContext.Provider value={auth}>{children}</searchContext.Provider>
  );
}

export const useSearch = () => {
  return useContext(searchContext);
};

const useProvideSearch = () => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('Kuala Lumpur');
  const [categories, setCategories] = useState(['Food & Beverage']);

  const customLocations = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Kuala Lumpur',
    'Labuan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Penang',
    'Perak',
    'Perlis',
    'Putrajaya',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu'
  ];

  const customCategories = ['Food & Beverage', 'Health & Beauty', 'Education'];

  const onChangeLocation = (e) => {
    setLocation(e.target.value);
  };

  const onChangeCategories = (value) => {
    setCategories(value);
  };

  const onSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.value;
    const valueWithoutInitial = searchValue.replace('K', '');
    setSearch(valueWithoutInitial);
    return valueWithoutInitial;
  };

  return {
    search,
    location,
    categories,
    onSearch,
    onChangeLocation,
    onChangeCategories,
    customLocations,
    customCategories
  };
};
