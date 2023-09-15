import React, { Component, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css'; // Import your CSS file for styling

export default function Status() {
    const history = useNavigate();
    const [campaigns, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
        // window.location.href = '/login';
        // history('/login');
    }

    useEffect(() => {
        // Load campaign statistics from the API
        fetch(window.globalConfig.apiUrl + '/campaigns', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // this.setState({ campaigns: data });
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <header>
                <nav>
                    <div className="app-name">{window.globalConfig.appName}</div>
                    <ul>
                        {/* <li><a href="/dashboard">Create Campaign</a></li>
                            <li><a href="/reports">View Reports</a></li> */}
                        <li><a href="javascript:void(0)" onClick={() => { history('/dashboard') }}>Create Campaign</a></li>
                        <li><a href="javascript:void(0)" onClick={() => { history('/reports') }}>View Reports</a></li>
                    </ul>
                    <div className="logout">
                        {/* <a href="/login">Logout</a> */}
                        <a href="javascript:void(0)" onClick={() => { history('/login'); localStorage.removeItem('token') }}>Logout</a>
                    </div>
                </nav>
            </header>

            <main>
                <div>
                    <h2>Campaign Statistics</h2>

                    {/* Check if it's loading */}
                    {loading && <div>Loading...</div>}
                    {/* Check if there are no campaigns */}
                    {!loading && campaigns.length === 0 && <div>No campaigns found</div>}

                    {/* If not loading then display the table */}
                    {!loading && campaigns.length > 0 && (
                        <table className="campaign-table">
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total Email</th>
                                    <th>Sent</th>
                                    <th>Opened</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign, index) => (
                                    <tr key={index}>
                                        <td>{campaign.name}</td>
                                        {/* <td>{campaign.createdDate}</td> */}
                                        {/* Convert to this date format: 14 Sep 2023 */}
                                        <td>{new Date(campaign.createdDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>


                                        {/* <td>{campaign.status}</td> */}
                                        {/* Convert status to first letter uppercase */}
                                        <td>{campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}</td>

                                        <td>{campaign.totalEmails}</td>
                                        <td>{campaign.emailsSent}</td>
                                        <td>{campaign.emailsOpened}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );

}
