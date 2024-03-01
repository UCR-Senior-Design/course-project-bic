import React, { useState } from 'react';
import axios from 'axios';
import './InputData.css'

const DataPathForm = () => {
    const [dataPath, setDataPath] = useState(''); // State variable to store the data path entered by the user
    const [message, setMessage] = useState(''); // State variable to store success message from the server
    const [error, setError] = useState(''); // State variable to store error message from the server

    // Function to update the dataPath state variable as the user types in the input field
    const handleInputChange = (event) => {
        setDataPath(event.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to the /set_data_path endpoint with the data path
            const response = await axios.post('http://127.0.0.1:5000/set_data_path', { data_path: dataPath });
            setMessage(response.data.message); // Set the success message from the server
            setError(''); // Clear any previous error message
        } catch (error) {
            setMessage(''); // Clear any previous success message
            setError('Error setting data path. Please try again.'); // Set the error message
        }
    };

    return (
        <div className="inputdata">
            <h1>Data Path Configuration</h1>
            <p>Please enter the path to your data:</p>
            {/* Form for entering the data path */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={dataPath}
                    onChange={handleInputChange}
                    placeholder="Enter data path"
                />
                <button type="submit">Set Data Path</button>
            </form>
            {/* Display success message if available */}
            {message && <p>{message}</p>}
            {/* Display error message if available */}
            {error && <p>{error}</p>}
        </div>
    );
};

export default DataPathForm;
