import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route,  } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import DashboardScreen from './screens/DashboardScreen.jsx'
import TodoDetailsScreen from './screens/TodoDetailsScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='login' element={<LoginScreen />} />
      <Route path='/profile' element={<ProfileScreen />} />
      <Route path='/dashboard' element={<DashboardScreen />} />
      <Route path='/:id' element={<TodoDetailsScreen />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
