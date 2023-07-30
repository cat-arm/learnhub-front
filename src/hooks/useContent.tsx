import { useEffect, useState } from 'react'
import { ContentDto } from '../types/types'

const useContent = (id: string) => {
  const [content, setContent] = useState<ContentDto | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:8000/content/${id}`)
        const data = await res.json()

        setContent(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { content, isLoading, error }
}

export default useContent
