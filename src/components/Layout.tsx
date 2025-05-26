import { Box, Container, Flex, Link, Text, } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  console.log("Layout component loaded");

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box as="header" bg="brand.500" boxShadow="sm" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={3}>
              <Link as={RouterLink} to="/">
                <img src="/logo.png" alt="ג'וזות לוגו" style={{ width: 80, height: 80 }} />
              </Link>
            </Flex>
            <Flex gap={6}>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box flex="1">
        {children}
      </Box>

      <Box as="footer" bg="brand.600" py={6} mt="auto">
        <Container maxW="container.xl">
          <Text textAlign="center" color="brand.50">
            © {new Date().getFullYear()} ג'וזות. כל הזכויות שמורות.
          </Text>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout 