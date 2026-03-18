import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement } from 'chart.js'
import type { ChartItem } from 'chart.js'
import { useEffect, useRef } from 'react'

Chart.register([
    CategoryScale,
    LineController,
    LineElement,
    LinearScale,
    PointElement
  ]);

const Visualization: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d') as ChartItem
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                    }],
                },
            })
        }
    }, [canvasRef])
    return (
        <div className="w-full h-full flex flex-col">
            <h1 className="text-2xl font-bold border-b border-gray-300 pb-2">Visualization</h1>
            <canvas ref={canvasRef} className="w-full h-full mt-4"></canvas>
        </div>
    )
}

export default Visualization