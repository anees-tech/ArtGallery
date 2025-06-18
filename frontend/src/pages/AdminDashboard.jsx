"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom"
import "./AdminDashboard.css"

// Admin Dashboard Components
const Dashboard = () => {
  const [stats, setStats] = useState({
    paintings: 0,
    artists: 0,
    exhibitions: 0,
    orders: 0,
    users: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch these stats from your API
    // For now, we'll simulate it with setTimeout
    const timer = setTimeout(() => {
      setStats({
        paintings: 24,
        artists: 12,
        exhibitions: 5,
        orders: 18,
        users: 45,
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className="loading">Loading dashboard stats...</div>
  }

  return (
    <div className="admin-dashboard-home">
      <h2>Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Paintings</h3>
          <p className="stat-value">{stats.paintings}</p>
        </div>
        <div className="stat-card">
          <h3>Artists</h3>
          <p className="stat-value">{stats.artists}</p>
        </div>
        <div className="stat-card">
          <h3>Exhibitions</h3>
          <p className="stat-value">{stats.exhibitions}</p>
        </div>
        <div className="stat-card">
          <h3>Orders</h3>
          <p className="stat-value">{stats.orders}</p>
        </div>
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-value">{stats.users}</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li className="activity-item">
            <span className="activity-time">2 hours ago</span>
            <span className="activity-text">New order placed for "Sunset by the Lake"</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">5 hours ago</span>
            <span className="activity-text">New user registered</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">1 day ago</span>
            <span className="activity-text">New painting added: "Mountain Landscape"</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">2 days ago</span>
            <span className="activity-text">Exhibition "Modern Art" updated</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

const PaintingsList = () => {
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/paintings")
        if (!response.ok) {
          throw new Error("Failed to fetch paintings")
        }
        const data = await response.json()
        setPaintings(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchPaintings()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this painting?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/paintings/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete painting")
        }

        // Remove the deleted painting from state
        setPaintings(paintings.filter((painting) => painting._id !== id))
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading paintings...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="admin-paintings">
      <div className="admin-header">
        <h2>Manage Paintings</h2>
        <Link to="/admin/paintings/add" className="btn">
          Add New Painting
        </Link>
      </div>

      {paintings.length === 0 ? (
        <div className="no-items">No paintings found</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Featured</th>
                <th>In Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paintings.map((painting) => (
                <tr key={painting._id}>
                  <td>
                    <img
                      src={painting.imageUrl || "/placeholder.svg?height=50&width=50"}
                      alt={painting.title}
                      className="table-image"
                    />
                  </td>
                  <td>{painting.title}</td>
                  <td>{painting.artist.name}</td>
                  <td>${painting.price.toFixed(2)}</td>
                  <td>{painting.isFeatured ? "Yes" : "No"}</td>
                  <td>{painting.inStock ? "Yes" : "No"}</td>
                  <td className="action-buttons">
                    <Link to={`/admin/paintings/edit/${painting._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(painting._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const ArtistsList = () => {
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists")
        if (!response.ok) {
          throw new Error("Failed to fetch artists")
        }
        const data = await response.json()
        setArtists(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete artist")
        }

        // Remove the deleted artist from state
        setArtists(artists.filter((artist) => artist._id !== id))
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading artists...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="admin-artists">
      <div className="admin-header">
        <h2>Manage Artists</h2>
        <Link to="/admin/artists/add" className="btn">
          Add New Artist
        </Link>
      </div>

      {artists.length === 0 ? (
        <div className="no-items">No artists found</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Nationality</th>
                <th>Birth Year</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist) => (
                <tr key={artist._id}>
                  <td>
                    <img
                      src={artist.imageUrl || "/placeholder.svg?height=50&width=50"}
                      alt={artist.name}
                      className="table-image"
                    />
                  </td>
                  <td>{artist.name}</td>
                  <td>{artist.nationality}</td>
                  <td>{artist.birthYear}</td>
                  <td>{artist.featured ? "Yes" : "No"}</td>
                  <td className="action-buttons">
                    <Link to={`/admin/artists/edit/${artist._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(artist._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const ExhibitionsList = () => {
  const [exhibitions, setExhibitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/exhibitions")
        if (!response.ok) {
          throw new Error("Failed to fetch exhibitions")
        }
        const data = await response.json()
        setExhibitions(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchExhibitions()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this exhibition?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/exhibitions/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete exhibition")
        }

        // Remove the deleted exhibition from state
        setExhibitions(exhibitions.filter((exhibition) => exhibition._id !== id))
      } catch (err) {
        alert(err.message)
      }
    }
  }

  if (loading) {
    return <div className="loading">Loading exhibitions...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="admin-exhibitions">
      <div className="admin-header">
        <h2>Manage Exhibitions</h2>
        <Link to="/admin/exhibitions/add" className="btn">
          Add New Exhibition
        </Link>
      </div>

      {exhibitions.length === 0 ? (
        <div className="no-items">No exhibitions found</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Location</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {exhibitions.map((exhibition) => (
                <tr key={exhibition._id}>
                  <td>
                    <img
                      src={exhibition.imageUrl || "/placeholder.svg?height=50&width=50"}
                      alt={exhibition.title}
                      className="table-image"
                    />
                  </td>
                  <td>{exhibition.title}</td>
                  <td>{formatDate(exhibition.startDate)}</td>
                  <td>{formatDate(exhibition.endDate)}</td>
                  <td>{exhibition.location}</td>
                  <td>{exhibition.featured ? "Yes" : "No"}</td>
                  <td className="action-buttons">
                    <Link to={`/admin/exhibitions/edit/${exhibition._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button className="delete-btn" onClick={() => handleDelete(exhibition._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const OrdersList = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders")
        if (!response.ok) {
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        setOrders(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Update the updateOrderStatus function
  const updateOrderStatus = async (id, status) => {
    try {
      // Update the endpoint if needed based on your backend routes
      const endpoint = status === "paid" ? 
        `http://localhost:5000/api/orders/${id}/pay` : 
        `http://localhost:5000/api/orders/${id}/deliver`;
        
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update order ${status} status`);
      }

      // Update the order in state
      setOrders(
        orders.map((order) =>
          order._id === id ? 
          { ...order, [status === "paid" ? "isPaid" : "isDelivered"]: true } : 
          order
        )
      );
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return <div className="loading">Loading orders...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not yet"
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="admin-orders">
      <div className="admin-header">
        <h2>Manage Orders</h2>
      </div>

      {orders.length === 0 ? (
        <div className="no-items">No orders found</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user ? order.user.name : "Guest User"}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    {order.isPaid ? (
                      formatDate(order.paidAt)
                    ) : (
                      <button className="status-btn" onClick={() => updateOrderStatus(order._id, "paid")}>
                        Mark as Paid
                      </button>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      formatDate(order.deliveredAt)
                    ) : (
                      <button className="status-btn" onClick={() => updateOrderStatus(order._id, "delivered")}>
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                  <td className="action-buttons">
                    <Link to={`/admin/orders/${order._id}`} className="view-btn">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users")
        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }
        const data = await response.json()
        setUsers(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const toggleAdminStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !currentStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update user status")
      }

      // Update the user in state
      setUsers(users.map((user) => (user._id === id ? { ...user, isAdmin: !currentStatus } : user)))
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="admin-users">
      <div className="admin-header">
        <h2>Manage Users</h2>
      </div>

      {users.length === 0 ? (
        <div className="no-items">No users found</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="action-buttons">
                    <button
                      className={user.isAdmin ? "status-btn admin" : "status-btn"}
                      onClick={() => toggleAdminStatus(user._id, user.isAdmin)}
                    >
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const updateOrderStatus = async (status) => {
    try {
      const endpoint = status === "paid" ? 
        `http://localhost:5000/api/orders/${id}/pay` : 
        `http://localhost:5000/api/orders/${id}/deliver`;
        
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to update order ${status} status`);
      }

      // Update the order in state with the updated information
      setOrder(prev => ({
        ...prev,
        [status === "paid" ? "isPaid" : "isDelivered"]: true,
        [status === "paid" ? "paidAt" : "deliveredAt"]: new Date().toISOString()
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not yet";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!order) {
    return <div className="error">Order not found</div>;
  }

  return (
    <div className="admin-order-details">
      <div className="admin-header">
        <h2>Order Details</h2>
        <button className="btn" onClick={() => navigate('/admin/orders')}>
          Back to Orders
        </button>
      </div>

      <div className="order-info-grid">
        <div className="order-info-card">
          <h3>Order Information</h3>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Date Placed:</strong> {formatDate(order.createdAt)}</p>
          <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
          <p>
            <strong>Payment Status:</strong> {order.isPaid ? `Paid on ${formatDate(order.paidAt)}` : "Not Paid"}
            {!order.isPaid && (
              <button className="status-btn" onClick={() => updateOrderStatus("paid")}>
                Mark as Paid
              </button>
            )}
          </p>
          <p>
            <strong>Delivery Status:</strong> {order.isDelivered ? `Delivered on ${formatDate(order.deliveredAt)}` : "Not Delivered"}
            {!order.isDelivered && (
              <button className="status-btn" onClick={() => updateOrderStatus("delivered")}>
                Mark as Delivered
              </button>
            )}
          </p>
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        </div>

        <div className="order-info-card">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> {order.user ? order.user.name : "Guest User"}</p>
          <p><strong>Email:</strong> {order.user ? order.user.email : "N/A"}</p>
          
          <h3>Shipping Address</h3>
          <p>{order.shippingAddress.address}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
          <p>{order.shippingAddress.country}</p>
        </div>
      </div>

      <div className="order-items-section">
        <h3>Order Items</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.painting && typeof item.painting === 'object' ? (
                      <img 
                        src={item.painting.imageUrl || "/placeholder.svg?height=50&width=50"} 
                        alt={item.painting.title || "Painting"} 
                        className="table-image"
                      />
                    ) : (
                      <div className="table-image placeholder">No image</div>
                    )}
                  </td>
                  <td>
                    {item.painting && typeof item.painting === 'object' ? (
                      <>
                        <strong>{item.painting.title || "Unknown Painting"}</strong>
                        {item.painting.artist && <p>by {item.painting.artist.name || "Unknown Artist"}</p>}
                      </>
                    ) : (
                      <span>Painting ID: {item.painting}</span>
                    )}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" style={{textAlign: "right"}}><strong>Total:</strong></td>
                <td><strong>${order.totalPrice.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

const PaintingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    artist: '',
    medium: '',
    dimensions: { width: '', height: '' },
    year: '',
    category: '',
    isFeatured: false,
    inStock: true
  });

  useEffect(() => {
    // Fetch artists for the dropdown
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/artists');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        setArtists(data);
      } catch (err) {
        setError(err.message);
      }
    };

    // If editing, fetch the painting data
    const fetchPainting = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/paintings/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch painting');
        }
        const data = await response.json();
        
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
          artist: data.artist._id,
          medium: data.medium,
          dimensions: data.dimensions,
          year: data.year,
          category: data.category,
          isFeatured: data.isFeatured,
          inStock: data.inStock
        });
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtists();
    
    if (id) {
      fetchPainting();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'width' || name === 'height') {
      setFormData({
        ...formData,
        dimensions: {
          ...formData.dimensions,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id 
        ? `http://localhost:5000/api/paintings/${id}`
        : 'http://localhost:5000/api/paintings';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${id ? 'update' : 'create'} painting`);
      }
      
      navigate('/admin/paintings');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading painting data...</div>;
  }

  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <h2>{id ? 'Edit Painting' : 'Add New Painting'}</h2>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="artist">Artist</label>
          <select
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          >
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="medium">Medium</label>
          <input
            type="text"
            id="medium"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="width">Width (cm)</label>
            <input
              type="number"
              id="width"
              name="width"
              value={formData.dimensions.width}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.dimensions.height}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-row checkbox-row">
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            <label htmlFor="isFeatured">Featured</label>
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            <label htmlFor="inStock">In Stock</label>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn">
            {id ? 'Update Painting' : 'Create Painting'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/paintings')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ArtistForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    biography: '',
    imageUrl: '',
    nationality: '',
    birthYear: '',
    deathYear: '',
    featured: false
  });
  
  useEffect(() => {
    if (id) {
      const fetchArtist = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/artists/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch artist');
          }
          const data = await response.json();
          setFormData({
            name: data.name,
            biography: data.biography,
            imageUrl: data.imageUrl,
            nationality: data.nationality,
            birthYear: data.birthYear,
            deathYear: data.deathYear || '',
            featured: data.featured
          });
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      
      fetchArtist();
    }
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:5000/api/artists/${id}`
        : 'http://localhost:5000/api/artists';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${id ? 'update' : 'create'} artist`);
      }
      
      navigate('/admin/artists');
    } catch (err) {
      alert(err.message);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading artist data...</div>;
  }
  
  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <h2>{id ? 'Edit Artist' : 'Add New Artist'}</h2>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nationality">Nationality</label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="birthYear">Birth Year</label>
            <input
              type="number"
              id="birthYear"
              name="birthYear"
              value={formData.birthYear}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="deathYear">Death Year (if applicable)</label>
            <input
              type="number"
              id="deathYear"
              name="deathYear"
              value={formData.deathYear}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="biography">Biography</label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Featured Artist</label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn">
            {id ? 'Update Artist' : 'Create Artist'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/artists')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ExhibitionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    imageUrl: '',
    location: '',
    featured: false,
    artists: [],
    paintings: []
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch artists
        const artistsResponse = await fetch('http://localhost:5000/api/artists');
        if (!artistsResponse.ok) {
          throw new Error('Failed to fetch artists');
        }
        const artistsData = await artistsResponse.json();
        setArtists(artistsData);
        
        // Fetch paintings
        const paintingsResponse = await fetch('http://localhost:5000/api/paintings');
        if (!paintingsResponse.ok) {
          throw new Error('Failed to fetch paintings');
        }
        const paintingsData = await paintingsResponse.json();
        setPaintings(paintingsData);
        
        // If editing, fetch the exhibition
        if (id) {
          const exhibitionResponse = await fetch(`http://localhost:5000/api/exhibitions/${id}`);
          if (!exhibitionResponse.ok) {
            throw new Error('Failed to fetch exhibition');
          }
          const exhibitionData = await exhibitionResponse.json();
          
          setFormData({
            title: exhibitionData.title,
            description: exhibitionData.description,
            startDate: new Date(exhibitionData.startDate).toISOString().split('T')[0],
            endDate: new Date(exhibitionData.endDate).toISOString().split('T')[0],
            imageUrl: exhibitionData.imageUrl,
            location: exhibitionData.location,
            featured: exhibitionData.featured,
            artists: exhibitionData.artists.map(artist => 
              typeof artist === 'object' ? artist._id : artist
            ),
            paintings: exhibitionData.paintings.map(painting => 
              typeof painting === 'object' ? painting._id : painting
            )
          });
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'artists' || name === 'paintings') {
      // Handle multi-select
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({
        ...formData,
        [name]: options
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:5000/api/exhibitions/${id}`
        : 'http://localhost:5000/api/exhibitions';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Failed to ${id ? 'update' : 'create'} exhibition`);
      }
      
      navigate('/admin/exhibitions');
    } catch (err) {
      alert(err.message);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading exhibition data...</div>;
  }
  
  return (
    <div className="admin-form-container">
      <div className="admin-header">
        <h2>{id ? 'Edit Exhibition' : 'Add New Exhibition'}</h2>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="artists">Featured Artists</label>
          <select
            id="artists"
            name="artists"
            multiple
            value={formData.artists}
            onChange={handleChange}
            className="multi-select"
          >
            {artists.map(artist => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
          <small>Hold Ctrl/Cmd to select multiple artists</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="paintings">Featured Paintings</label>
          <select
            id="paintings"
            name="paintings"
            multiple
            value={formData.paintings}
            onChange={handleChange}
            className="multi-select"
          >
            {paintings.map(painting => (
              <option key={painting._id} value={painting._id}>
                {painting.title} by {painting.artist.name}
              </option>
            ))}
          </select>
          <small>Hold Ctrl/Cmd to select multiple paintings</small>
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <label htmlFor="featured">Featured Exhibition</label>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn">
            {id ? 'Update Exhibition' : 'Create Exhibition'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/admin/exhibitions')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
const AdminDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in and is admin
    const loggedInUser = JSON.parse(localStorage.getItem("user"))

    if (!loggedInUser || !loggedInUser.isAdmin) {
      navigate("/login")
      return
    }

    setUser(loggedInUser)
  }, [navigate])

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="admin-dashboard-page">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        <div className="admin-dashboard-container">
          <div className="admin-sidebar">
            <div className="admin-user">
              <div className="admin-avatar">{user.name.charAt(0)}</div>
              <div className="admin-user-info">
                <p className="admin-user-name">{user.name}</p>
                <p className="admin-user-role">Administrator</p>
              </div>
            </div>

            <nav className="admin-nav">
              <Link to="/admin" className={location.pathname === "/admin" ? "admin-nav-link active" : "admin-nav-link"}>
                Dashboard
              </Link>
              <Link
                to="/admin/paintings"
                className={location.pathname.includes("/admin/paintings") ? "admin-nav-link active" : "admin-nav-link"}
              >
                Paintings
              </Link>
              <Link
                to="/admin/artists"
                className={location.pathname.includes("/admin/artists") ? "admin-nav-link active" : "admin-nav-link"}
              >
                Artists
              </Link>
              <Link
                to="/admin/exhibitions"
                className={
                  location.pathname.includes("/admin/exhibitions") ? "admin-nav-link active" : "admin-nav-link"
                }
              >
                Exhibitions
              </Link>
              <Link
                to="/admin/orders"
                className={location.pathname.includes("/admin/orders") ? "admin-nav-link active" : "admin-nav-link"}
              >
                Orders
              </Link>
              <Link
                to="/admin/users"
                className={location.pathname.includes("/admin/users") ? "admin-nav-link active" : "admin-nav-link"}
              >
                Users
              </Link>
            </nav>
          </div>

          <div className="admin-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/paintings" element={<PaintingsList />} />
              <Route path="/paintings/add" element={<PaintingForm />} />
              <Route path="/paintings/edit/:id" element={<PaintingForm />} />
              <Route path="/artists" element={<ArtistsList />} />
              <Route path="/artists/add" element={<ArtistForm />} />
              <Route path="/artists/edit/:id" element={<ArtistForm />} />
              <Route path="/exhibitions" element={<ExhibitionsList />} />
              <Route path="/exhibitions/add" element={<ExhibitionForm />} />
              <Route path="/exhibitions/edit/:id" element={<ExhibitionForm />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/users" element={<UsersList />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
