import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Select,
  Stack,
} from '@chakra-ui/react'
import type { Player } from '../types'

interface PlayerListProps {
  onPlayersChange: (players: Player[]) => void
}

type SavedPlayerList = {
  name: string
  players: Player[]
}

const PLAYER_LISTS_KEY = 'fifa-player-lists'

const PlayerList = ({ onPlayersChange }: PlayerListProps) => {
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [listName, setListName] = useState('')
  const [savedLists, setSavedLists] = useState<SavedPlayerList[]>([])
  const [selectedList, setSelectedList] = useState('')

  useEffect(() => {
    localStorage.setItem('fifa-players', JSON.stringify(players))
    onPlayersChange(players)
  }, [players, onPlayersChange])

  useEffect(() => {
    const lists = localStorage.getItem(PLAYER_LISTS_KEY)
    setSavedLists(lists ? JSON.parse(lists) : [])
  }, [])

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      alert('אנא הכנס שם שחקן')
      return
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      isActive: false,
    }

    setPlayers([...players, newPlayer])
    setNewPlayerName('')
  }

  const handleToggleActive = (playerId: string) => {
    setPlayers(
      players.map((player) =>
        player.id === playerId ? { ...player, isActive: !player.isActive } : player
      )
    )
  }

  const handleDeletePlayer = (playerId: string) => {
    setPlayers(players.filter((player) => player.id !== playerId))
  }

  const handleSaveList = () => {
    if (!listName.trim()) {
      alert('יש להזין שם לרשימה')
      return
    }
    const lists = localStorage.getItem(PLAYER_LISTS_KEY)
    const parsed: SavedPlayerList[] = lists ? JSON.parse(lists) : []
    const updated = [
      ...parsed.filter((l) => l.name !== listName.trim()),
      { name: listName.trim(), players },
    ]
    localStorage.setItem(PLAYER_LISTS_KEY, JSON.stringify(updated))
    setSavedLists(updated)
    alert('הרשימה נשמרה!')
  }

  const handleLoadList = () => {
    const found = savedLists.find((l) => l.name === selectedList)
    if (found) {
      setPlayers(found.players.map(p => ({ ...p, isActive: false })))
    }
  }

  return (
    <Box w="100%" maxW="600px" mx="auto">
      <VStack gap={4} align="stretch">
        <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="stretch">
          <Select
            placeholder="טען רשימה"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            w={{ base: '100%', md: 'auto' }}
          >
            {savedLists.map((l) => (
              <option key={l.name} value={l.name}>{l.name}</option>
            ))}
          </Select>
          <Button colorScheme="blue" onClick={handleLoadList} isDisabled={!selectedList} w={{ base: '100%', md: 'auto' }}>
            טען
          </Button>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="stretch">
          <Input
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="שם השחקן"
            onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
            w={{ base: '100%', md: 'auto' }}
          />
          <Button colorScheme="blue" onClick={handleAddPlayer} w={{ base: '100%', md: 'auto' }}>
            הוסף שחקן
          </Button>
        </Stack>

        <VStack gap={2} align="stretch">
          {players.map((player) => (
            <HStack key={player.id} justify="space-between" p={2} bg="brand.600" borderRadius="md">
              <HStack>
                <input
                  type="checkbox"
                  checked={player.isActive}
                  onChange={() => handleToggleActive(player.id)}
                />
                <Text color="text.500">{player.name}</Text>
              </HStack>
              <Button
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={() => handleDeletePlayer(player.id)}
              >
                מחק
              </Button>
            </HStack>
          ))}
        </VStack>
        {players.length > 0 && (
          <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="stretch">
            <Input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="שם לרשימה"
              w={{ base: '100%', md: 'auto' }}
            />
            <Button colorScheme="green" onClick={handleSaveList} w={{ base: '100%', md: 'auto' }}>
              שמור רשימה
            </Button>
            <Button colorScheme="red" variant="outline" onClick={() => setPlayers([])} w={{ base: '100%', md: 'auto' }}>
              איפוס שחקנים
            </Button>
          </Stack>
        )}
      </VStack>
    </Box>
  )
}

export default PlayerList 