import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    API.get('/packages').then(res => {
      const featuredPkgs = res.data.filter(pkg => pkg.featured);
      setFeatured(featuredPkgs);
    });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Welcome to Travel Booking</h1>
      <h2>Featured Packages</h2>
      <div className="card-grid">
        {featured.map(pkg => (
          <div key={pkg._id} className="card">
            <img src={pkg.imageUrl} alt={pkg.title} />
            <div className="card-content">
              <h3>{pkg.title}</h3>
              <p>{pkg.destination}</p>
              <p className="price">${pkg.price}</p>
              <Link to={`/packages/${pkg._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;