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
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, RepeatIcon, DownloadIcon } from '@chakra-ui/icons'
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
      setListName(found.name)
      setSelectedList(found.name)
    }
  }

  return (
    <>
      <Box bg="brand.50" rounded="xl" shadow="md" p={4} w="100%" maxW="600px" mx="auto">
        <VStack gap={6} align="stretch">
          <Stack direction={{ base: 'column', md: 'row' }} spacing={2} align="stretch">
            <Select
              placeholder="טען רשימה"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              w={{ base: '100%', md: 'auto' }}
              color="black"
            >
              {savedLists.map((l) => (
                <option key={l.name} value={l.name}>{l.name}</option>
              ))}
            </Select>
            <Button leftIcon={<DownloadIcon />} colorScheme="blue" onClick={handleLoadList} isDisabled={!selectedList} w={{ base: '100%', md: 'auto' }}>
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
              color="black"
            />
            <Button leftIcon={<AddIcon />} colorScheme="green" onClick={handleAddPlayer} w={{ base: '100%', md: 'auto' }}>
              הוסף שחקן
            </Button>
          </Stack>
          <VStack gap={2} align="stretch">
            {players.map((player) => (
              <HStack
                key={player.id}
                justify="space-between"
                p={2}
                bg="brand.100"
                rounded="md"
                cursor="pointer"
                onClick={() => handleToggleActive(player.id)}
                _hover={{ bg: 'brand.200' }}
              >
                <HStack pointerEvents="none">
                  <Avatar name={player.name} size="sm" bg="brand.500" color="white" />
                  <Text color="brand.700" fontWeight="medium">{player.name}</Text>
                </HStack>
                <HStack>
                  <input
                    type="checkbox"
                    checked={player.isActive}
                    readOnly
                    style={{ width: 18, height: 18 }}
                    tabIndex={-1}
                  />
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                    onClick={e => { e.stopPropagation(); handleDeletePlayer(player.id); }}
                    leftIcon={<DeleteIcon />}
                  >
                    מחק
                  </Button>
                </HStack>
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
                color="black"
              />
              <Button leftIcon={<DownloadIcon />} colorScheme="green" onClick={handleSaveList} w={{ base: '100%', md: 'auto' }}>
                שמור רשימה
              </Button>
              <Button leftIcon={<RepeatIcon />} colorScheme="red" variant="outline" onClick={() => setPlayers([])} w={{ base: '100%', md: 'auto' }}>
                איפוס שחקנים
              </Button>
            </Stack>
          )}
        </VStack>
      </Box>
    </>
  )
}

export default PlayerList 