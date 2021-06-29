import { Text, Spinner, Center, Box, Wrap, Flex } from '@chakra-ui/react';

import App from '@/components/App';
import BusinessCard from '@/components/BusinessCard';
import EmptyState from '@/components/EmptyState';

// Temp Check
const loading = true;
const data = true;

export default function Discover() {
  return (
    <App>
      {loading == true ? (
        <Flex mt="48" justify="center">
          <Spinner speed="0.75s" size="xl" />
        </Flex>
      ) : (
        <>
          {data ? (
            <>
              <Text mb="2" fontSize="sm" fontWeight="bold">
                Local businesses around you.
              </Text>
              <Wrap justify="center" spacing="8">
                {Array(3)
                  .fill('')
                  .map((_) => {
                    return <BusinessCard />;
                  })}
              </Wrap>
              <Text mt="4" fontSize="sm" align="right">
                Showing <b>45</b> out of <b>45</b> businesses in{' '}
                <b>Kuala Lumpur</b>.
              </Text>
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </App>
  );
}
