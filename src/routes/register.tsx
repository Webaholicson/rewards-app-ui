import RegisterForm from '#/components/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'
import { isAuthenticated } from '#/utils/auth'
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RegisterForm />
    </div>
  )
}
