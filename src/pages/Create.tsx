import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'

const Create = () => {
  const navigate = useNavigate()
  const [rating, setRating] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      await fetch('http://localhost:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoUrl: url,
          comment,
          rating,
        }),
      })
      toast.success('Succesfully created!')
      navigate('/')
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  return (
    <form
      onSubmit={handleCreate}
      className="flex flex-col gap-6 max-w-lg bg-gray-100 rounded-xl mx-auto my-14 py-5 px-7"
    >
      <div className="flex flex-col gap-2">
        <label>Video Url:</label>
        <input className="p-3 rounded" type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>Comment:</label>
        <input
          className="p-3 rounded"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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
      <button className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600">Submit</button>
    </form>
  )
}

export default Create
