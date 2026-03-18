import { createFileRoute, redirect } from '@tanstack/react-router'
import { isAuthenticated } from '#/utils/auth'

export const Route = createFileRoute('/_auth')({
    beforeLoad: async ({ location }) => {
      if (!isAuthenticated()) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        })
      }
    },
  })