import { Wrap } from '@chakra-ui/react';
import useSWR from 'swr';

import App from '@/components/App';
import EmptyState from '@/components/EmptyState';
import EmptyPersonalBusiness from '@/components/EmptyPersonalBusiness';
import LoadingAppState from '@/components/LoadingAppState';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import BusinessCard from '@/components/BusinessCard';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import searchLogic from '@/utils/searchLogic';

const Personal = () => {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ['/api/user-businesses', user.token] : null,
    fetcher
  );
  const userBusinesses = data?.businesses;

  const filteredBusinesses = searchLogic(
    typeof userBusinesses == 'undefined' ? [] : userBusinesses
  );
  return (
    <App>
      {data ? (
        userBusinesses.length ? (
          filteredBusinesses.length ? (
            <Wrap justify="center" spacing="8">
              {filteredBusinesses?.map((business) => (
                <BusinessCard key={business.id} {...business} editable="true" />
              ))}
            </Wrap>
          ) : (
            <EmptyState />
          )
        ) : (
          <EmptyPersonalBusiness />
        )
      ) : (
        <LoadingAppState />
      )}
    </App>
  );
};

export default PrivateRouteWrapper(Personal);
