import React, { useState } from 'react';
import Papa from 'papaparse';
import './Dashboard.css'; // Import your CSS file for styling

export default function Dashboard() {
    const [csvFile, setCsvFile] = useState(null);
    const [campaignName, setCampaignName] = useState('');
    const [recipientList, setRecipientList] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [templateHTML, setTemplateHTML] = useState('');

    const handleCsvChange = (e) => {
        setRecipientList(e.target);
        setCsvFile(e.target.files[0]);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'campaignName') {
            setCampaignName(value);
        }
        if (name === 'recipientList') {
            setRecipientList(value);
        }
        if (name === 'emailSubject') {
            setEmailSubject(value);
        }
        if (name === 'templateHTML') {
            setTemplateHTML(value);
        }
    };


    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Trim the recipient list
        // const trimmedRecipientList = recipientList.trim();


        // Remove empty lines from the recipient list
        // const trimmedRecipientList = recipientList.replace(/^\s*[\r\n]/gm, '');

        // const removeEmptyLines = str => str.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');
        // const trimmedRecipientList = removeEmptyLines(recipientList);

        // console.log('Form Data:', campaignName, trimmedRecipientList, emailSubject, templateHTML);


        // Split the recipient list into an array of emails
        Papa.parse(csvFile, {
            complete: function (results) {
                const [header, ...rows] = results.data;
                const jsonData = rows.map((row) => {
                    return header.reduce((acc, key, index) => {

                        // Convert column name from: first_name,last_name,email; to: firstName, lastName, email

                        if (key === 'first_name') {
                            key = 'firstName';
                        } else if (key === 'last_name') {
                            key = 'lastName';
                        } else if (key === 'email') {
                            key = 'email';
                        }
                        acc[key] = row[index];
                        return acc;
                    }, {});
                });

                // Check if the last row is empty and remove it
                // console.log(jsonData);
                // console.log(jsonData[jsonData.length - 1]);
                // if (jsonData[jsonData.length - 1].email === '') {
                //     jsonData.pop();
                // }
                if (typeof jsonData[jsonData.length - 1].email === 'undefined') {
                    jsonData.pop();
                }

                sendDataToServer(jsonData);
            },
        });
    };

    const sendDataToServer = async (jsonData) => {
        // Perform your API call here
        const response = await fetch(window.globalConfig.apiUrl + '/campaigns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                // Send the token in the Authorization header
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            },
            body: JSON.stringify({
                recipients: jsonData,
                name: campaignName,
                emailSubject: emailSubject,
                emailMessage: templateHTML,
                status: 'pending',
            }),
        });

        if (response.status === 200) {
            alert('Campaign created successfully');

            // Clear the input fields
            setCampaignName('');
            setRecipientList('');
            setEmailSubject('');
            setTemplateHTML('');
            setCsvFile(null);
    
            // Clear the file input field
            document.getElementById('recipientList').value = null;
        } else {
            alert('Failed to create a new campaign');
        }
    };

    return (
        <div>
            <header>
                <nav>
                    {/* <div className="app-name">Your Application Name</div> */}
                    <div className="app-name">{window.globalConfig.appName}</div>
                    <ul>
                        <li><a href="/dashboard">Create Campaign</a></li>
                        <li><a href="/status">Campaign Status</a></li>
                    </ul>
                    {/* <div className="logout"><a href="#">Logout</a></div> */}
                    <div className="logout"><a href="/login">Logout</a></div>
                </nav>
            </header>

            <main>
                <h1>Create a New Campaign</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="campaignName">Campaign Name:</label>
                        <input
                            type="text"
                            id="campaignName"
                            name="campaignName"
                            value={campaignName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipientList">Recipient List (comma-separated emails):</label>
                        <input type="file" accept=".csv"
                            id="recipientList"
                            name="recipientList"
                            // value={recipientList}
                            onChange={handleCsvChange} 
                            required
                            
                            />
                        {/* <input type="file" accept=".csv"
                        id="recipientList"
                        name="recipientList"
                        onChange={this.handleCsvChange} /> */}
                        {/* <textarea
                        id="recipientList"
                        name="recipientList"
                        value={this.state.recipientList}
                        onChange={handleInputChange}
                        rows="4"
                        required
                    ></textarea> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="emailSubject">Email Subject:</label>
                        <input
                            type="text"
                            id="emailSubject"
                            name="emailSubject"
                            value={emailSubject}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="templateHTML">Template HTML:</label>
                        <textarea
                            id="templateHTML"
                            name="templateHTML"
                            value={templateHTML}
                            onChange={handleInputChange}
                            rows="8"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
