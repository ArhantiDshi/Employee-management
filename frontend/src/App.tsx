import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import CreateEmployee from './pages/CreateEmployee'
import EditEmployee from './pages/EditEmployee'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './auth/AuthContext'

function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
        <Route
  path="/employees/new"
  element={<CreateEmployee />}
/>
<Route
  path="/employees/:id/edit"
  element={<EditEmployee />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
