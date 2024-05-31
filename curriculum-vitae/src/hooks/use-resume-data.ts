import { type StoragePartial, load, save } from '../storage'
import { useCallback, useEffect, useState } from 'react'
import { Cache } from '../util'

interface UseResumeDataReturn {
  isLoading: boolean
  data: StoragePartial
  saveResume: (data: unknown) => Promise<void>
  isCachedData: boolean
}

// NOTE: The purpose of this cache is to store the saved data so that the next
//       step in the form doesn't have to load it. So 1 second or less is enough
//       for the transition.
//       We don't want to store the data for too long as it could lead to outdated data,
//       specially if it's being edited from two tabs, etc.

const globalCache = new Cache<StoragePartial>(async () => {
  return (await load()) ?? {}
}, 300)

export const useResumeData = (): UseResumeDataReturn => {
  // NOTE: The initial state values are to avoid visual glitches.
  const [data, setData] = useState<StoragePartial>(globalCache.getOrNull() ?? {})
  const [isLoading, setIsLoading] = useState(globalCache.isExpired())
  const [isCachedData, setIsCachedData] = useState(!globalCache.isExpired())

  const saveResume = useCallback(async (data: unknown) => {
    await save(data)
    globalCache.put(await load() ?? {})
  }, [])

  useEffect(() => {
    const fn = async (): Promise<void> => {
      const { fromCache, data } = await globalCache.get()
      setIsCachedData(fromCache)
      setData(data)
      setIsLoading(false)
    }
    fn().catch(console.error)
  }, [])

  return { isLoading, data, saveResume, isCachedData }
}
