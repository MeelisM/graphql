import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#32cddc', '#dc3545']; 

function ProjectsPieChart({ data }) {
    const transformData = (rawData) => {
        const validProjects = rawData.filter(project => project.grade !== null);
        
        const passThreshold = 1; 
        const counts = validProjects.reduce((acc, item) => {
            if (item.grade >= passThreshold) {
                acc.passed++;
            } else {
                acc.failed++;
            }
            return acc;
        }, { passed: 0, failed: 0 });

        return [
            { name: 'Passed Projects', value: counts.passed },
            { name: 'Failed Projects', value: counts.failed }
        ];
    };

    const chartData = transformData(data);
    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                            const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill="white"
                                    textAnchor={x > cx ? 'start' : 'end'}
                                    dominantBaseline="central"
                                >
                                    {`${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProjectsPieChart;