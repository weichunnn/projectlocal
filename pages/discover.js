import { Text, Wrap } from '@chakra-ui/react';

import App from '@/components/App';
import BusinessCard from '@/components/BusinessCard';
import EmptyState from '@/components/EmptyState';
import LoadingAppState from '@/components/LoadingAppState';
import { getAllBusinesses } from '@/lib/db-admin';
import searchLogic from 'utils/searchLogic';
import { useSearch } from '@/lib/search';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

export async function getStaticProps(context) {
  const { businesses } = await getAllBusinesses();

  return {
    props: {
      initialBusinesses: businesses
    },
    revalidate: 3600
  };
}

export default function Discover({ initialBusinesses }) {
  const { location } = useSearch();
  const { data } = useSWR('/api/businesses', fetcher, {
    initialBusinesses
  });

  const businesses = data?.businesses;
  const filteredBusinesses = searchLogic(
    typeof data?.businesses == 'undefined' ? [] : data.businesses
  );

  const businessesInLocation = businesses?.filter((business) =>
    location == 'Across Malaysia' ? true : location.includes(business.location)
  ).length;

  return (
    <App>
      <>
        {businesses?.length ? (
          filteredBusinesses.length ? (
            <>
              <Text mb="4" fontSize="sm" fontWeight="bold">
                Local businesses around you
              </Text>
              <Wrap justify="center" spacing="8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </Wrap>
              <Text mt="4" fontSize="sm" align="right">
                Showing <b>{filteredBusinesses.length}</b> out of&nbsp;
                <b>{businessesInLocation}</b>
                &nbsp;businesses in <b>{location}</b>.
              </Text>
            </>
          ) : (
            <EmptyState />
          )
        ) : (
          <LoadingAppState />
        )}
      </>
    </App>
  );
}
