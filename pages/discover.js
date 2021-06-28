import { Text, Spinner, Center, Wrap } from '@chakra-ui/react';

import App from '@/components/App';
import BusinessCard from '@/components/BusinessCard';
import EmptyState from '@/components/EmptyState';

// Temp Check
const loading = false;
const data = false;

export default function Discover() {
  return (
    <App>
      {loading == true ? (
        <Center h="full" w="full">
          <Spinner speed="0.75s" size="xl" />
        </Center>
      ) : (
        <>
          {data ? (
            <>
              <Text mb="2" fontSize="sm" fontWeight="bold">
                Local businesses around you.
              </Text>
              <Wrap justify="start" spacing="8">
                {Array(8)
                  .fill('')
                  .map((_, i) => {
                    return <BusinessCard />;
                  })}
              </Wrap>
            </>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </App>
  );
}
