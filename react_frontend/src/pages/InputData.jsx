// import React, { useState } from 'react';
// import axios from 'axios';
// import './InputData.css'

// const DataPathForm = () => {
//     const [dataPath, setDataPath] = useState(''); // State variable to store the data path entered by the user
//     const [message, setMessage] = useState(''); // State variable to store success message from the server
//     const [error, setError] = useState(''); // State variable to store error message from the server

//     // Function to update the dataPath state variable as the user types in the input field
//     const handleInputChange = (event) => {
//         setDataPath(event.target.value);
//     };

//     // Function to handle form submission
//     const handleSubmit = async (event) => {
//         event.preventDefault(); // Prevent the default form submission behavior
//         try {
//             // Send a POST request to the /set_data_path endpoint with the data path
//             const response = await axios.post('http://127.0.0.1:5000/set_data_path', { data_path: dataPath });
//             setMessage(response.data.message); // Set the success message from the server
//             setError(''); // Clear any previous error message
//         } catch (error) {
//             setMessage(''); // Clear any previous success message
//             // Check if the error message from the server matches the specific error message indicating no subject folders
//             if (error.response && error.response.data && error.response.data.error === 'No subjects') {
//                 setError('Specified directory does not contain any subject folders.'); // Set the specific error message
//             } else {
//                 setError('Specified directory does not exist.'); // Set the generic error message
//             }
//         }
//     };
//     return (
//         <div className="inputdata">
//             <h1>Data Path Configuration</h1>
//             <p>Please enter the path to your data:</p>
//             {/* Form for entering the data path */}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={dataPath}
//                     onChange={handleInputChange}
//                     placeholder="Enter data path"
//                 />
//                 <button type="submit">Set Data Path</button>
//             </form>
//             {/* Display success message if available */}
//             {message && <p>{message}</p>}
//             {/* Display error message if available */}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default DataPathForm;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './InputData.css';
// import { useNavigate } from 'react-router-dom';

// const DataPathForm = () => {
//     const [dataPath, setDataPath] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate hook

//     const handleInputChange = (event) => {
//         setDataPath(event.target.value);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://127.0.0.1:5000/set_data_path', { data_path: dataPath });
//             setMessage(response.data.message);
//             setError('');
//             navigate('/home'); // Use navigate to go to the /home route
//         } catch (error) {
//             setMessage('');
//             if (error.response && error.response.data && error.response.data.error === 'No subjects') {
//                 setError('Specified directory does not contain any subject folders.'); // Set the specific error message
//             } else {
//                 setError('Specified directory does not exist.'); // Set the generic error message
//             }
//         }
//     };

//     return (
//         <div className="inputdata">
//             <h1>Data Path Configuration</h1>
//             <p>Please enter the path to your data:</p>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={dataPath}
//                     onChange={handleInputChange}
//                     placeholder="Enter data path"
//                 />
//                 <button type="submit">Set Data Path</button>
//             </form>
//             {message && <p>{message}</p>}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default DataPathForm;

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
    );
};

export default DataPathForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './InputData.css';
// import { useNavigate } from 'react-router-dom';

// const DataPathForm = () => {
//     const [dataPath, setDataPath] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Initialize useNavigate hook
//     const [loading, setLoading] = useState(false);

//     const handleInputChange = (event) => {
//         setDataPath(event.target.value);
//     };

//     useEffect(() => {
//         if (loading) {
//             const timer = setInterval(() => {
//                 setMessage((prevMessage) => {
//                     const dots = prevMessage.endsWith('...') ? '' : '...';
//                     return 'Creating Plots' + dots;
//                 });
//             }, 500);

//             return () => clearInterval(timer);
//         }
//     }, [loading]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             setLoading(true); // Set loading state to true
//             const response = await axios.post('http://127.0.0.1:5000/set_data_path', { data_path: dataPath });
//             setMessage(response.data.message);
//             setError('');
            
//             // Call generate_plots endpoint after setting the data path
//             await axios.get('http://127.0.0.1:5000/api/generate_plots');
            
//             setLoading(false); // Set loading state to false
//             navigate('/home'); // Use navigate to go to the /home route
//         } catch (error) {
//             setLoading(''); // Set loading state to false
//             setMessage('');
//             if (error.response && error.response.data && error.response.data.error === 'No subjects') {
//                 setError('Specified directory does not contain any subject folders.'); // Set the specific error message
//             } else {
//                 setError('Specified directory does not exist.'); // Set the generic error message
//             }
//         }
//     };

//     return (
//         <div className="inputdata">
//             <h1>Data Path Configuration</h1>
//             <p>Please enter the path to your data:</p>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     value={dataPath}
//                     onChange={handleInputChange}
//                     placeholder="Enter data path"
//                 />
//                 <button type="submit" disabled={loading}>Set Data Path</button>
//             </form>
//             {loading ? <p>{message}</p> : null}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default DataPathForm;
