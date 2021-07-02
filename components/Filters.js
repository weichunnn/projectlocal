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
  const {
    location,
    onChangeLocation,
    onChangeCategories,
    customLocations,
    customCategories
  } = useSearch();
  const allLocations = ['Across Malaysia', ...customLocations];

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
          {allLocations.map((location) => {
            return (
              <option key={location} value={location}>
                {location}
              </option>
            );
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
          defaultValue={customCategories}
          onChange={onChangeCategories}
        >
          <Stack direction="column">
            {customCategories.map((category) => {
              return (
                <Checkbox key={category} value={category}>
                  {category}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Stack>
  );
}
