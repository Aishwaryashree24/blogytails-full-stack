import{ useState } from 'react';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState(''); 
  const [author, setAuthor] = useState('');

  const handlePublish = async () => {
    const blog = { title, author, content, description, likes: 0, views: 0 };
    try {
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });
      if (!response.ok) throw new Error('Failed to publish blog');
      alert('Blog Published Successfully!');
      setTitle('');
      setContent('');
      setDescription('');
      setAuthor('');
    } catch (err) {
      console.error(err);
      alert('Failed to publish blog');
    }
  };

  return (
    <div className="max-w-300 mx-10 p-6 space-y-6 bg-white rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold text-center">Create a Brand New Blog</h2>
      <input type="text" placeholder="Add Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-1/6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full h-1/6 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea placeholder="Add a short Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-50 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      <textarea placeholder="Start writing Your Blog here." value={content} onChange={(e) => setContent(e.target.value)} className="w-full h-200 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"  />
      <button onClick={handlePublish} className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Publish Blog</button>
    </div>
  );
};

export default CreateBlog;