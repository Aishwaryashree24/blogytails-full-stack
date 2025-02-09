const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = 'mongodb+srv://aishwaryah:Aishu24@cluster0.3mmzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define a schema and model for blogs
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    content: String,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: { type: [String], default: [] }, // Add comments field
  });

const Blog = mongoose.model('Blog', blogSchema);

// API Routes

// Create a new blog
app.post('/api/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a specific blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a blog by ID
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ message: 'Blog not found' });
    }
    res.status(200).send({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a comment to a blog
app.post('/api/blogs/:id/comments', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog not found' });
      }
      blog.comments.push(req.body.comment);
      await blog.save();
      res.status(201).send(blog);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  
  // Delete a comment from a blog
  app.delete('/api/blogs/:id/comments/:commentId', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog not found' });
      }
      blog.comments = blog.comments.filter((comment, index) => index !== parseInt(req.params.commentId));
      await blog.save();
      res.status(200).send(blog);
    } catch (err) {
      res.status(400).send(err);
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});