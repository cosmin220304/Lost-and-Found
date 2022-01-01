import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';
import axios from 'axios';

function Register() {
  const [, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  function validate(value) {
    let error;
    if (!value || value === '') {
      error = 'Cannot be empty!';
    }
    return error;
  }

  async function onSubmit(values, actions) {
    try {
      const { data } = await axios.post(
        `userService/register?name=${values.name}&email=${values.email}&password=${values.password}`,
        {}
      );
      setUser(data);
      navigate('/');
    } catch (error) {
      if (error.response.status === 400) {
        alert('Email already in use!');
      } else {
        alert('Something went wrong!');
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Flex color="twitter.900" direction={'column'} alignItems={'center'}>
      <Text p="4">Create a new account:</Text>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={onSubmit}
      >
        {props => (
          <Form>
            <Field name="name" validate={validate}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.name && form.touched.name}
                  pb="4"
                >
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="full name"
                    bg="white"
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email" validate={validate}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  pb="4"
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="email" bg="white" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password" validate={validate}>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">
                    Password
                    <FormHelperText fontSize={'small'} textAlign={'start'}>
                      Make sure its correct!
                    </FormHelperText>
                  </FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type={'password'}
                    placeholder="password"
                    bg="white"
                  />

                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme="twitter"
              isLoading={props.isSubmitting}
              type="submit"
              width="100%"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Text mt={'4'}>or</Text>
      <Button
        mt={'4'}
        colorScheme="twitter"
        width={'14rem'}
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </Flex>
  );
}

export default Register;
