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
  const { location, onChangeLocation, categories, onChangeCategories } =
    useSearch();

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
          <option value="Kuala Lumpur">Kuala Lumpur</option>
        </Select>
      </Box>
      <Box>
        <Text mb={2} fontWeight="bold">
          Categories
        </Text>
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
