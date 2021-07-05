import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const PrivateRouteWrapper = (Component) => (props) => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else if (!user & (user != null)) {
      router.push('/signup');
    }
  }, [user]);

  if (loading) {
    return (
      <Center h="100vh" bg="gray.100" overflow="auto">
        <Spinner />
      </Center>
    );
  } else {
    return <Component {...props} />;
  }
};

export default PrivateRouteWrapper;
