// src/components/Viewer.jsx
import React from 'react';
import '@google/model-viewer';

export default function Viewer({ url }) {
  return (
    <div style={{ width: '50vh', maxWidth: '900px', height: '600px', margin: '0 auto' }}>
      <model-viewer
        src={url}
        alt="A 3D model"
        auto-rotate
        camera-controls
        style={{ width: '100%', height: '100%'}}
      ></model-viewer>
    </div>
  );
}
