import { type StoragePartial, load, save } from '../storage'
import { useCallback, useEffect, useState } from 'react'

interface UseResumeDataReturn {
  isLoading: boolean
  data: StoragePartial
  saveResume: (data: unknown) => Promise<void>
}

let globalCache: StoragePartial | null = null
let cacheTimestamp = 0

// NOTE: The purpose of this cache is to store the saved data so that the next
//       step in the form doesn't have to load it. So 1 second or less is enough
//       for the transition.
//       We don't want to store the data for too long as it could lead to outdated data,
//       specially if it's being edited from two tabs, etc.
const EXPIRE_MS = 500
const isExpired = (): boolean => Number(new Date()) - cacheTimestamp > EXPIRE_MS

const saveToCache = (data: StoragePartial): void => {
  cacheTimestamp = Number(new Date())
  globalCache = data
}

const getFromCache = (): StoragePartial | null => {
  if (isExpired()) return null
  return globalCache
}

export const useResumeData = (): UseResumeDataReturn => {
  const [data, setData] = useState<StoragePartial>({})
  const [isLoading, setIsLoading] = useState(true)

  const saveResume = useCallback(async (data: unknown) => {
    await save(data)
    saveToCache(await load() ?? {})
  }, [])

  useEffect(() => {
    const fn = async (): Promise<void> => {
      const data = getFromCache() ?? ((await load()) ?? {})

      setData(data)
      setIsLoading(false)
    }
    fn().catch(console.error)
  }, [])
  return { isLoading, data, saveResume }
}
