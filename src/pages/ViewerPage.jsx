import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Viewer from './components/Viewer';

export default function ViewerPage() {
  const [models, setModels] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.VITE_API_URL || 'http://localhost:5000';  // Default to localhost for local dev

    axios.get(`${apiUrl}/models`)
      .then(res => {
        console.log('Models data:', res.data);
        const updatedModels = res.data.map(model => ({
          ...model,
          url: `${apiUrl}/uploads/${model.filename}`,
        }));
        setModels(updatedModels);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='model_viewer'>
      <h2>Model Viewer</h2>
      <div>
        {models.map(model => (
          <button
            key={model._id}
            onClick={() => setSelectedUrl(model.url)}
            className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded"
          >
            {model.name || 'Unnamed Model'}
          </button>
        ))}
      </div>
      {selectedUrl && (
        <Viewer url={selectedUrl} />
      )}
    </div>
  );
}