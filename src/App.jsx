import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://jobportal-backend-wlb9.onrender.com'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPostForm, setShowPostForm] = useState(false)
  const [formData, setFormData] = useState({
    job_title: '',
    company: '',
    location: '',
    city: 'Mumbai',
    salary: '',
    contact: '',
    job_description: ''
  })

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/jobs`)
      const data = await res.json()
      setJobs(data)
    } catch (err) {
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

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
      } else {
        const err = await res.json()
        alert('Error: ' + JSON.stringify(err))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
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
      if (res.ok) {
        alert('Apply ho gaya! Company aapse contact karegi.')
      } else {
        alert('Apply fail ho gaya')
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔨 SimpleJobs - Rozgar Setu</h1>
        <p>Daily wage workers ke liye jobs</p>
        <button className="post-btn" onClick={() => setShowPostForm(!showPostForm)}>
          {showPostForm ? 'Cancel' : '+ Job Post Karo'}
        </button>
      </header>

      {showPostForm && (
        <form className="post-form" onSubmit={handlePostJob}>
          <h3>Naya Job Post Karo</h3>
          <input required placeholder="Job Title (e.g. Helper Chahiye)" value={formData.job_title} onChange={e => setFormData({...formData, job_title: e.target.value})} />
          <input required placeholder="Company Name" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
          <input required placeholder="Location (e.g. Andheri East)" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          <input required placeholder="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
          <input required placeholder="Salary (e.g. 15000)" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} />
          <input required placeholder="Contact Number" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} />
          <textarea placeholder="Job Description" value={formData.job_description} onChange={e => setFormData({...formData, job_description: e.target.value})}></textarea>
          <button type="submit">Post Job</button>
        </form>
      )}

      <div className="jobs-section">
        <h2>Available Jobs ({jobs.length}) - Backend: {API_URL}</h2>
        {loading ? <p>Loading jobs...</p> : jobs.length === 0 ? <p>Koi job nahi hai, pehla job post karo!</p> : (
          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job.job_id} className="job-card">
                <h3>{job.job_title}</h3>
                <p><b>Company:</b> {job.company}</p>
                <p><b>Location:</b> {job.location}, {job.city}</p>
                <p><b>Salary:</b> ₹{job.salary}</p>
                <p><b>Contact:</b> {job.contact}</p>
                <p className="desc">{job.job_description}</p>
                <small>Posted: {job.created_at?.split(' ')[0]}</small>
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
