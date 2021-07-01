import {
  Box,
  Stack,
  Text,
  Select,
  Checkbox,
  CheckboxGroup
} from '@chakra-ui/react';

import { useSearch } from '@/lib/search';

export default function Filters() {
  const { location, onChangeLocation, onChangeCategories } = useSearch();
  const locationsMalaysia = [
    'Across Malaysia',
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
  return (
    <Stack spacing="8" w="full">
      <Box>
        <Text mb={2} fontWeight="bold">
          Location
        </Text>
        <Select
          isFullWidth={true}
          defaultValue={location}
          onChange={onChangeLocation}
        >
          {locationsMalaysia.map((location) => {
            return <option value={location}>{location}</option>;
          })}
        </Select>
      </Box>
      <Box>
        <Text mb={2} fontWeight="bold">
          Categories
        </Text>
        {/* Non-serious Known bug on Chakra UI for 'Unable to preventDefault inside
        passive event listener invocation.' */}
        <CheckboxGroup
          colorScheme="teal"
          defaultValue={['Food & Beverage', 'Health & beauty', 'Education']}
          onChange={onChangeCategories}
        >
          <Stack direction="column">
            <Checkbox value="Food & Beverage">Food & Beverage</Checkbox>
            <Checkbox value="Health & beauty">Health & beauty</Checkbox>
            <Checkbox value="Education">Education</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
    </Stack>
  );
}
