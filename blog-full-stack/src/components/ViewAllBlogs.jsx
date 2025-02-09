import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ViewAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);
  
  const handleViewBlog = async (index) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[index].views += 1;
    try {
      await fetch(`http://localhost:5000/api/blogs/${updatedBlogs[index]._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlogs[index]),
      });
      setBlogs(updatedBlogs);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">All Blogs</h2>

      {blogs.length > 0 ? (
        <ul className="space-y-8">

          {blogs.map((blog, index) => (
            <li key={index} className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">{blog.title} | {blog.author}</h3>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <p className="text-sm text-gray-500">Likes: {blog.likes} | Views: {blog.views}</p>
              <Link to={`/viewblog/${index}`} onClick={() => handleViewBlog(index)} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300" >
                View Full Blog
              </Link>
            </li>
          ))}
        </ul>
      ) : ( <p className="text-center text-gray-600">No blogs found.</p>)
      }
    </div>
  );
};

export default ViewAllBlogs;