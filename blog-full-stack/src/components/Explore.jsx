import{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs');
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        const first5Blogs = data.slice(0, 5);
        setBlogs(first5Blogs);
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
    <div className="py-8 mx-auto max-w-120">
      {blogs.length > 0 ? (
        <ul className="space-y-8">
          {blogs.map((blog, index) => (
            <li key={index} className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-red-600 mb-4">{blog.author}</p>
              <p className="text-gray-600 mb-4">{blog.description}</p>
              <p className="text-sm text-gray-500 mb-4">Likes: {blog.likes} | Views: {blog.views}</p>
              <Link to={`/viewblog/${index}`} onClick={() => handleViewBlog(index)} className="mt-10 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300" >
                View Full Blog
              </Link>
            </li>
          ))}
        </ul>
      ) : ( <p className="text-center text-gray-600">No blogs found.</p> )
      }

      <div className="mt-8 text-center">
        <Link to="/viewallblogs">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">More</button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;