import { App } from './App.tsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { store } from './store.ts';
import { Login } from './components/Login/Login.tsx';
import { Home } from './pages/Home.tsx';
import { Store } from './pages/Store.tsx';
import { About } from './pages/About.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Profile } from './pages/Profile.tsx';
import { PrivateRoute } from './components/PrivateRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route index path="/" element={<Home />} />
      <Route path="/store" element={<Store />} />
      <Route path="/about" element={<About />} />
      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
