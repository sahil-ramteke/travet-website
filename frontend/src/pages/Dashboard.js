import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/bookings/mybookings')
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!user) return <div className="container">Please login</div>;
  if (loading) return <div className="container">Loading bookings...</div>;

  return (
    <div className="container">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>Destination</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Booking Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b._id}>
                  <td>{b.package?.title}</td>
                  <td>{b.package?.destination}</td>
                  <td>{b.guests}</td>
                  <td>${b.totalPrice}</td>
                  <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;