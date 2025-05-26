import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import theme from './theme.tsx'
import Home from './pages/Home'
import Layout from './components/Layout'

console.log("App component loaded");

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Layout>
          <Home />
        </Layout>
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App
