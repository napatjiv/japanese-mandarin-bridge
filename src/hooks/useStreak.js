import { useState, useCallback, useEffect } from 'react'
import { getStreak, updateStreak as storageUpdateStreak } from '../utils/storage'

export function useStreak() {
  const [streak, setStreak] = useState(() => getStreak())

  const recordActivity = useCallback(() => {
    const updated = storageUpdateStreak()
    setStreak(updated)
  }, [])

  return { streak, recordActivity }
}
