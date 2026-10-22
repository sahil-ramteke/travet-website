import { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/packages')
      .then(res => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container">Loading packages...</div>;

  return (
    <div className="container">
      <h1>All Vacation Packages</h1>
      <div className="card-grid">
        {packages.map(pkg => (
          <div key={pkg._id} className="card">
            <img src={pkg.imageUrl} alt={pkg.title} />
            <div className="card-content">
              <h3>{pkg.title}</h3>
              <p>{pkg.destination}</p>
              <p className="price">${pkg.price}</p>
              <p>{pkg.duration}</p>
              <Link to={`/packages/${pkg._id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;