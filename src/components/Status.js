import React, { Component } from 'react';
import './Status.css'; // Import your CSS file for styling

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaigns: [],
        };

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
                this.setState({ campaigns: data });
            })
            .catch((error) => {
                console.error('Error:', error);
            });







        // Sample data for the table (you can replace this with your data)
        // this.state = {
        //     campaigns: [
        //         {
        //             campaignName: 'Campaign 1',
        //             date: '2023-08-01',
        //             status: 'Active',
        //             totalEmail: 1000,
        //             delivered: 750,
        //             opened: 600,
        //         },
        //         {
        //             campaignName: 'Campaign 2',
        //             date: '2023-08-05',
        //             status: 'Inactive',
        //             totalEmail: 800,
        //             delivered: 720,
        //             opened: 500,
        //         },
        //         // Add more campaign data as needed
        //     ],
        // };
    }

    render() {
        const { campaigns } = this.state;

        return (
            <div>
                <header>
                    <nav>
                        <div className="app-name">{window.globalConfig.appName}</div>
                        <ul>
                            <li><a href="/dashboard">Create Campaign</a></li>
                            <li><a href="/status">Campaign Status</a></li>
                        </ul>
                        <div className="logout"><a href="/login">Logout</a></div>
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
                    </div>
                </main>
            </div>
        );
    }
}

export default Status;
