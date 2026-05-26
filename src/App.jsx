import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'

// Layouts
import { PublicLayout } from './layouts/PublicLayout'
import { StudentLayout } from './layouts/StudentLayout'
import { AdminLayout } from './layouts/AdminLayout'

// Public Pages
import LandingPage from './pages/LandingPage'
import CourseCatalog from './pages/CourseCatalog'
import CourseDetail from './pages/CourseDetail'
import PricingPage from './pages/PricingPage'
import CheckoutPage from './pages/CheckoutPage'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import VerifyEmailPage from './pages/auth/VerifyEmailPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Student Pages
import Dashboard from './pages/student/Dashboard'
import LessonViewer from './pages/student/LessonViewer'
import IDEPage from './pages/student/IDEPage'
import AIPage from './pages/student/AIPage'
import QuizPage from './pages/student/QuizPage'
import LeaderboardPage from './pages/student/LeaderboardPage'
import ProfilePage from './pages/student/ProfilePage'
import NotificationsPage from './pages/student/NotificationsPage'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminCourses from './pages/admin/AdminCourses'
import AdminPlans from './pages/admin/AdminPlans'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
          </Route>

          {/* Auth (no footer/nav wrapper — just plain layout) */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          {/* Student (protected) */}
          <Route element={<StudentLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/ai" element={<AIPage />} />
            <Route path="/courses/:slug/lessons/:lessonId" element={<LessonViewer />} />
            <Route path="/courses/:slug/quiz/:quizId" element={<QuizPage />} />
            <Route path="/courses/:slug/quiz" element={<QuizPage />} />
          </Route>

          {/* IDE — full screen, own layout */}
          <Route path="/courses/:slug/lessons/:lessonId/ide" element={<IDEPageWrapper />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="plans" element={<AdminPlans />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function IDEPageWrapper() {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-14 bg-white border-b border-hairline flex items-center px-4">
        <span className="font-bold text-sm flex items-center gap-2">
          <span className="w-6 h-6 bg-black rounded-xs flex items-center justify-center">
            <span className="text-white text-[10px] font-mono">TL</span>
          </span>
          ThreadLearn IDE
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <IDEPage />
      </div>
    </div>
  )
}
