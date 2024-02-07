import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define inline styles
const styles = {
  navbar: {
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '5px',
  },
  logo: {
    height: '150px',
    borderRadius: '50px',
    margin: '5px',
  },
  container: {
    backgroundColor: '#495057',
    padding: '20px',
    borderRadius: '10px',
    color: '#ffffff',
    marginTop: '20px',
  },
  table: {
    backgroundColor: '#6c757d',
    borderRadius: '10px',
    padding: '10px',
  },
  formControl: {
    borderRadius: '20px',
    marginRight: '2px',
  },
  button: {
    borderRadius: '20px',
    marginTop: '3px',
  },
};

// Navbar Component
const Navbar = () => (
  <div style={styles.navbar}>
    {/* Add your logo image path accordingly */}
    <a className="logo">
      <img src="/path/to/logo.png" alt="URL Shrinker Logo" style={styles.logo} />
    </a>
    <h1>Domain Downsize</h1>
    <nav>
      <button className="btn btn-light">Home</button>
      <button className="btn btn-light">Pricing</button>
      <button className="btn btn-light">Contact</button>
    </nav>
  </div>
);

// URLForm Component
const URLForm = ({ onSubmitSuccess }) => {
  const [fullUrl, setFullUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/shortUrls', { fullUrl });
      onSubmitSuccess();
      setFullUrl('');
    } catch (error) {
      console.error('Error submitting URL:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline justify-content-center">
      <input
        required
        type="url"
        value={fullUrl}
        onChange={(e) => setFullUrl(e.target.value)}
        className="form-control"
        placeholder="Enter URL here"
        style={styles.formControl}
      />
      <button type="submit" className="btn btn-warning" style={styles.button}>Shrink</button>
    </form>
  );
};

// URLsTable Component
const URLsTable = ({ shortUrls }) => (
  <div style={styles.table}>
    <table className="table">
      <thead>
        <tr>
          <th>Full URL</th>
          <th>Short URL</th>
          <th>Clicks</th>
        </tr>
      </thead>
      <tbody>
        {shortUrls.map((shortUrl) => (
          <tr key={shortUrl._id}>
            <td><a href={shortUrl.full} target="_blank" rel="noopener noreferrer">{shortUrl.full}</a></td>
            <td><a href={shortUrl.short} target="_blank" rel="noopener noreferrer">{shortUrl.short}</a></td>
            <td>{shortUrl.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// App Component
const App = () => {
  const [shortUrls, setShortUrls] = useState([]);

  const fetchShortUrls = async () => {
    try {
      const response = await axios.get('/api/shortUrls');
      setShortUrls(response.data.shortUrls);
    } catch (error) {
      console.error('Error fetching short URLs:', error);
    }
  };

  useEffect(() => {
    fetchShortUrls();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 className="mb-4 text-center">Make Every Link Shorter and Smarter</h2>
        <URLForm onSubmitSuccess={fetchShortUrls} />
        <URLsTable shortUrls={shortUrls} />
      </div>
    </div>
  );
};

export default App;
