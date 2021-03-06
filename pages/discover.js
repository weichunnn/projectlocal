import { Text, Wrap } from '@chakra-ui/react';
import useSWR from 'swr';

import App from '@/components/App';
import BusinessCard from '@/components/BusinessCard';
import LocationFilterText from '@/components/LocationFilterText';
import EmptyState from '@/components/EmptyState';
import LoadingAppState from '@/components/LoadingAppState';
import SeoWrapper from '@/components/SeoWrapper';
import { getAllBusinesses } from '@/lib/db-admin';
import searchLogic from 'utils/searchLogic';
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
const Discover = ({ initialBusinesses }) => {
  const { data } = useSWR('/api/businesses', fetcher, {
    initialBusinesses
  });

  const businesses = data?.businesses;
  const filteredBusinesses = searchLogic(
    typeof data?.businesses == 'undefined' ? [] : data.businesses
  );

  return (
    <App>
      <>
        {businesses?.length ? (
          filteredBusinesses.length ? (
            <>
              <Text mb="4" fontWeight="bold">
                Local businesses around you
              </Text>
              <Wrap justify="center" spacing="8">
                {filteredBusinesses.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </Wrap>
              <LocationFilterText
                currentlyShowing={filteredBusinesses.length}
                allBusinesses={businesses}
                mt="4"
                align="right"
              />
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
};

export default function DiscoverPage() {
  return (
    <SeoWrapper name="Discover" path="/discover">
      <Discover />
    </SeoWrapper>
  );
}
