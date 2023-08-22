import { Container } from "react-bootstrap"
import { Header } from "./components/Header"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export const App = () => {
  return (
    <ShoppingCartProvider>
      <Header />
      <ToastContainer />
      <Container className="mb-4">
        <Outlet />
      </Container>
    </ShoppingCartProvider>
  )
}