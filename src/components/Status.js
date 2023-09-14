import React, { Component } from 'react';
import './Status.css'; // Import your CSS file for styling

class Status extends Component {
    constructor(props) {
        super(props);
        // Sample data for the table (you can replace this with your data)
        this.state = {
            campaigns: [
                {
                    campaignName: 'Campaign 1',
                    date: '2023-08-01',
                    status: 'Active',
                    totalEmail: 1000,
                    delivered: 750,
                    opened: 600,
                },
                {
                    campaignName: 'Campaign 2',
                    date: '2023-08-05',
                    status: 'Inactive',
                    totalEmail: 800,
                    delivered: 720,
                    opened: 500,
                },
                // Add more campaign data as needed
            ],
        };
    }

    render() {
        const { campaigns } = this.state;

        return (
            <div>
                <header>
                    <nav>
                        <div className="app-name">Your Application Name</div>
                        <ul>
                            <li><a href="#">Menu Item 1</a></li>
                            <li><a href="#">Menu Item 2</a></li>
                        </ul>
                        <div className="logout"><a href="#">Logout</a></div>
                    </nav>
                </header>

                <main>
                    <div>
                        <h2>Campaign Statistics</h2>
                        <table className="campaign-table">
                            <thead>
                                <tr>
                                    <th>Campaign Name</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total Email</th>
                                    <th>Delivered</th>
                                    <th>Opened</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map((campaign, index) => (
                                    <tr key={index}>
                                        <td>{campaign.campaignName}</td>
                                        <td>{campaign.date}</td>
                                        <td>{campaign.status}</td>
                                        <td>{campaign.totalEmail}</td>
                                        <td>{campaign.delivered}</td>
                                        <td>{campaign.opened}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        );
    }
}

export default Status;
