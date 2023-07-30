import * as React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import { toast } from 'react-hot-toast'

function Register() {
  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [usernameInput, setUsernameInput] = React.useState('')
  const [yourNameInput, setYourNameInput] = React.useState('')
  const [passwordInput, setPasswordInput] = React.useState('')
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false)

  const [confirmPasswordInput, setConfirmPasswordInput] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isSubmitting) return setSubmitting(true)
    try {
      if (passwordInput === confirmPasswordInput) {
        const res = await fetch('http://localhost:8000/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: usernameInput,
            name: yourNameInput,
            password: passwordInput,
          }),
        })
        await res.json()
        toast.success('Register!')
        await login(usernameInput, passwordInput)
        navigate('/')
      } else {
        toast.error(`Password and Confirm Password is no matching`)
      }
    } catch (err: any) {
      console.log(err)
      toast.error('invalid username or password')
    } finally {
      setSubmitting(false)
    }
  }
  if (isLoggedIn) return <Navigate to="/" />
  return (
    <form
      className="flex flex-col gap-6 max-w-xs bg-gray-100 rounded-xl mx-auto my-14 py-5 px-7"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label>Username</label>
        <input className="p-3 rounded" type="text" onChange={(e) => setUsernameInput(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>Yourname</label>
        <input className="p-3 rounded" type="text" onChange={(e) => setYourNameInput(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>Password</label>
        <input className="p-3 rounded" type="password" onChange={(e) => setPasswordInput(e.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label>Confirm Password</label>
        <input
          className="p-3 rounded"
          type="password"
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
          required
        />
      </div>
      <button className="bg-orange-500 p-3 rounded-lg text-white hover:bg-orange-600">Register</button>
    </form>
  )
}

export default Register
