import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  LinkBox,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const Top = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Flex
      bg="teal.100"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box width="300px" margin="4">
        <LinkBox
          as="article"
          borderWidth="1px"
          rounded="lg"
          onClick={handleRegister}
        >
          <Card
            _hover={{
              boxShadow: "lg",
              backgroundColor: "gray.100",
            }}
          >
            <CardHeader>
              <Heading size="md">Sign up</Heading>
            </CardHeader>
            <CardBody>
              <Text>一言呟いてかないか？</Text>
            </CardBody>
            <CardFooter>
              <ArrowForwardIcon boxSize={6} />
            </CardFooter>
          </Card>
        </LinkBox>
      </Box>
      <Box width="300px" margin="4">
        <LinkBox
          as="article"
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          onClick={handleLogin}
        >
          <Card
            _hover={{
              boxShadow: "lg",
              backgroundColor: "gray.100",
            }}
          >
            <CardHeader>
              <Heading size="md">Login</Heading>
            </CardHeader>
            <CardBody>
              <Text>元気そうで何よりだな。</Text>
            </CardBody>
            <CardFooter>
              <ArrowForwardIcon boxSize={6} />
            </CardFooter>
          </Card>
        </LinkBox>
      </Box>
    </Flex>
  );
};
