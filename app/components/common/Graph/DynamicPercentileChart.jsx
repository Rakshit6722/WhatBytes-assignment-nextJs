import React from 'react';
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
  const { percentile = 25 } = useSelector(state => state.user);

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

  const data = {
    datasets: [{
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
    }]
  };

  const options = {
    animation: {
      duration: 150 // Faster animations for smoother interactions
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
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
            const value = points[context[0].dataIndex].x;
            return `${value}`;
          },
          label: (context) => {
            return 'numberOfStudent: 4';
          },
          beforeTitle: () => null,
          beforeLabel: () => null,
          afterLabel: () => null
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
  };

  const verticalLinePlugin = {
    id: 'verticalLine',
    beforeDraw: (chart) => {
      const { ctx } = chart;
      
      // Draw the percentile line
      if (percentile) {
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;
        const x = xAxis.getPixelForValue(percentile);
        
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgb(200, 200, 200)';
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, yAxis.getPixelForValue(yAxis.max));
        ctx.lineTo(x, yAxis.getPixelForValue(yAxis.min));
        ctx.stroke();
        ctx.restore();
        
        // Add "your percentile" text
        ctx.save();
        ctx.font = '12px Arial';
        ctx.fillStyle = 'rgb(100, 100, 100)';
        ctx.textAlign = 'right';
        ctx.fillText('your percentile', x - 5, yAxis.getPixelForValue(30));
        ctx.restore();
      }
    },
    afterDraw: (chart) => {
      const { ctx, tooltip } = chart;
      
      if (tooltip?.getActiveElements()?.length) {
        const xAxis = chart.scales.x;
        const yAxis = chart.scales.y;
        const activePoint = tooltip.getActiveElements()[0];
        const x = activePoint.element.x;
        
        // Draw vertical line on hover
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(107, 114, 255, 0.5)';
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        ctx.moveTo(x, yAxis.getPixelForValue(yAxis.max));
        ctx.lineTo(x, yAxis.getPixelForValue(yAxis.min));
        ctx.stroke();
        ctx.restore();

        // Enhanced point highlighting
        const meta = chart.getDatasetMeta(0);
        meta.data.forEach((point, index) => {
          const isActive = index === activePoint.dataIndex;
          const baseRadius = 3;
          const hoverRadius = 7;
          const radius = isActive ? hoverRadius : baseRadius;
          
          // Draw point shadow for active point
          if (isActive) {
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
          
          // Draw inner dot for active point
          if (isActive) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
          }
          
          ctx.restore();
        });
      }
    }
  };

  ChartJS.register(verticalLinePlugin);

  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-full max-w-lg h-full">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default DynamicPercentileGraph;