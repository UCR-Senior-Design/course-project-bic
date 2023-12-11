import React, { useEffect, useState } from 'react';

const File_Viewer = () => {
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        // Replace 'your-flask-api-url' with the actual URL of your Flask API
        fetch('your-flask-api-url/get_signed_url?file_name=example.txt')
            .then(response => response.json())
            .then(data => setFileUrl(data.signed_url));
    }, []);

    return (
        <div>
            {fileUrl && <img src={fileUrl} alt="File" />}
        </div>
    );
};

export default File_Viewer;