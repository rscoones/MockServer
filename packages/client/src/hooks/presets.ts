import { List } from "@mockapiserver/types/List"
import { useEffect, useState } from "react"
import api from "../services/api"
import { Presets } from "@mockapiserver/types/Get"

export default function fetchPresets(
  url: string
): [
  { data: Presets; isLoading: boolean; error: Error | null },
  () => Promise<void>,
] {
  const [list, setList] = useState<Presets>({ verbs: [], routes: [] })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = async () => {
    setIsLoading(true)
    try {
      const data = await api.getPresets(url)
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
