import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [guests, setGuests] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/packages/${id}`)
      .then(res => setPkg(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await API.post('/bookings', { packageId: id, guests });
      alert('Booking confirmed!');
      navigate('/dashboard');
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.message || err.message));
    }
  };

  if (!pkg) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <img src={pkg.imageUrl} alt={pkg.title} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }} />
      <h1>{pkg.title}</h1>
      <p><strong>Destination:</strong> {pkg.destination}</p>
      <p><strong>Duration:</strong> {pkg.duration}</p>
      <p><strong>Max Guests:</strong> {pkg.maxGuests}</p>
      <p><strong>Price per person:</strong> ${pkg.price}</p>
      <p>{pkg.description}</p>
      <div className="form-group" style={{ maxWidth: '200px' }}>
        <label>Number of Guests:</label>
        <input type="number" min="1" max={pkg.maxGuests} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
      </div>
      <p><strong>Total: ${pkg.price * guests}</strong></p>
      <button onClick={handleBooking} className="btn btn-success">Book Now</button>
    </div>
  );
};

export default PackageDetails;