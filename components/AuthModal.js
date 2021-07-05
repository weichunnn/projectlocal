import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
  Stack,
  useToast,
  Divider,
  Link,
  Icon,
  Wrap,
  useColorMode
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

import Logo from './Logo';
import { useAuth } from '@/lib/auth';

export const AuthModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={['350px', '500px']}>
        <ModalCloseButton />

        <ModalBody>
          <Stack direction="column" px="10" py="6">
            <Center mb="4">
              <Logo boxSize="24" />
            </Center>
            <Button
              isFullWidth
              iconSpacing="4"
              colorScheme="blue"
              leftIcon={<Icon as={FaGoogle} />}
              onClick={onSubmit.bind(this, null, null, true)}
            >
              Sign in with Google
            </Button>
            <Stack direction="row" w="full" align="center" spacing="8">
              <Divider borderColor="gray.500" />
              <Text>Or</Text>
              <Divider borderColor="gray.500" />
            </Stack>
            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="email" mb="4" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  w="full"
                  variant="filled"
                  placeholder="johnbaker@gmail.com"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="password" mb="6" isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  variant="filled"
                  type="password"
                  {...register('password', {
                    required: 'Password is required'
                  })}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button colorScheme="teal" isFullWidth type="submit" mb="2">
                Sign In
              </Button>
            </Box>
            <Wrap justify="center">
              <Text>Don't have an account? </Text>&nbsp;
              <NextLink href="/signup" passHref>
                <Link
                  color={colorMode == 'light' ? 'teal' : 'teal.100'}
                  fontWeight="medium"
                >
                  Sign up here
                </Link>
              </NextLink>
            </Wrap>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const withAuthModal = (Component) => (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { signinWithEmail, signinWithGoogle } = useAuth();

  const toast = useToast();

  const onSubmit = (data, _, provider = false) => {
    const signinMethod = provider
      ? signinWithGoogle()
      : signinWithEmail(data.email, data.password, data.name);

    signinMethod
      .then(() => {
        toast({
          title: 'Signed In',
          description: 'You are signed into Project Local.',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      })
      .catch((error) => {
        toast({
          title: 'An error had occured.',
          description: error.message,
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true
        });
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <>
      <AuthModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
      <Component openAuthModal={onOpen} {...props} />
    </>
  );
};
