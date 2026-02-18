import React, { useState, useMemo } from 'react';

// Types for type safety
interface DataPoint {
  month: string;
  members: number;
  events: number;
  registrations: number;
  teamProjects: number;
}

interface LineConfig {
  key: keyof Omit<DataPoint, 'month'>;
  label: string;
  color: string;
  strokeColor: string;
}

// Sample data - replace with your actual data
const chartData: DataPoint[] = [
  { month: 'Jan', members: 45, events: 12, registrations: 78, teamProjects: 8 },
  { month: 'Feb', members: 52, events: 15, registrations: 85, teamProjects: 10 },
  { month: 'Mar', members: 68, events: 18, registrations: 92, teamProjects: 12 },
  { month: 'Apr', members: 73, events: 22, registrations: 105, teamProjects: 15 },
  { month: 'May', members: 85, events: 25, registrations: 118, teamProjects: 18 },
  { month: 'Jun', members: 92, events: 28, registrations: 125, teamProjects: 20 },
  { month: 'Jul', members: 98, events: 30, registrations: 135, teamProjects: 22 },
  { month: 'Aug', members: 105, events: 32, registrations: 142, teamProjects: 24 },
];

// Line configurations
const lineConfigs: LineConfig[] = [
  { key: 'members', label: 'Members', color: 'bg-blue-500', strokeColor: '#3b82f6' },
  { key: 'events', label: 'Events', color: 'bg-green-500', strokeColor: '#22c55e' },
  { key: 'registrations', label: 'Registrations', color: 'bg-purple-500', strokeColor: '#a855f7' },
  { key: 'teamProjects', label: 'Team Projects', color: 'bg-orange-500', strokeColor: '#f97316' },
];

const InteractiveChart: React.FC = () => {
  // State to track which lines are visible
  const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
    members: true,
    events: true,
    registrations: true,
    teamProjects: true,
  });

  // Toggle line visibility
  const toggleLine = (key: string) => {
    setVisibleLines(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate chart dimensions and scaling
  const chartDimensions = useMemo(() => {
    const visibleData = lineConfigs
      .filter(config => visibleLines[config.key])
      .flatMap(config => chartData.map(d => d[config.key]));

    const maxValue = visibleData.length > 0 ? Math.max(...visibleData) : 150;
    const minValue = visibleData.length > 0 ? Math.min(...visibleData) : 0;
    const range = maxValue - minValue;
    const padding = range * 0.1;

    return {
      maxValue: maxValue + padding,
      minValue: Math.max(0, minValue - padding),
    };
  }, [visibleLines]);

  // Calculate Y position for a value
  const getYPosition = (value: number, height: number): number => {
    const { maxValue, minValue } = chartDimensions;
    const range = maxValue - minValue;
    return height - ((value - minValue) / range) * height;
  };

  // Generate SVG path for a line
  const generatePath = (dataKey: keyof Omit<DataPoint, 'month'>, width: number, height: number): string => {
    const points = chartData.map((point, index) => {
      const x = (index / (chartData.length - 1)) * width;
      const y = getYPosition(point[dataKey], height);
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6  rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Performance Metrics</h2>
        <p className="text-gray-400">Track key metrics over time</p>
      </div>

      {/* Legend with toggles */}
      <div className="flex flex-wrap gap-4 mb-6">
        {lineConfigs.map(config => (
          <button
            key={config.key}
            onClick={() => toggleLine(config.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
              !visibleLines[config.key]
                ? 'group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10'
                : 'border-gray-200 bg-gray-50 opacity-50 hover:opacity-75'
            }`}
            aria-pressed={visibleLines[config.key]}
            aria-label={`Toggle ${config.label} visibility`}
          >
            <span
              className={`w-3 h-3 rounded-full ${config.color} transition-opacity ${
                visibleLines[config.key] ? 'opacity-100' : 'opacity-30'
              }`}
            />
            <span className={`font-medium text-sm ${
              visibleLines[config.key] ? 'text-gray-700' : 'text-gray-400'
            }`}>
              {config.label}
            </span>
            <span className={`ml-1 text-xs ${
              visibleLines[config.key] ? 'text-gray-500' : 'text-gray-300'
            }`}>
              {visibleLines[config.key] ? '✓' : '○'}
            </span>
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative w-full  rounded-lg p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* SVG Chart */}
          <svg
            viewBox="0 0 800 400"
            className="w-full h-auto"
            role="img"
            aria-label="Line chart showing performance metrics"
          >
            {/* Grid lines */}
            <g className="grid-lines" opacity="0.2">
              {[0, 1, 2, 3, 4].map(i => {
                const y = (i / 4) * 360 + 20;
                return (
                  <line
                    key={`grid-${i}`}
                    x1="40"
                    y1={y}
                    x2="780"
                    y2={y}
                    stroke="#9ca3af"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                );
              })}
            </g>

            {/* Y-axis labels */}
            <g className="y-axis-labels">
              {[0, 1, 2, 3, 4].map(i => {
                const y = (i / 4) * 360 + 20;
                const value = Math.round(
                  chartDimensions.maxValue - (i / 4) * (chartDimensions.maxValue - chartDimensions.minValue)
                );
                return (
                  <text
                    key={`y-label-${i}`}
                    x="30"
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-600"
                  >
                    {value}
                  </text>
                );
              })}
            </g>

            {/* X-axis labels */}
            <g className="x-axis-labels">
              {chartData.map((point, index) => {
                const x = 40 + (index / (chartData.length - 1)) * 740;
                return (
                  <text
                    key={`x-label-${index}`}
                    x={x}
                    y="395"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {point.month}
                  </text>
                );
              })}
            </g>

            {/* Data lines */}
            <g className="data-lines">
              {lineConfigs.map(config => (
                visibleLines[config.key] && (
                  <g key={config.key}>
                    <path
                      d={generatePath(config.key, 740, 360)}
                      fill="none"
                      stroke={config.strokeColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="translate(40, 20)"
                      className="transition-all duration-300"
                    />
                    {/* Data points */}
                    {chartData.map((point, index) => {
                      const x = 40 + (index / (chartData.length - 1)) * 740;
                      const y = 20 + getYPosition(point[config.key], 360);
                      return (
                        <g key={`point-${config.key}-${index}`}>
                          <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill="white"
                            stroke={config.strokeColor}
                            strokeWidth="2"
                            className="transition-all duration-300 hover:r-7"
                          />
                          {/* Tooltip on hover */}
                          <title>{`${config.label}: ${point[config.key]}`}</title>
                        </g>
                      );
                    })}
                  </g>
                )
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {lineConfigs.map(config => {
          const latestValue = chartData[chartData.length - 1][config.key];
          const previousValue = chartData[chartData.length - 2][config.key];
          const change = latestValue - previousValue;
          const percentChange = ((change / previousValue) * 100).toFixed(1);
          
          return (
            <div
              key={`stat-${config.key}`}
              className={`p-4 rounded-lg border-2 transition-all ${
                !visibleLines[config.key]
                  ? 'border-gray-200 '
                  : 'border-gray-100 bg-gray-50 opacity-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${config.color}`} />
                <span className="text-xs font-medium text-gray-600">{config.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{latestValue}</div>
              <div className={`text-xs ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)} ({percentChange}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveChart;