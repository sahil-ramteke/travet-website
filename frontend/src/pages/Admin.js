import { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    destination: '',
    price: '',
    duration: '',
    maxGuests: '',
    imageUrl: '',
    featured: false
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const res = await API.get('/packages');
    setPackages(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEdit = (pkg) => {
    setEditingPackage(pkg);
    setForm({
      title: pkg.title,
      description: pkg.description,
      destination: pkg.destination,
      price: pkg.price,
      duration: pkg.duration,
      maxGuests: pkg.maxGuests,
      imageUrl: pkg.imageUrl || '',
      featured: pkg.featured
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await API.put(`/admin/packages/${editingPackage._id}`, form);
        alert('Package updated!');
      } else {
        await API.post('/admin/packages', form);
        alert('Package added!');
      }
      fetchPackages();
      setForm({ title: '', description: '', destination: '', price: '', duration: '', maxGuests: '', imageUrl: '', featured: false });
      setEditingPackage(null);
    } catch (err) {
      alert('Operation failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await API.delete(`/admin/packages/${id}`);
        fetchPackages();
      } catch (err) {
        alert('Delete failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return <div className="container">Access denied</div>;
  }

  return (
    <div className="container">
      <h1>Admin Panel</h1>

      <h2>{editingPackage ? 'Edit Package' : 'Add New Package'}</h2>
      <form onSubmit={handleSubmit} className="form-container" style={{ maxWidth: '600px', marginLeft: 0 }}>
        <div className="form-group">
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Destination</label>
          <input name="destination" value={form.destination} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Duration</label>
          <input name="duration" value={form.duration} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Max Guests</label>
          <input type="number" name="maxGuests" value={form.maxGuests} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Featured
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-success">{editingPackage ? 'Update Package' : 'Add Package'}</button>
          {editingPackage && (
            <button type="button" className="btn" onClick={() => {
              setForm({ title: '', description: '', destination: '', price: '', duration: '', maxGuests: '', imageUrl: '', featured: false });
              setEditingPackage(null);
            }} style={{ marginLeft: '10px' }}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h2>Existing Packages</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map(pkg => (
              <tr key={pkg._id}>
                <td>{pkg.title}</td>
                <td>{pkg.destination}</td>
                <td>${pkg.price}</td>
                <td>
                  <button onClick={() => handleEdit(pkg)} className="btn btn-primary" style={{ marginRight: '5px' }}>Edit</button>
                  <button onClick={() => handleDelete(pkg._id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;