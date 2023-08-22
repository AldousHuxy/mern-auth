import { Route, Routes } from "react-router-dom"
import { Login } from "./components/Login"
import { Home } from "./pages/Home"
import './components/Login.scss'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route index path="/login" element={<Login />} />
    </Routes>
  )
}