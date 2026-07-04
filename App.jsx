import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ClubProvider } from './contexts/ClubContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import StudyClubPage from './pages/StudyClubPage'
import AIAssistantPage from './pages/AIAssistantPage'
import PlannerPage from './pages/PlannerPage'
import AppLayout from './components/layout/AppLayout'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}><div className="loading-spinner" style={{ width:32, height:32 }} /></div>
  return user ? children : <Navigate to="/login" replace />
}

const AppRoutes = () => {
  const { user } = useAuth()
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clubs" element={<StudyClubPage />} />
        <Route path="/ai" element={<AIAssistantPage />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ClubProvider>
            <AppRoutes />
            <Toaster position="bottom-right" toastOptions={{ style: { background:'var(--bg-card)', color:'var(--text-primary)', border:'1px solid var(--border)', borderRadius:'10px', fontSize:'0.875rem', fontFamily:'var(--font-body)' } }} />
          </ClubProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
