import { useEffect, useState } from 'react'
import { ContentDto } from '../types/types'

const useContentList = () => {
  const [contentList, setContentList] = useState<ContentDto[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:8000/')
        const data = await res.json()

        setContentList(data.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { contentList, isLoading, error }
}

export default useContentList
