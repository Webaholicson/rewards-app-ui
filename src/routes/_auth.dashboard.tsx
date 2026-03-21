import { createFileRoute } from '@tanstack/react-router'
import RecentlyAdded from '#/components/RecentlyAdded'
import RecentActivities from '#/components/RecentActivities'
import Visualization from '#/components/Visualization'

const RouteComponent = () => {
  return (
    <>
      <div className="flex flex-row gap-4 p-4">
        <div className="w-1/2 page-wrap px-4 pb-4 pt-4 island-shell rounded-2xl shadow-lg">
          <RecentActivities />
        </div>
        <div className="w-1/2 page-wrap px-4 pb-4 pt-4 island-shell rounded-2xl shadow-lg">
          <RecentlyAdded />
        </div>
      </div>

      <div className="flex flex-row gap-4 p-4">
        <div className="w-1/2 page-wrap px-4 pb-4 pt-4 island-shell rounded-2xl shadow-lg">
          <Visualization />
        </div>
        <div className="w-1/2 page-wrap px-4 pb-4 pt-4 island-shell rounded-2xl shadow-lg">
          <Visualization />
        </div>
      </div>
    </>
  )
}

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})