import { useState } from 'react'
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
  useToast,
} from '@chakra-ui/react'
import type { Player, Team } from '../types'
import PlayerList from '../components/PlayerList'
import TeamList from '../components/TeamList'

const Home = () => {
  const [players, setPlayers] = useState<Player[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const toast = useToast()

  const generateTeams = () => {
    const activePlayers = players.filter((player) => player.isActive)
    
    if (activePlayers.length < 4) {
      toast({
        title: 'שגיאה',
        description: 'נדרשים לפחות 4 שחקנים פעילים',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // Shuffle players
    const shuffledPlayers = [...activePlayers].sort(() => Math.random() - 0.5)
    const newTeams: Team[] = []
    let i = 0;
    let order = 1;
    while (i < shuffledPlayers.length) {
      if (i + 1 < shuffledPlayers.length) {
        newTeams.push({
          id: Date.now().toString() + i,
          players: [shuffledPlayers[i], shuffledPlayers[i + 1]],
          order: order++,
        })
        i += 2;
      } else {
        // Last single player
        newTeams.push({
          id: Date.now().toString() + i,
          players: [shuffledPlayers[i]],
          order: order++,
        })
        i++;
      }
    }
    setTeams(newTeams)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8}>
        <Heading>מחולל קבוצות פיפא</Heading>
        
        <Box w="100%">
          <Heading size="md" mb={4}>
            רשימת שחקנים
          </Heading>
          <PlayerList onPlayersChange={setPlayers} />
        </Box>

        <Button
          colorScheme="blue"
          size="lg"
          onClick={generateTeams}
          isDisabled={players.filter((p) => p.isActive).length < 4}
        >
          צור קבוצות
        </Button>

        {teams.length > 0 && (
          <Box w="100%">
            <Heading size="md" mb={4}>
              קבוצות
            </Heading>
            <TeamList teams={teams} />
          </Box>
        )}
      </VStack>
    </Container>
  )
}

export default Home 