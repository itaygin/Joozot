import { Box, VStack, HStack, Text, Badge } from '@chakra-ui/react'
import type { Team } from '../types'

interface TeamListProps {
  teams: Team[]
}

const TeamList = ({ teams }: TeamListProps) => {
  return (
    <Box w="100%" maxW="600px" mx="auto">
      <VStack gap={4} align="stretch">
        {teams.map((team) => (
          <Box
            key={team.id}
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            border="1px"
            borderColor="gray.200"
          >
            <VStack align="start" gap={2}>
              <HStack>
                <Badge colorScheme="blue" fontSize="sm">
                  קבוצה {team.order}
                </Badge>
              </HStack>
              {team.players.length === 2 ? (
                <Text fontSize="lg" fontWeight="medium" color="black">
                  {team.players[0].name} + {team.players[1].name}
                </Text>
              ) : (
                <Text fontSize="lg" fontWeight="medium" color="black">
                  {team.players[0].name} <span style={{ color: 'gray' }}>(משחק אחרון)</span>
                </Text>
              )}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default TeamList 