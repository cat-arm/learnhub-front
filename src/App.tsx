import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Content from './pages/Content'
import Login from './pages/Login'
import Create from './pages/Create'
import { Toaster } from 'react-hot-toast'
import Edit from './pages/Edit'
import GuardedRoute from './guards/GuardedRoute'
import { useAuth } from './providers/AuthProvider'
import Register from './pages/Register'

function App() {
  const { isLoggedIn } = useAuth()

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<GuardedRoute isRouteAccessible={!isLoggedIn} redirectRoute="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />}>
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
        <Route path="/content/:id" element={<Content />} />
      </Routes>
    </>
  )
}

export default App
