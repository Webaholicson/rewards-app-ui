import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '#/utils/api';
import Icon from './Icon';

interface ActivityItem {
    id: number;
    entity: string;
    entityId: number;
    action: string;
    details: string;
    createdAt: Date;
}

const getIconName = (entity: string): string => {
    switch (entity) {
        case 'Task':
            return 'bell'
        default:
            return 'bell'
    }
}

const getIcon = (entity: string, size?: 'sm' | 'md' | 'lg'): React.ReactNode => {
    return <Icon name={getIconName(entity)} size={size} />
}

const RecentActivities: React.FC = () => {

    const initialData: ActivityItem[] = [
        { id: 1, entity: 'Task', entityId: 1, action: 'Completed', details: 'Jack Doe completed a task', createdAt: new Date() },
        { id: 2, entity: 'Task', entityId: 2, action: 'Updated', details: 'John Doe updated a task', createdAt: new Date() },
        { id: 3, entity: 'Task', entityId: 3, action: 'Deleted', details: 'Jane Doe deleted a task', createdAt: new Date() },
    ]
    const [activities, setActivities] = useState<ActivityItem[]>(initialData)

    const { isLoading, error } = useQuery({
        queryKey: ['recentlyAdded'],
        queryFn: () => {
            return api.get('/rewards/recently-added')
                .then(response => setActivities(response.data))
                .catch(error => console.error(error))
        },
        enabled: false,
    })

    return (
        <div>
            <h1 className="border-b-1 border-gray-300 pb-2 mb-2 text-2xl font-bold">Recent Activities</h1>
            <div className="grid grid-cols-1">
                {isLoading && (
                    [1, 2, 3].map((item) => (
                        <div className="border-b-1 border-gray-300 py-2" key={item}>
                            <div className="py-2 my-2 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="py-2 my-2 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                    ))
                )}

                {error && <div className="text-red-500">{error.message}</div>}

                {!isLoading && !error && activities.length > 0 ? (
                    activities.map((item) => (
                        <div className="border-b-1 border-gray-300 py-2 last:border-b-0" key={item.id}>
                            <div className="flex flex-row items-center gap-2">
                                {getIcon(item.entity, 'sm')}
                                <h2 className="text-lg font-bold">{item.entity} {item.action}</h2>
                            </div>
                            <p>{item.details}</p>
                            <p>{item.createdAt.toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <div>No recently added items</div>
                )}
            </div>
        </div>
    );
}

export default RecentActivities