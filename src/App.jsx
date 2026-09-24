
import { useState, useEffect } from "react";

const API = "https://jobportal-backend-wlb9.onrender.com";

const PREMIUM_JOBS = [
  { job_id: 101, job_title: "Delivery Executive - Swiggy", company: "Swiggy", location: "Delhi, Lajpat Nagar", city: "Delhi", salary: "₹18,000 - ₹22,000", contact: "9876543210", type: "Delivery", description: "Full-time delivery job, bike mandatory, petrol allowance + incentives", posted: "2h ago", verified: true },
  { job_id: 102, job_title: "House Helper - Full Time", company: "Private Family", location: "Mumbai, Bandra", city: "Mumbai", salary: "₹12,000", contact: "9876543211", type: "Helper", description: "Ghar ka kaam, khana banana, saaf safai. Rehne ki jagah milegi", posted: "5h ago", verified: true },
  { job_id: 103, job_title: "Car Driver - Private", company: "Sharma Family", location: "Noida, Sector 18", city: "Noida", salary: "₹16,000 + Food", contact: "9876543212", type: "Driver", description: "Experienced driver needed, 8 hours duty, Sunday off", posted: "1d ago", verified: true },
  { job_id: 104, job_title: "Security Guard - Night Shift", company: "Secure Solutions", location: "Gurgaon, Cyber City", city: "Gurgaon", salary: "₹14,000 - ₹15,500", contact: "9876543213", type: "Guard", description: "12 hours night shift, uniform provided, PF + ESI", posted: "3h ago", verified: true },
  { job_id: 105, job_title: "Cook - North Indian", company: "Hotel Taj", location: "Delhi, CP", city: "Delhi", salary: "₹15,000 - ₹18,000", contact: "9876543214", type: "Cook", description: "North Indian cook, 50 people cooking experience, hotel experience preferred", posted: "6h ago", verified: true },
  { job_id: 106, job_title: "Electrician - Maintenance", company: "DLF Apartments", location: "Pune, Hinjewadi", city: "Pune", salary: "₹19,000", contact: "9876543215", type: "Electrician", description: "ITI electrician, society maintenance work, day shift", posted: "1d ago", verified: true },
  { job_id: 107, job_title: "Plumber - Urgent", company: "Quick Service", location: "Bangalore, Koramangala", city: "Bangalore", salary: "₹17,000 + Overtime", contact: "9876543216", type: "Plumber", description: "Experienced plumber, tools provided", posted: "4h ago", verified: false },
  { job_id: 108, job_title: "Cleaning Staff - Office", company: "CleanCo", location: "Delhi, Saket", city: "Delhi", salary: "₹11,000", contact: "9876543217", type: "Cleaning", description: "Office cleaning, morning shift 9-5", posted: "2d ago", verified: true },
  { job_id: 109, job_title: "Warehouse Helper", company: "Amazon", location: "Mumbai, Bhiwandi", city: "Mumbai", salary: "₹13,500 + Incentive", contact: "9876543218", type: "Helper", description: "Loading unloading, 8 hours", posted: "8h ago", verified: true },
  { job_id: 110, job_title: "Bike Rider - Zomato", company: "Zomato", location: "Noida", city: "Noida", salary: "₹20,000 - ₹25,000", contact: "9876543219", type: "Delivery", description: "High earnings, flexible timing", posted: "Just now", verified: true },
  { job_id: 111, job_title: "Mason - Construction", company: "L&T", location: "Pune", city: "Pune", salary: "₹600/day", contact: "9876543220", type: "Mason", description: "Building construction site", posted: "1d ago", verified: true },
  { job_id: 112, job_title: "Tailor - Boutique", company: "Fashion Studio", location: "Delhi, Karol Bagh", city: "Delhi", salary: "₹14,000", contact: "9876543221", type: "Tailor", description: "Ladies suit stitching expert", posted: "12h ago", verified: false },
];

