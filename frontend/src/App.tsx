import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Employees from './pages/Employees'
import CreateEmployee from './pages/CreateEmployee'
import EditEmployee from './pages/EditEmployee'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './auth/AuthContext'
import UserAccounts from './pages/UserAccounts'

function App() {
  return <AuthProvider><AppRoutes /></AuthProvider>
}

function AppRoutes() {
  const { isAuthenticated, role } = useAuth()
  const canManageEmployees = role === 'ADMIN' || role === 'HR_MANAGER'

  if (!isAuthenticated) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={role === 'VIEWER' ? <Navigate to="/" replace /> : <Employees />} />
          <Route path="/users" element={role === 'ADMIN' ? <UserAccounts /> : <Navigate to="/" replace />} />
          <Route path="/employees/new" element={canManageEmployees ? <CreateEmployee /> : <Navigate to="/employees" replace />} />
          <Route path="/employees/:id/edit" element={canManageEmployees ? <EditEmployee /> : <Navigate to="/employees" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
