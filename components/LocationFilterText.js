import { Text } from '@chakra-ui/react';

import { useSearch } from '@/lib/search';

export default function LocationFilterText({
  currentlyShowing,
  allBusinesses,
  ...props
}) {
  const { location } = useSearch();
  const businessesInLocation = allBusinesses.filter((business) =>
    location == 'Across Malaysia' ? true : location.includes(business.location)
  ).length;

  return (
    <Text fontSize="sm" {...props}>
      Showing <b>{currentlyShowing}</b> out of&nbsp;
      <b>{businessesInLocation}</b>
      &nbsp;businesses in <b>{location}</b>.
    </Text>
  );
}
