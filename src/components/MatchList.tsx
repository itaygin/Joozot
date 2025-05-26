import { Box, VStack, Text } from '@chakra-ui/react'
import type { Team } from '../types'

interface MatchListProps {
  matches: { teamA: Team; teamB?: Team; isFinal?: boolean }[]
}

const getTeamNames = (team?: Team) => {
  if (!team || !team.players || team.players.length === 0) return '';
  if (team.players.length === 2) {
    return `${team.players[0].name} + ${team.players[1].name}`;
  } else if (team.players.length > 2) {
    return team.players.map(p => p.name).join(' + ');
  } else {
    return team.players[0].name;
  }
}

const MatchList = ({ matches }: MatchListProps) => {
  return (
    <Box w="100%" maxW="600px" mx="auto">
      <VStack gap={3} align="stretch">
        {matches.map((match, idx) => (
          <Box key={idx} p={3} bg="gray.50" borderRadius="md" border="1px" borderColor="gray.200">
            {match.isFinal ? (
              <Text fontWeight="medium" color="black">
                משחק אחרון: {getTeamNames(match.teamA)} נגד {getTeamNames(match.teamB!)} <span style={{ color: 'gray' }}>(בודד מצטרף למפסידים ומשחקים נגד המנצחים)</span>
              </Text>
            ) : match.teamB ? (
              <Text fontWeight="medium" color="black">
                משחק {idx + 1}: {getTeamNames(match.teamA)} נגד {getTeamNames(match.teamB)}
              </Text>
            ) : (
              <Text fontWeight="medium" color="black">
                משחק {idx + 1}: {getTeamNames(match.teamA)} <span style={{ color: 'gray' }}>(בוחר מהמפסידים)</span>
              </Text>
            )}
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default MatchList 