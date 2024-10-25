import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const DynamicPercentileGraph = () => {
  const { percentile } = useSelector(state => state.user);

  const points = [
    { x: 0, y: 5 },
    { x: 10, y: 8 },
    { x: 20, y: 12 },
    { x: 25, y: 25 },
    { x: 30, y: 35 },
    { x: 35, y: 45 },
    { x: 40, y: 65 },
    { x: 45, y: 90 },
    { x: 50, y: 85 },
    { x: 60, y: 55 },
    { x: 70, y: 25 },
    { x: 80, y: 15 },
    { x: 90, y: 25 },
    { x: 100, y: 5 }
  ];

  function getYValueAtX(x, points) {
    const leftPoint = points.reduce((prev, curr) => 
      curr.x <= x ? curr : prev
    );
    const rightPoint = points.find(point => point.x > x) || points[points.length - 1];
    
    if (leftPoint === rightPoint) return leftPoint.y;
    
    const ratio = (x - leftPoint.x) / (rightPoint.x - leftPoint.x);
    return leftPoint.y + ratio * (rightPoint.y - leftPoint.y);
  }

  const data = useMemo(() => ({
    datasets: [
      {
        label: 'Distribution',
        data: points,
        borderColor: 'rgb(107, 114, 255)',
        backgroundColor: 'rgb(107, 114, 255)',
        pointRadius: 3,
        pointBorderWidth: 1,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(107, 114, 255)',
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        showLine: true
      },
      {
        label: 'Your Percentile',
        data: percentile !== undefined ? [{ x: percentile, y: getYValueAtX(percentile, points) }] : [],
        pointRadius: 6,
        pointBorderWidth: 2,
        pointBackgroundColor: 'white',
        pointBorderColor: 'rgb(120, 120, 120)', // Darker gray for the dot
        showLine: false
      }
    ]
  }), [percentile]);

  const verticalLinePlugin = useMemo(() => ({
    id: 'verticalLine',
    beforeDatasetsDraw: (chart) => {
      if (percentile === undefined) return;
      
      const { ctx, scales: { x, y } } = chart;
      const xPos = x.getPixelForValue(percentile);
      
      // Draw percentile vertical line
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(120, 120, 120, 0.8)'; // Darker gray for the line
      ctx.setLineDash([]);
      ctx.moveTo(xPos, y.getPixelForValue(y.max));
      ctx.lineTo(xPos, y.getPixelForValue(y.min));
      ctx.stroke();
      ctx.restore();

      // Draw hover line if there's an active tooltip
      const tooltip = chart.tooltip;
      if (tooltip?.getActiveElements()?.length) {
        const activePoint = tooltip.getActiveElements()[0];
        const x = activePoint.element.x;
        
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(107, 114, 255, 0.5)';
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.moveTo(x, y.getPixelForValue(y.max));
        ctx.lineTo(x, y.getPixelForValue(y.min));
        ctx.stroke();
        ctx.restore();
      }
    },
    afterDatasetsDraw: (chart) => {
      if (percentile === undefined) return;
      
      const { ctx, scales: { x } } = chart;
      const xPos = x.getPixelForValue(percentile);
      
      // Add percentile label
      ctx.save();
      ctx.font = '12px Arial';
      ctx.fillStyle = 'rgb(120, 120, 120)'; // Darker gray for the text
      ctx.textAlign = 'center';
      ctx.fillText(`Your percentile`, xPos, 20);
      ctx.restore();

      // Enhanced point highlighting on hover
      const tooltip = chart.tooltip;
      if (tooltip?.getActiveElements()?.length) {
        const activePoint = tooltip.getActiveElements()[0];
        const meta = chart.getDatasetMeta(0);
        
        meta.data.forEach((point, index) => {
          const isActive = index === activePoint.dataIndex;
          const baseRadius = 3;
          const hoverRadius = 7;
          const radius = isActive ? hoverRadius : baseRadius;
          
          if (isActive) {
            // Draw point shadow
            ctx.save();
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius + 3, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(107, 114, 255, 0.2)';
            ctx.fill();
            ctx.restore();
          }

          // Draw point
          ctx.save();
          ctx.beginPath();
          ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI);
          ctx.fillStyle = isActive ? 'rgb(107, 114, 255)' : 'white';
          ctx.strokeStyle = 'rgb(107, 114, 255)';
          ctx.lineWidth = isActive ? 2 : 1;
          ctx.fill();
          ctx.stroke();
          
          if (isActive) {
            // Draw inner dot
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
          }
          
          ctx.restore();
        });
      }
    }
  }), [percentile]);

  const options = useMemo(() => ({
    animation: {
      duration: 150
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 30,
        bottom: 10
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'rgb(107, 114, 255)',
        borderColor: 'rgb(200, 200, 200)',
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        position: 'nearest',
        intersect: false,
        mode: 'index',
        callbacks: {
          title: (context) => {
            const value = context[0].raw.x;
            return `Percentile: ${value}`;
          },
          label: (context) => {
            return context.datasetIndex === 1 ? 
              'Your Position' : 
              'Distribution Point';
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        display: true,
        min: 0,
        max: 100,
        grid: {
          display: false
        },
        ticks: {
          stepSize: 25,
          callback: function(value) {
            return [0, 25, 50, 75, 100].includes(value) ? value : '';
          },
          font: {
            size: 12
          },
          color: 'rgb(100, 100, 100)'
        }
      },
      y: {
        display: false,
        grid: {
          display: false
        }
      }
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  }), []);

  useEffect(() => {
    const plugin = verticalLinePlugin;
    ChartJS.register(plugin);
    return () => {
      ChartJS.unregister(plugin);
    };
  }, [verticalLinePlugin]);

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <div className="flex justify-center items-center h-64 w-full max-w-lg">
        <Line options={options} data={data} />
      </div>
      {percentile !== undefined && (
        <div className="text-sm text-gray-600"> {/* Darker gray for the bottom text */}
          Your score is in the {percentile}th percentile
        </div>
      )}
    </div>
  );
};

export default DynamicPercentileGraph;