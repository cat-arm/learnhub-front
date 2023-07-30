import useContent from '../hooks/useContent'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { FormEvent } from 'react'
import { toast } from 'react-hot-toast'

const Delete = () => {
  const { id } = useParams()
  const { isLoading, error } = useContent(id || '1')
  const navigate = useNavigate()

  const handleDelete = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`http://localhost:8000/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      })
      const data = await res.json()

      if (data.statusCode >= 400) {
        throw new Error(data.message)
      }

      toast.success('Succesfully Delete!')
      navigate(`/`)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  if (isLoading) return <Loading />

  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <button onClick={handleDelete} className="inline absolute right-0 top-0 text-2xl">
      ❌
    </button>
  )
}

export default Delete
