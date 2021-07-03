import { Text, Wrap, Center, Spinner } from '@chakra-ui/react';
import useSWR from 'swr';

import BusinessCard from '@/components/BusinessCard';
import EmptyBookmarks from '@/components/EmptyBookmarks';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import App from '@/components/App';
import searchLogic from '@/utils/searchLogic';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const Favourites = () => {
  const { user } = useAuth();
  const { data: businessesData } = useSWR('/api/businesses', fetcher);
  const { data: preferencesData } = useSWR(
    user ? ['/api/preferences', user.token] : null,
    fetcher
  );
  const businessIds = preferencesData?.preferences.bookmarks;
  const bookmarkedBusiness = businessesData?.businesses.filter((business) => {
    return businessIds?.includes(business.id);
  });

  const filteredBookmarkedBusinesses = searchLogic(
    typeof bookmarkedBusiness == 'undefined' ? [] : bookmarkedBusiness
  );

  return (
    <App>
      <>
        {bookmarkedBusiness ? (
          filteredBookmarkedBusinesses?.length ? (
            <>
              <Text mb="4" fontSize="sm" fontWeight="bold">
                Your favourite local businesses (Make sure you tick all the
                categories you want to see)
              </Text>
              <Wrap justify="center" spacing="8">
                {bookmarkedBusiness?.map((business) => (
                  <BusinessCard key={business.id} {...business} />
                ))}
              </Wrap>
            </>
          ) : (
            <EmptyBookmarks />
          )
        ) : (
          <Center mt="24" w="full">
            <Spinner size="xl" speed="0.5s" />
          </Center>
        )}
      </>
    </App>
  );
};

export default PrivateRouteWrapper(Favourites);
