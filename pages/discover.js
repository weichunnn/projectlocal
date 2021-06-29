import { Text, Spinner, Center, Box, Wrap, Flex } from '@chakra-ui/react';

import App from '@/components/App';
import BusinessCard from '@/components/BusinessCard';
import EmptyState from '@/components/EmptyState';
import { getAllBusinesses } from '@/lib/db-admin';
import searchLogic from 'util/searchLogic';

export async function getStaticProps(context) {
  const { businesses } = await getAllBusinesses();

  return {
    props: {
      businesses: businesses
    },
    revalidate: 3600
  };
}

export default function Discover({ businesses }) {
  // General Search Logic
  const filteredBusinesses = searchLogic(businesses);

  return (
    <App>
      <>
        {filteredBusinesses?.length ? (
          <>
            <Text mb="2" fontSize="sm" fontWeight="bold">
              Local businesses around you
            </Text>
            <Wrap justify="center" spacing="8">
              {businesses.map((business) => (
                <BusinessCard key={business.id} {...business} />
              ))}
            </Wrap>
            <Text mt="4" fontSize="sm" align="right">
              Showing <b>{businesses.length}</b> out of{' '}
              <b>{businesses.length}</b> businesses in <b>Kuala Lumpur</b>.
            </Text>
          </>
        ) : (
          <EmptyState />
        )}
      </>
    </App>
  );
}
