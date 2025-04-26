const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Model = require('../src/models/Model.cjs'); // Adjust path if needed
require('dotenv').config();

const app = express();

// MongoDB connection
// mongoose.connect("mongodb://localhost:27017/glb_model_viewer", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files


// Multer configuration
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (_req, _file, cb) {
    cb(null, Date.now() + path.extname(_file.originalname));
  }
});
const upload = multer({ storage });

// Routes

// GET all models
app.get('/models', (_req, res) => {
  Model.find()
    .then(models => res.json(models))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST a new model
app.post('/models', upload.single('model'), (req, res) => {
  console.log('BODY:', req.body);
  console.log('FILE:', req.file);

  const { name } = req.body;
  const file = req.file;

  if (!name || !file) {
    return res.status(400).json({ error: 'Name and file are required' });
  }

  const newModel = new Model({
    name,
    filename: file.filename,
  });

  newModel.save()
    .then(savedModel => res.status(201).json(savedModel))
    .catch(err => {
      console.error('Error saving model:', err);
      res.status(500).json({ error: err.message });
    });
});
const PORT = process.env.PORT || 5000;

// Start server
// const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
