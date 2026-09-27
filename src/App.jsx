import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://jobportal-backend-wlb9.onrender.com'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    job_title: '', company: '', location: '', city: 'Mumbai',
    salary: '', contact: '', job_description: ''
  })
  const [authForm, setAuthForm] = useState({ name: '', phone: '', password: '' })
  const [isLogin, setIsLogin] = useState(false)

  // SAFE get display name - NEVER crashes on full_name
  const getDisplayName = (u) => {
    if (!u) return 'Guest'
    return u?.full_name || u?.['full name'] || u?.fullName || u?.name || 'User'
  }

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/jobs`)
      const data = await res.json()
      setJobs(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setJobs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchJobs() }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    try {
      const endpoint = isLogin ? '/login' : '/register'
      const payload = isLogin 
        ? { phone: authForm.phone, password: authForm.password }
        : { 
            name: authForm.name, 
            full_name: authForm.name, // Send all variants
            fullName: authForm.name,
            phone: authForm.phone, 
            password: authForm.password,
            role: 'Worker'
          }
      
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || JSON.stringify(data))
      
      setUser(data)
      alert(`${isLogin ? 'Login success' : 'Account created'}! Welcome ${getDisplayName(data)}`)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handlePostJob = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Job posted successfully!')
        setFormData({ job_title: '', company: '', location: '', city: 'Mumbai', salary: '', contact: '', job_description: '' })
        setShowPostForm(false)
        fetchJobs()
      }
    } catch (err) { alert('Error: ' + err.message) }
  }

  const handleApply = async (jobId) => {
    const name = prompt('Apna naam likho:')
    if (!name) return
    const phone = prompt('Apna phone number likho:')
    if (!phone) return
    try {
      const res = await fetch(`${API_URL}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: jobId, worker_name: name, worker_phone: phone, worker_city: 'Mumbai' })
      })
      if (res.ok) alert('Apply ho gaya!')
    } catch (err) { alert('Error: ' + err.message) }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔨 SimpleJobs - Rozgar Setu</h1>
        <p>Daily wage workers ke liye jobs</p>
        {user ? (
          <div>
            <b>Hi, {getDisplayName(user)}! 👋</b>
            <button onClick={() => setUser(null)} style={{ marginLeft: 10 }}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleAuth} style={{ background: '#f5f5f5', padding: 15, borderRadius: 8, marginTop: 10 }}>
            <h3>{isLogin ? 'Login' : 'Create Account'}</h3>
            {!isLogin && (
              <input required placeholder="Full Name" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} />
            )}
            <input required placeholder="Phone" value={authForm.phone} onChange={e => setAuthForm({...authForm, phone: e.target.value})} />
            <input required placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} />
            <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: 10 }}>
              {isLogin ? 'Need Account?' : 'Already have account?'}
            </button>
          </form>
        )}
        {user && (
          <button className="post-btn" onClick={() => setShowPostForm(!showPostForm)} style={{ marginTop: 15 }}>
            {showPostForm ? 'Cancel' : '+ Job Post Karo'}
          </button>
        )}
      </header>

      {showPostForm && user && (
        <form className="post-form" onSubmit={handlePostJob}>
          <h3>Naya Job Post Karo</h3>
          <input required placeholder="Job Title" value={formData.job_title} onChange={e => setFormData({...formData, job_title: e.target.value})} />
          <input required placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
          <input required placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          <input required placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
          <input required placeholder="Salary" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
          <input required placeholder="Contact Number" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
          <textarea placeholder="Job Description" value={formData.job_description} onChange={e => setFormData({...formData, job_description: e.target.value})}></textarea>
          <button type="submit">Post Job</button>
        </form>
      )}

      <div className="jobs-section">
        <h2>Available Jobs ({jobs.length})</h2>
        {loading ? <p>Loading jobs...</p> : jobs.length === 0 ? <p>Koi job nahi hai!</p> : (
          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job.job_id} className="job-card">
                <h3>{job.job_title}</h3>
                <p><b>Company:</b> {job.company}</p>
                <p><b>Location:</b> {job.location}, {job.city}</p>
                <p><b>Salary:</b> ₹{job.salary}</p>
                <button onClick={() => handleApply(job.job_id)}>Apply Karo</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
