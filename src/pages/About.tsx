import { Container, Heading, Text, Box } from '@chakra-ui/react'

const About = () => {
  return (
    <Container maxW="container.xl">
      <Box py={10}>
        <Heading as="h1" size="2xl" mb={6}>
          About Us
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={6}>
          We are a team of passionate developers dedicated to creating amazing web applications.
          Our mission is to build tools that make people's lives better and more efficient.
        </Text>
        <Text fontSize="lg" color="gray.600">
          This template is built with modern technologies including:
        </Text>
        <Box as="ul" mt={4} pl={6}>
          <Text as="li" fontSize="lg" color="gray.600" mb={2}>
            React with TypeScript for type-safe development
          </Text>
          <Text as="li" fontSize="lg" color="gray.600" mb={2}>
            Chakra UI for beautiful and accessible components
          </Text>
          <Text as="li" fontSize="lg" color="gray.600" mb={2}>
            React Router for seamless navigation
          </Text>
          <Text as="li" fontSize="lg" color="gray.600">
            React Query for efficient data fetching and caching
          </Text>
        </Box>
      </Box>
    </Container>
  )
}

export default About 