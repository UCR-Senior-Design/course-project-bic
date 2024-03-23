import React, { useState } from 'react';
import axios from 'axios';
import './InputData.css';
import { useNavigate } from 'react-router-dom';

const DataPathForm = () => {
    const [dataPath, setDataPath] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleInputChange = (event) => {
        setDataPath(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/set_data_path', { data_path: dataPath });
            setMessage(response.data.message);
            setError('');

            // Call generate_plots endpoint after setting the data path
            await axios.get('http://127.0.0.1:5000/api/generate_plots');

            navigate('/home'); // Use navigate to go to the /home route
        } catch (error) {
            setMessage('');
            if (error.response && error.response.data && error.response.data.error === 'No subjects') {
                setError('Specified directory does not contain any subject folders.'); // Set the specific error message
            } else {
                setError('Specified directory does not exist.'); // Set the generic error message
            }
        }
    };

    return (
        <div class="box">
            <div className="inputdata">
                <h1>Data Path Configuration</h1>
                <p>Please enter the path to your data:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={dataPath}
                        onChange={handleInputChange}
                        placeholder="Enter data path"
                    />
                    <button type="submit">Set Data Path</button>
                </form>
                {message && <p>{message}</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
};

export default DataPathForm;