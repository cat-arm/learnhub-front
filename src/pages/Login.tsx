import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [passwordInput, setPasswordInput] = useState<string>('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      await login(usernameInput, passwordInput)

      toast.success('Logged In!')
      navigate('/')
    } catch (err: any) {
      console.log(err)
      toast.error(`Username or Password is wronged`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-xs bg-gray-100 rounded-xl mx-auto my-14 py-5 px-7"
    >
      <div className="flex flex-col gap-2">
        <label>Username</label>
        <input className="p-3 rounded" type="text" onChange={(e) => setUsernameInput(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input className="p-3 rounded" type="password" onChange={(e) => setPasswordInput(e.target.value)} required />
      </div>
      <button className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600">Login</button>
    </form>
  )
}

export default Login
