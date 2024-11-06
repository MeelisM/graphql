// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import ApiService from '../../services/api';
import AuditPieChart from '../AuditPieChart';
import ProjectsPieChart from '../ProjectsPieChart';
import XPProgressionChart from '../XPProgressionChart';
import './Dashboard.css';

function Dashboard() {
    const [userData, setUserData] = useState(null);
    const [auditData, setAuditData] = useState(null);
    const [projectData, setProjectData] = useState(null);
    const [xpData, setXPData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
          setLoading(true);
          
          const userId = parseInt(localStorage.getItem('userId'), 10);
          if (!userId) throw new Error("User ID not found in token.");
      
          const [userResponse, auditResponse, projectResponse, xpResponse] = await Promise.all([
            ApiService.getUserProfile(userId),
            ApiService.getAuditRatio(),
            ApiService.getProjectStats(),
            ApiService.getXPProgression()
          ]);
      
          if (userResponse?.user && Array.isArray(userResponse.user) && userResponse.user.length > 0) {
            setUserData(userResponse.user[0]);
          }
          if (auditResponse?.transaction) {
            setAuditData(auditResponse.transaction);
          }
          if (projectResponse?.progress) {
            setProjectData(projectResponse.progress);
          }
          if (xpResponse?.transaction) {
            setXPData(xpResponse.transaction);
          }
        } catch (err) {
          setError('Failed to load data');
          console.error('Error fetching data:', err);
        } finally {
          setLoading(false);
        }
      };
      

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userData) return <div>No data available</div>;

    let userAttrs = {};
    try {
        userAttrs = typeof userData.attrs === 'string' 
            ? JSON.parse(userData.attrs)
            : userData.attrs || {};
    } catch (e) {
        console.error('Error parsing attrs:', e);
    }

    return (
        <div className="dashboard">
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h2>User Profile</h2>
                    <div className="user-info">
                        <p><strong>Username:</strong> {userData.login}</p>
                        <p><strong>Email:</strong> {userAttrs.email || 'N/A'}</p>
                        <p><strong>Full Name:</strong> {`${userAttrs.firstName || ''} ${userAttrs.lastName || ''}`}</p>
                        <p><strong>Country:</strong> {userAttrs.country || 'N/A'}</p>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h2>Audit Statistics</h2>
                    {auditData ? (
                        <AuditPieChart data={auditData} />
                    ) : (
                        <p>No audit data available</p>
                    )}
                </div>

                <div className="dashboard-card">
                    <h2>Project Statistics</h2>
                    {projectData ? (
                        <ProjectsPieChart data={projectData} />
                    ) : (
                        <p>No project data available</p>
                    )}
                </div>

                <div className="dashboard-card">
                    <h2>Total XP Progression</h2>
                    {xpData ? (
                        <XPProgressionChart data={xpData} module="div-01" />
                    ) : (
                        <p>No XP data available</p>
                    )}
                </div>

                <div className="dashboard-card">
                    <h2>Piscine-JS XP Progression</h2>
                    {xpData ? (
                        <XPProgressionChart data={xpData} module="Piscine-JS" />
                    ) : (
                        <p>No XP data available</p>
                    )}
                </div>

                <div className="dashboard-card">
                    <h2>Piscine-Go XP Progression</h2>
                    {xpData ? (
                        <XPProgressionChart data={xpData} module="Piscine-Go" />
                    ) : (
                        <p>No XP data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;