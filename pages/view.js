import App from '@/components/App';
import PrivateRouteWrapper from '@/components/PrivateRouteWrapper';
import { Wrap } from '@chakra-ui/react';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';
import BusinessCard from '@/components/BusinessCard';

const View = () => {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ['/api/user-businesses', user.token] : null,
    fetcher
  );

  const userBusinesses = data?.businesses;
  return (
    <App>
      <Wrap justify="center" spacing="8">
        {userBusinesses?.map((business) => (
          <BusinessCard key={business.id} {...business} editable="true" />
        ))}
      </Wrap>
    </App>
  );
};
export default PrivateRouteWrapper(View);