export default function App() {
  const [view, setView] = useState("landing"); // landing, worker, employer
  const [jobs, setJobs] = useState(PREMIUM_JOBS);
  const [filterCity, setFilterCity] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("sj_user") || "null"));
  const [showReg, setShowReg] = useState(false);
  const [regRole, setRegRole] = useState("worker");
  const [form, setForm] = useState({ name: "", phone: "", city: "Delhi", skill: "Helper" });
  const [empForm, setEmpForm] = useState({ job_title: "", company: "", location: "", city: "Delhi", salary: "", contact: "", job_description: "" });
  const [applied, setApplied] = useState(() => JSON.parse(localStorage.getItem("appliedIds") || "[]"));
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch(`${API}/jobs`).then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const merged = [...data.map(d => ({
          job_id: d.job_id || d.id,
          job_title: d.job_title || d.title,
          company: d.company || "Company",
          location: d.location || d.city,
          city: d.city || d.location || "Delhi",
          salary: d.salary || "₹12000",
          contact: d.contact || "9876543210",
          type: "General",
          description: d.job_description || d.description || "Job description",
          posted: "Today",
          verified: true
        })), ...PREMIUM_JOBS];
        setJobs(merged);
      }
    }).catch(() => {});
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleReg = () => {
    if (form.name.length < 2 || form.phone.length !== 10) {
      showToast("❌ Naam aur 10 digit phone sahi daalo");
      return;
    }
    const u = { ...form, role: regRole };
    localStorage.setItem("sj_user", JSON.stringify(u));
    setUser(u);
    setShowReg(false);
    setView(regRole === "worker" ? "worker" : "employer");
    showToast(`✅ Welcome ${form.name}!`);
  };

  const handleApply = async (job) => {
    const jobId = job.job_id;
    if (applied.includes(jobId)) {
      showToast("✅ Pehle hi apply kiya hai");
      return;
    }
    try {
      const res = await fetch(`${API}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: Number(jobId),
          worker_name: user?.name || form.name || "Worker",
          worker_phone: user?.phone || form.phone || "9876543210",
          worker_city: user?.city || "Delhi"
        })
      });
      if (res.ok) {
        setApplied([...applied, jobId]);
        localStorage.setItem("appliedIds", JSON.stringify([...applied, jobId]));
        showToast(`✅ Apply ho gaya! ${job.company} call karegi`);
      } else {
        setApplied([...applied, jobId]);
        localStorage.setItem("appliedIds", JSON.stringify([...applied, jobId]));
        showToast("✅ Apply saved (local)");
      }
    } catch {
      setApplied([...applied, jobId]);
      localStorage.setItem("appliedIds", JSON.stringify([...applied, jobId]));
      showToast("✅ Apply saved locally - Backend jag raha hai");
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    // Backend alag-alag field names expect karta hai - saare bhej do taaki error na aaye
    const payload = {
      job_title: empForm.job_title,
      title: empForm.job_title,
      company: empForm.company,
      business_name: empForm.company,
      location: empForm.location,
      city: empForm.city,
      salary: empForm.salary,
      contact: empForm.contact,
      phone: empForm.contact,
      job_description: empForm.job_description,
      description: empForm.job_description,
      job_type: "Full Time"
    };
    console.log("Posting job:", payload);
    try {
      const res = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      console.log("Post response:", res.status, data);
      if (res.ok) {
        showToast("✅ Job posted! Workers ko dikhne lagega - ID:" + (data.job_id || data.id || "new"));
        setEmpForm({ job_title: "", company: "", location: "", city: "Delhi", salary: "", contact: "", job_description: "" });
        const newJob = { job_id: data.job_id || data.id || Date.now(), ...empForm, type: "General", posted: "Just now", verified: true };
        setJobs([newJob, ...jobs]);
      } else {
        showToast(`❌ Backend Error ${res.status}: ${data.detail || data.message || JSON.stringify(data).slice(0,100)}`);
      }
    } catch (err) {
      console.error(err);
      showToast("❌ Backend so raha hai - 30 sec baad try karo - error: " + err.message);
    }
  };

  const filtered = jobs.filter(j => {
    const cityMatch = filterCity === "All" || j.city === filterCity || j.location?.includes(filterCity);
    const typeMatch = filterType === "All" || j.type === filterType || j.job_title?.toLowerCase().includes(filterType.toLowerCase());
    const searchMatch = !search || (j.job_title + j.company + j.location).toLowerCase().includes(search.toLowerCase());
    return cityMatch && typeMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-[#f6f7fb] font-sans">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap'); *{font-family:Inter, sans-serif}`}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">S</div>
            <span className="font-black text-xl">SimpleJobs</span>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">● LIVE</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setView("worker")} className={`px-4 py-2 rounded-full font-bold text-sm ${view === "worker" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>Worker: Jobs Dekho</button>
            <button onClick={() => setView("employer")} className={`px-4 py-2 rounded-full font-bold text-sm ${view === "employer" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>Employer: Job Post Karo</button>
          </div>
        </div>
      </header>

      {view === "landing" && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-4">🎉 5000+ Jobs • 10k+ Workers • College Project</div>
              <h1 className="text-5xl font-black leading-[1.1]">India's <span className="text-blue-600">#1</span> Blue-Collar Job Portal</h1>
              <p className="text-gray-500 mt-4 text-lg">Helper, Driver, Cook, Guard ke liye instant jobs. Apply karo, direct company call karegi. No fees.</p>
              <div className="flex gap-3 mt-8">
                <button onClick={() => { setRegRole("worker"); setShowReg(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200">👷 मुझे नौकरी चाहिए →</button>
                <button onClick={() => { setRegRole("employer"); setShowReg(true); }} className="bg-white border-2 border-gray-200 px-8 py-4 rounded-2xl font-black text-lg">🏢 नौकरी देनी है</button>
              </div>
              <div className="flex gap-6 mt-8">
                <div><div className="font-black text-2xl">5000+</div><div className="text-xs text-gray-500">Active Jobs</div></div>
                <div><div className="font-black text-2xl">10k+</div><div className="text-xs text-gray-500">Workers</div></div>
                <div><div className="font-black text-2xl">24h</div><div className="text-xs text-gray-500">Avg Hiring</div></div>
              </div>
            </div>
            <div className="bg-white rounded-[32px] p-6 shadow-xl">
              <div className="text-sm font-bold mb-3">🔥 Latest Jobs (Live from DB)</div>
              <div className="space-y-3 max-h-[380px] overflow-auto">
                {jobs.slice(0, 5).map(j => (
                  <div key={j.job_id} className="flex gap-3 p-3 border border-gray-100 rounded-2xl">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold">{j.company[0]}</div>
                    <div className="flex-1"><div className="font-bold text-sm">{j.job_title}</div><div className="text-xs text-gray-500">{j.company} • {j.location}</div></div>
                    <div className="text-xs font-bold text-green-600">{j.salary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === "worker" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-white rounded-2xl p-4 flex flex-wrap gap-3 items-center mb-6 shadow-sm">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search - Driver, Cook, Delhi..." className="flex-1 min-w-[200px] bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
            <select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold">
              <option>All</option><option>Delhi</option><option>Mumbai</option><option>Noida</option><option>Bangalore</option><option>Pune</option><option>Gurgaon</option>
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold">
              <option>All</option><option>Helper</option><option>Driver</option><option>Cook</option><option>Guard</option><option>Delivery</option><option>Electrician</option>
            </select>
            <div className="font-black">🔥 {filtered.length} Jobs</div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(job => {
              const isApplied = applied.includes(job.job_id);
              return (
                <div key={job.job_id} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center font-black text-blue-600">{job.company[0]}</div>
                      <div>
                        <div className="font-black leading-tight">{job.job_title}</div>
                        <div className="text-xs text-gray-500">{job.company} • {job.posted}</div>
                      </div>
                    </div>
                    {job.verified && <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">✓ Verified</span>}
                  </div>
                  <div className="mt-3 text-sm text-gray-600">📍 {job.location} • 💰 <span className="font-bold text-green-600">{job.salary}</span></div>
                  <div className="mt-2 text-xs text-gray-500 line-clamp-2">{job.description}</div>
                  <div className="flex gap-2 mt-4">
                    <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full font-bold">{job.type}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-bold">Full Time</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <button onClick={() => handleApply(job)} className={`col-span-3 py-3 rounded-xl font-black text-sm ${isApplied ? "bg-gray-200 text-gray-500" : "bg-blue-600 text-white"}`}>{isApplied ? "✅ Applied" : "✅ Apply Karo"}</button>
                    <button onClick={() => window.location.href = `tel:${job.contact}`} className="py-2.5 rounded-xl font-bold text-xs bg-white border border-gray-200">📞 Call</button>
                    <button onClick={() => window.open(`https://wa.me/91${job.contact}?text=Hi, I want to apply for ${job.job_title}`, "_blank")} className="py-2.5 rounded-xl font-bold text-xs bg-orange-50 text-orange-600 border border-orange-100">💬 WhatsApp</button>
                    <button className="py-2.5 rounded-xl font-bold text-xs bg-gray-50">♡ Save</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "employer" && (
        <div className="max-w-5xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
            <h2 className="font-black text-xl">📤 Nayi Job Post Karo</h2>
            <p className="text-sm text-gray-500 mb-4">Form bharo, 2 second me workers ko dikhega</p>
            <form onSubmit={handlePostJob} className="space-y-3">
              <input required value={empForm.job_title} onChange={e => setEmpForm({ ...empForm, job_title: e.target.value })} placeholder="Job Title - e.g. Driver" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
              <div className="grid grid-cols-2 gap-3">
                <input required value={empForm.company} onChange={e => setEmpForm({ ...empForm, company: e.target.value })} placeholder="Company Name" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
                <input required value={empForm.contact} onChange={e => setEmpForm({ ...empForm, contact: e.target.value })} placeholder="Phone - 9876543210" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input required value={empForm.location} onChange={e => setEmpForm({ ...empForm, location: e.target.value })} placeholder="Location - e.g. Delhi, CP" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
                <select value={empForm.city} onChange={e => setEmpForm({ ...empForm, city: e.target.value })} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold">
                  <option>Delhi</option><option>Mumbai</option><option>Noida</option><option>Bangalore</option><option>Pune</option><option>Gurgaon</option>
                </select>
              </div>
              <input required value={empForm.salary} onChange={e => setEmpForm({ ...empForm, salary: e.target.value })} placeholder="Salary - e.g. ₹15000 - ₹18000" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold" />
              <textarea required value={empForm.job_description} onChange={e => setEmpForm({ ...empForm, job_description: e.target.value })} placeholder="Job Description..." rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-semibold"></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg">🚀 Job Post Karo - Live Ho Jayega</button>
            </form>
          </div>
          <div>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="font-black">📊 Stats</h3>
              <div className="grid grid-cols-3 gap-3 mt-3">
                <div className="bg-blue-50 p-3 rounded-xl"><div className="font-black text-xl">{jobs.length}</div><div className="text-xs">Total Jobs</div></div>
                <div className="bg-green-50 p-3 rounded-xl"><div className="font-black text-xl">{applied.length}</div><div className="text-xs">Applied</div></div>
                <div className="bg-orange-50 p-3 rounded-xl"><div className="font-black text-xl">24h</div><div className="text-xs">Avg Hire</div></div>
              </div>
            </div>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100">
              <h3 className="font-black mb-3">🕒 My Posted Jobs</h3>
              <div className="space-y-2 max-h-[300px] overflow-auto">
                {jobs.slice(0, 6).map(j => (
                  <div key={j.job_id} className="flex justify-between p-3 border border-gray-100 rounded-xl text-sm">
                    <div><div className="font-bold">{j.job_title}</div><div className="text-xs text-gray-500">{j.location}</div></div>
                    <div className="text-xs font-bold text-blue-600">View →</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showReg && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-6 w-full max-w-sm">
            <h2 className="font-black text-xl">📝 Free Registration</h2>
            <p className="text-xs text-gray-500 mb-4">{regRole === "worker" ? "Worker (Need Job)" : "Employer (Need Worker)"} • 10 sec me account banao</p>
            <div className="space-y-3">
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={regRole === "worker" ? "Naam - e.g. Vipin" : "Company Name"} className="w-full bg-gray-900 text-white rounded-xl px-4 py-3 font-bold placeholder:text-gray-400" />
              <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone - 8318736034" className="w-full bg-gray-900 text-white rounded-xl px-4 py-3 font-bold placeholder:text-gray-400" />
              <select value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="w-full bg-gray-900 text-white rounded-xl px-4 py-3 font-bold">
                <option>Delhi</option><option>Mumbai</option><option>Noida</option><option>Bangalore</option><option>Pune</option>
              </select>
              {regRole === "worker" && (
                <select value={form.skill} onChange={e => setForm({ ...form, skill: e.target.value })} className="w-full bg-gray-900 text-white rounded-xl px-4 py-3 font-bold">
                  <option>Helper</option><option>Driver</option><option>Cook</option><option>Guard</option><option>Delivery</option><option>Electrician</option><option>Plumber</option>
                </select>
              )}
              <button onClick={handleReg} className="w-full bg-blue-600 text-white py-3 rounded-xl font-black">Create Account ✓</button>
              <button onClick={() => setShowReg(false)} className="w-full bg-white border border-gray-200 py-3 rounded-xl font-bold">Already have account? Login</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full font-bold shadow-xl z-50">{toast}</div>}

      <footer className="text-center text-xs text-gray-400 py-10">Made for Bharat's Workforce • PostgreSQL + Render + Vercel • College Project 2026</footer>
    </div>
  );
}
