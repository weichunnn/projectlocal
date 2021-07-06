import {
  Box,
  Flex,
  Image,
  Heading,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
  useToast,
  Divider,
  useColorMode
} from '@chakra-ui/react';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import HCaptcha from '@hcaptcha/react-hcaptcha';

import { useAuth } from '@/lib/auth';
import Logo from '@/components/Logo';
import SeoWrapper from '@/components/SeoWrapper';
import NextLink from 'next/link';

const Login = () => {
  const { colorMode } = useColorMode();
  const bg = { light: 'gray.100', dark: 'gray.800' };
  const inputBg = { light: 'white', dark: 'gray.700' };

  const { signupwithEmail, signinWithGoogle, loading } = useAuth();
  const [show, setShow] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleClick = () => setShow(!show);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm();
  const watchPassword = watch('password', '');
  const captchaRef = useRef(null);

  const onHCaptchaChange = (captchaCode) => {
    if (!captchaCode) {
      console.log('Denied :(');
      setCaptchaToken('');
    } else {
      console.log('Yay, verified');
      setCaptchaToken(captchaCode);
    }
  };

  const onSubmit = (data, e, provider = false) => {
    if (captchaToken == '') {
      toast({
        title: 'Hmmm, are you secretly a robot?',
        description: 'Please complete the hCaptcha before submitting?',
        status: 'warning',
        position: 'top-right',
        duration: 5000,
        isClosable: true
      });
      return;
    }

    const signupMethod = provider
      ? signinWithGoogle('/discover')
      : signupwithEmail(data.email, data.password, data.name, '/discover');

    signupMethod
      .then(() => {
        toast({
          title: 'Account created.',
          description: `We've created your account for you. Welcome to Project Local.`,
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
        setCaptchaToken('');
        captchaRef.current.resetCaptcha();
      });
  };

  return (
    <Box bg={bg[colorMode]} w="full" overflow="auto">
      <Flex direction={['column', null, 'row']} h="full" w="full">
        <Image
          h={['75%', null, '100vh']}
          w={['full', null, '40%']}
          src="/static/kuala-lumpur.jpeg"
        />
        <NextLink href="/" passHref>
          <Box as="a" ml="8" mt="8" pos="absolute" top="0" color="white">
            <Logo boxSize="16" withLogoName={true} fontSize="2xl" />
          </Box>
        </NextLink>
        <Flex flex="1">
          <Flex
            p="12"
            w="full"
            maxWidth="650px"
            m="auto"
            align="center"
            justify="center"
            direction="column"
          >
            <Heading w="full" mb="8" size="lg" fontWeight="800" align="left">
              Sign up to Project Local
            </Heading>
            <Button
              isFullWidth
              mb="4"
              iconSpacing="4"
              colorScheme="blue"
              leftIcon={<FaGoogle />}
              onClick={onSubmit.bind(this, null, null, true)}
              isLoading={loading}
            >
              Sign up with Google
            </Button>
            <Stack direction="row" w="full" align="center" spacing="8" mb="4">
              <Divider borderColor="gray.500" />
              <Text>Or</Text>
              <Divider borderColor="gray.500" />
            </Stack>
            <Box as="form" w="full" onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="name" mb="4" isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  bg={inputBg[colorMode]}
                  placeholder="John Baker"
                  variant="filled"
                  w="full"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl id="email" mb="4" isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  bg={inputBg[colorMode]}
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
                <FormHelperText>We'll never share your email.</FormHelperText>
                {errors.email && (
                  <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                )}
              </FormControl>
              <Stack
                direction={['column', null, 'row']}
                spacing={['4', null, '12']}
                mb="6"
              >
                <FormControl id="password" isInvalid={errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      bg={inputBg[colorMode]}
                      variant="filled"
                      placeholder="At least 8+ characters"
                      type={show ? 'text' : 'password'}
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must have at least 8 characters'
                        }
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <IconButton
                        variant="unstyled"
                        colorScheme="teal"
                        aria-label="Call Sage"
                        icon={<Icon as={show ? FaEyeSlash : FaEye} />}
                        onClick={handleClick}
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <FormErrorMessage>
                      {errors.password.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  id="confirmPassword"
                  isInvalid={errors.confirmPassword}
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    bg={inputBg[colorMode]}
                    variant="filled"
                    type="password"
                    placeholder="Re-enter password"
                    {...register('confirmPassword', {
                      required: 'Password is required',
                      validate: (value) =>
                        value === watchPassword || 'The passwords do not match'
                    })}
                  />
                  {errors.confirmPassword && (
                    <FormErrorMessage>
                      {errors.confirmPassword.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Stack>
              <Flex align="center" justify="center" my="4">
                <HCaptcha
                  id="signup-hcaptcha"
                  ref={captchaRef}
                  theme={colorMode}
                  size="normal"
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                  onVerify={onHCaptchaChange}
                />
              </Flex>
              <Button
                colorScheme="teal"
                isFullWidth
                type="submit"
                isLoading={loading}
              >
                Sign Me Up
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default function PersonalPage() {
  return (
    <SeoWrapper name="Login" path="/login">
      <Login />
    </SeoWrapper>
  );
}
