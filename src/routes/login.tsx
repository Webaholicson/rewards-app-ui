import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '@/components/LoginFrom'
import { isAuthenticated } from '#/utils/auth'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({ 
  component: LoginPage,
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard' });
    }
  }
})

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginForm />
    </div>
  )
}
