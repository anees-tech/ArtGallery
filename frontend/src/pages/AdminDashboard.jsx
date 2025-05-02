"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
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

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      // Update the order in state
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, [status === "paid" ? "isPaid" : "isDelivered"]: true } : order,
        ),
      )
    } catch (err) {
      alert(err.message)
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
                  <td>{order.user.name}</td>
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
              <Route path="/artists" element={<ArtistsList />} />
              <Route path="/exhibitions" element={<ExhibitionsList />} />
              <Route path="/orders" element={<OrdersList />} />
              <Route path="/users" element={<UsersList />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
