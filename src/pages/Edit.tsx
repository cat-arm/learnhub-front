import ReactStars from 'react-stars'
import useContent from '../hooks/useContent'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Edit = () => {
  const { id } = useParams()
  const { content, isLoading, error } = useContent(id || '1')
  const navigate = useNavigate()
  const [rating, setRating] = useState<number>(0)
  const [newComment, setNewComment] = useState<string>('')

  // * To pre-filled comment and stars with the original data
  useEffect(() => {
    if (content) {
      setRating(content.rating)
      setNewComment(content.comment)
    }
  }, [content])

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const res = await fetch(`http://localhost:8000/content/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comment: newComment,
          rating,
        }),
      })
      const data = await res.json()

      if (data.statusCode >= 400) {
        throw new Error(data.message)
      }

      toast.success('Succesfully edited!')
      navigate(`/content/${id}`)
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  if (isLoading || !content) return <Loading />

  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <form onSubmit={handleEdit} className="flex flex-col gap-6 max-w-lg bg-gray-100 rounded-xl mx-auto my-14 py-5 px-7">
      <h1 className="font-bold text-3xl text-orange-500 text-center">Edit</h1>
      <div className="flex flex-col gap-2">
        <label>Comment:</label>
        <input
          className="p-3 rounded"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <label>Rating:</label>
        <ReactStars
          count={5}
          value={rating}
          onChange={(rating) => setRating(rating)}
          size={24}
          color2={'#ffd700'}
          half={false}
        />
      </div>
      <button className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600">Edit</button>
    </form>
  )
}

export default Edit
