import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function XPProgressionChart({ data, module }) {
    const processData = (rawData) => {
        const moduleData = rawData
            .filter(item => {
                return item.path.toLowerCase().includes(module.toLowerCase());
            })
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        let cumulativeXP = 0;
        return moduleData.map(item => {
            cumulativeXP += item.amount;
            return {
                date: new Date(item.createdAt).toLocaleDateString('et-EE'),
                xp: cumulativeXP,
                project: item.path.split('/').pop(),
                amount: item.amount,
            };
        });
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: '#2b2f3a',
                    padding: '10px',
                    border: '1px solid #666',
                    color: '#e0e0e0'
                }}>
                    <p><strong>Date:</strong> {label}</p>
                    <p><strong>Project:</strong> {payload[0].payload.project}</p>
                    <p><strong>XP Earned:</strong> {payload[0].payload.amount}</p>
                    <p><strong>Total XP:</strong> {payload[0].payload.xp}</p>
                </div>
            );
        }
        return null;
    };

    const formatYAxis = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        }
        return value;
    };

    const chartData = processData(data);

    return (
        <div style={{ width: '100%', height: '200px' }}>
            <ResponsiveContainer>
                <BarChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 40, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fill: '#e0e0e0' }}
                        stroke="#e0e0e0"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                    />
                    <YAxis 
                        tickFormatter={formatYAxis}
                        tick={{ fill: '#e0e0e0' }}
                        stroke="#e0e0e0"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                        dataKey="xp" 
                        fill="#32cddc"
                        radius={[2, 2, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default XPProgressionChart;