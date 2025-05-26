import { useQuery } from '@tanstack/react-query'
import api from '../services/api'

interface Data {
  id: number
  title: string
  description: string
}

export const useData = () => {
  return useQuery<Data[]>({
    queryKey: ['data'],
    queryFn: async () => {
      const { data } = await api.get('/data')
      return data
    },
  })
}

export default useData 