export interface Player {
  id: string
  name: string
  isActive: boolean
}

export interface Team {
  id: string
  players: Player[] // can be 1 or 2
  order: number
} 