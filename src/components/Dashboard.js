import React, { Component } from 'react';
import './Dashboard.css'; // Import your CSS file for styling

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaignName: '',
            recipientList: '',
            emailSubject: '',
            templateHTML: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here (e.g., send data to server)
        console.log('Form Data:', this.state);
    };

    render() {
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
                    <h1>Create a New Campaign</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="campaignName">Campaign Name:</label>
                            <input
                                type="text"
                                id="campaignName"
                                name="campaignName"
                                value={this.state.campaignName}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipientList">Recipient List (comma-separated emails):</label>
                            <textarea
                                id="recipientList"
                                name="recipientList"
                                value={this.state.recipientList}
                                onChange={this.handleInputChange}
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="emailSubject">Email Subject:</label>
                            <input
                                type="text"
                                id="emailSubject"
                                name="emailSubject"
                                value={this.state.emailSubject}
                                onChange={this.handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="templateHTML">Template HTML:</label>
                            <textarea
                                id="templateHTML"
                                name="templateHTML"
                                value={this.state.templateHTML}
                                onChange={this.handleInputChange}
                                rows="8"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </main>
            </div>
        );
    }
}

export default Dashboard;
