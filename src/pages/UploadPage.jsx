import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  const handleUpload = async () => {
    if (!file || !name) {
      alert('Please provide both a name and a .glb file.');
      return;
    }

    const formData = new FormData();
    formData.append('model', file);
    formData.append('name', name);

  //   const apiUrl = process.env.NODE_ENV === 'production'
  // ? 'https://glb-model-viewer-1.onrender.com/models'  // Replace with the actual deployed backend URL
  // : 'http://localhost:5000/models';  // For local development
  const apiUrl = process.env.VITE_API_URL;

    try {
      await axios.post(`${apiUrl}/models`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Check the console for details.');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-2">Upload GLB Model</h2>
      <input
        type="text"
        placeholder="Model Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-2 block"
      />
      <input
        type="file"
        accept=".glb"
        onChange={e => setFile(e.target.files[0])}
        className="mb-2 block"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}