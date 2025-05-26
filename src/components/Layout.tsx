import { Box, Container, Flex, Heading, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  console.log("Layout component loaded");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="brand.500">
      <Box as="header" bg="brand.600" boxShadow="sm" py={4} px={2}>
        <Container maxW="container.xl">
          <Flex justify={{ base: 'center', md: 'flex-start' }} align="center" gap={4}>
            <Link as={RouterLink} to="/">
              <img src="/logo.png" alt="ג'וזות לוגו" style={{ width: 80, height: 80, borderRadius: '50%' }} />
            </Link>
          </Flex>
        </Container>
      </Box>

      <Box flex="1">
        {children}
      </Box>

      <Box as="footer" bg="brand.600" py={6} mt="auto">
        <Container maxW="container.xl">
          <Heading as="h2" size="sm" textAlign="center" color="brand.50" fontWeight="normal">
            © {new Date().getFullYear()} ג'וזות. כל הזכויות שמורות.
          </Heading>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout 