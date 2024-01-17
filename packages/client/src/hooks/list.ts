import { List } from "@mockapiserver/types/List"
import { useEffect, useState } from "react"
import api from "../services/api"

export default function fetchList(): [
  { data: List; isLoading: boolean; error: Error | null },
  () => Promise<void>,
] {
  const [list, setList] = useState<List>({ verbs: [], routes: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = async () => {
    setIsLoading(true)
    try {
      const data = await api.list()
      setList(data)
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => refetch())()
  }, [])

  return [{ data: list, isLoading, error }, refetch]
}
