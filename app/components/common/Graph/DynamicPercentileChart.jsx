'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

// Dynamically import Recharts components with no SSR
const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(
  () => import('recharts').then((mod) => mod.Line),
  { ssr: false }
);
const XAxis = dynamic(
  () => import('recharts').then((mod) => mod.XAxis),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('recharts').then((mod) => mod.Tooltip),
  { ssr: false }
);
const ReferenceLine = dynamic(
  () => import('recharts').then((mod) => mod.ReferenceLine),
  { ssr: false }
);

const DynamicPercentileChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activePoint, setActivePoint] = useState(null);
  const [activeLineId, setActiveLineId] = useState(null);
const [chartData, setChartData] = useState({
  beforePercentile: [{ percentile: 0, value: 1 }, { percentile: 100, value: 1 }],
  afterPercentile: [{ percentile: 0, value: 1 }, { percentile: 100, value: 1 }],
});


  const userPercentile = useSelector((state) => state.user.percentile);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Implementation of createSplitData function
  const createSplitData = (percentile) => {
    const generateDataPoints = (start, end, count) => {
      const points = [];
      const step = (end - start) / (count - 1);

      for (let i = 0; i < count; i++) {
        const x = start + step * i;
        const value = 100 * Math.exp(-Math.pow((x - 50) / 30, 2));
        points.push({ percentile: x, value });
      }
      return points;
    };

    const allData = generateDataPoints(0, 100, 100);
    const beforePercentile = allData.filter((point) => point.percentile <= percentile);
    const afterPercentile = allData.filter((point) => point.percentile >= percentile);

    console.log('Before Percentile Data:', beforePercentile);
    console.log('After Percentile Data:', afterPercentile);

    return {
      beforePercentile,
      afterPercentile,
    };
  };

  useEffect(() => {
    console.log('User Percentile:', userPercentile);
    if (userPercentile != null) {
      const data = createSplitData(userPercentile);
      setChartData(data);
    }
  }, [userPercentile]);

  const CustomDot = ({ cx, cy, payload }) => {
    if (payload.percentile === userPercentile) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="#6C63FF"
          stroke="#fff"
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  const CustomActiveDot = ({ cx, cy }) => (
    <circle cx={cx} cy={cy} r={5} fill="#6C63FF" stroke="#fff" strokeWidth={2} />
  );

  const getLabelPosition = () => {
    if (userPercentile < 30) return 'right';
    if (userPercentile > 70) return 'left';
    return 'top';
  };

  // Ensure the component only renders if mounted
  if (!isMounted) {
    return null;
  }

  // Handle loading state
  if (userPercentile === undefined || userPercentile === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          margin={{ top: 30, right: 40, left: 40, bottom: 20 }}
          onMouseMove={(e) => {
            if (e?.activePayload?.[0]) {
              setActivePoint(e.activePayload[0].payload);
              setActiveLineId(e.activePayload[0].dataKey);
            }
          }}
          onMouseLeave={() => {
            setActivePoint(null);
            setActiveLineId(null);
          }}
        >
          <XAxis
            dataKey="percentile"
            type="number"
            domain={[0, 100]}
            tickCount={5}
            stroke="#666"
            padding={{ left: 10, right: 10 }}
            tickSize={8}
            tickMargin={8}
          />

          <ReferenceLine
            x={userPercentile}
            stroke="#D1D5DB"
            strokeWidth={1}
            label={{
              value: "your percentile",
              position: getLabelPosition(),
              fill: "#6B7280",
              fontSize: 12,
              offset: -10,
            }}
            style={{ zIndex: 1 }}
          />

          <Line
            data={chartData.beforePercentile}
            type="monotone"
            dataKey="value"
            stroke="#6C63FF"
            strokeWidth={1.5}
            dot={<CustomDot />}
            activeDot={<CustomActiveDot />}
            connectNulls
            isAnimationActive={false}
          />

          <Line
            data={chartData.afterPercentile}
            type="monotone"
            dataKey="value"
            stroke="#6C63FF"
            strokeWidth={1.5}
            dot={<CustomDot />}
            activeDot={false}
            connectNulls
            isAnimationActive={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-2 rounded shadow border border-gray-100">
                    <p className="text-base font-medium">{Math.round(data.percentile)}</p>
                    <p className="text-sm text-indigo-600">
                      numberOfStudent: {Math.round(data.value)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicPercentileChart;
