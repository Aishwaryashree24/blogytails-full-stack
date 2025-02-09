import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CreateBlog from './components/CreateBlog';
import Explore from './components/Explore';
import ViewAllBlogs from './components/ViewAllBlogs';
import FullBlogView from './components/FullBlogView';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 py-4">
        <nav className="bg-green-800 text-white p-4 mb-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-white hover:text-gray-200">
              <h1 className="text-4xl font-extrabold text-white text-center">
                BlogyTails
              </h1>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/viewallblogs" element={<ViewAllBlogs />} />
          <Route path="/viewblog/:index" element={<FullBlogView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div className="text-center py-16">
      <h2 className="text-3xl font-semibold mb-4">Welcome to BlogyTails!</h2>
      <p className="text-lg text-gray-700 mb-8">Start your blogging journey!</p>

      <div className="mb-8">
        <Link to="/createblog">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
            Create Blog
          </button>
        </Link>
      </div>

      <div>
        <h3 className="text-3xl font-semibold text-gray-700 mb-4">Explore Blogs</h3>
        <div className="rounded-lg p-4">
          <Explore />
        </div>
      </div>
    </div>
  );
}

export default App;