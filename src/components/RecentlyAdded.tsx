import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '#/utils/api';

interface RecentlyAddedItem {
    id: string;
    name: string;
    description: string;
}

const RecentlyAdded: React.FC = () => {

    const initialData: RecentlyAddedItem[] = [
        { id: '1', name: 'Item 1', description: 'Description 1' },
        { id: '2', name: 'Item 2', description: 'Description 2' },
        { id: '3', name: 'Item 3', description: 'Description 3' },
    ]
    const [recentlyAdded, setRecentlyAdded] = useState<RecentlyAddedItem[]>(initialData)

    const { isLoading, error } = useQuery({
        queryKey: ['recentlyAdded'],
        queryFn: () => {
            return api.get('/rewards/recently-added')
                .then(response => setRecentlyAdded(response.data))
                .catch(error => console.error(error))
        },
        enabled: false,
    })

    return (
        <div>
            <h1 className="border-b-1 border-gray-300 pb-2 mb-2 text-2xl font-bold">Recently Added</h1>
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

                {!isLoading && !error && recentlyAdded.length > 0 ? (
                    recentlyAdded.map((item) => (
                        <div className="border-b-1 border-gray-300 py-2 last:border-b-0" key={item.id}>
                            <h2>{item.name}</h2>
                            <p>{item.description}</p>
                        </div>
                    ))
                ) : (
                    <div>No recently added items</div>
                )}
            </div>
        </div>
    );
}

export default RecentlyAdded