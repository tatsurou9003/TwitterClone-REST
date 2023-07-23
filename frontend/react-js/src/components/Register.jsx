import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/users/register/",
          {
            email: values.email,
            password: values.password,
          }
        );
        if (response.status === 201) {
          // 登録に成功したら、JWTを取得
          const authResponse = await axios.post(
            "http://localhost:8000/authen/jwt/create/",
            {
              email: values.email,
              password: values.password,
            }
          );
          localStorage.setItem("token", authResponse.data.access);
          navigate("/home");
        }
      } catch (error) {
        console.error("Registration Error:", error);
      }
    },
  });

  return (
    <Flex bg="teal.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={8} rounded="md">
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={8} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="email">Email Address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </FormControl>
            <Checkbox
              id="rememberMe"
              name="rememberMe"
              onChange={formik.handleChange}
              isChecked={formik.values.rememberMe}
              colorScheme="purple"
            >
              remember me ?
            </Checkbox>
            <Button type="submit" colorScheme="teal" width="full">
              Register
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
