
import { useState, useEffect } from "react";
import "./App.css";

const API = "https://jobportal-backend-wlb9.onrender.com";

function App() {
  const [language, setLanguage] = useState(null);
  const [screen, setScreen] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [jobType, setJobType] = useState("all");
  const [showMore, setShowMore] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showToast, setShowToast] = useState("");
  const [jobs, setJobs] = useState([]);

  // Load jobs from backend
  useEffect(() => {
    fetch(API + "/jobs")
      .then(r => r.json())
      .then(data => {
        // backend gives different format, normalize
        const normalized = data.map((j, idx) => ({
          id: j.job_id || j.id || idx,
          name: j.job_title || j.title || "Job",
          title: j.job_title || j.title || "Job",
          location: j.location || j.city || "Delhi",
          city: j.city || j.location || "Delhi",
          salary: j.salary || "₹12000",
          contact: j.contact || j.phone || "9876543210",
          company: j.company || j.business_name || "Company",
          icon: j.icon || "💼",
          distance: j.distance || "2km",
          experience: j.experience || "0-1 year",
          types: j.types || ["fulltime"],
          verified: true
        }));
        if (normalized.length > 0) setJobs(normalized);
      })
      .catch(() => {});
  }, []);

  // Fallback jobs if backend empty
  const defaultJobs = [
    {id: 1, name: "Helper", title: "Helper - Delhi", location: "Delhi", city: "Delhi", salary: "₹12000", contact: "9876543210", company: "Sharma Co", icon: "🧹", distance: "1km", experience: "0-1 year", types: ["fulltime"]},
    {id: 2, name: "Driver", title: "Driver - Mumbai", location: "Mumbai", city: "Mumbai", salary: "₹18000", contact: "9876543211", company: "Mumbai Trans", icon: "🚚", distance: "2km", experience: "1-2 year", types: ["fulltime"]},
    {id: 3, name: "Khana Banana", title: "Khana Banana - Cook", location: "Delhi", city: "Delhi", salary: "₹15000", contact: "9876543212", company: "Hotel Taj", icon: "🍳", distance: "500m", experience: "1 year", types: ["fulltime"]},
    {id: 4, name: "Security Guard", title: "Security Guard", location: "Noida", city: "Noida", salary: "₹14000", contact: "9876543213", company: "Secure Pvt", icon: "🛡️", distance: "3km", experience: "0 year", types: ["fulltime"]},
  ];
  const allJobs = jobs.length > 0 ? jobs : defaultJobs;

  useEffect(() => {
    const s = localStorage.getItem("savedJobs");
    if(s) setSavedJobs(JSON.parse(s));
    const a = localStorage.getItem("appliedJobs");
    if(a) setAppliedJobs(JSON.parse(a));
  }, []);
  useEffect(() => { localStorage.setItem("savedJobs", JSON.stringify(savedJobs)); }, [savedJobs]);
  useEffect(() => { localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs)); }, [appliedJobs]);
  useEffect(() => { if(showToast){ const t = setTimeout(()=>setShowToast(""), 3000); return ()=>clearTimeout(t);} }, [showToast]);

  const languages = [
    { code: "hi", name: "हिन्दी", sub: "Hindi", icon: "🇮🇳" },
    { code: "mr", name: "मराठी", sub: "Marathi", icon: "🇮🇳" },
    { code: "en", name: "English", sub: "English", icon: "🌐" },
    { code: "gu", name: "ગુજરાતી", sub: "Gujarati", icon: "🇮🇳" },
    { code: "bn", name: "বাংলা", sub: "Bengali", icon: "🇮🇳" },
    { code: "ta", name: "தமிழ்", sub: "Tamil", icon: "🇮🇳" },
    { code: "te", name: "తెలుగు", sub: "Telugu", icon: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", sub: "Kannada", icon: "🇮🇳" },
  ];

  const content = {
    hi: { welcome: "नमस्ते 👋", title: "आपको नौकरी चाहिए?", subtitle: "हम आपके लिए सही काम ढूंढने में मदद करेंगे।", worker: "मुझे नौकरी चाहिए", employer: "मुझे काम के लिए लोग चाहिए", listen: "आवाज़ में सुनें", categories: "आप कौन सा काम कर सकते हैं?", nearby: "मेरे पास की नौकरियां", safe: "सुरक्षित नौकरी खोजें", language: "भाषा बदलें", back: "← वापस", search: "काम खोजें...", all: "सभी", more: "और काम देखें", less: "कम काम देखें", fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "आपके आसपास", experience: "अनुभव", salary: "वेतन", distance: "दूरी", assist: "किसी की मदद से नौकरी खोजें", jobDetail: "नौकरी की जानकारी", apply: "अप्लाई करें", applied: "अप्लाई हो गया ✓", call: "📞 कॉल करें", location: "जगह", savedTitle: "सेव की हुई नौकरियां", noSaved: "आपने कोई नौकरी सेव नहीं की", employerTitle: "कर्मचारी चाहिए?", employerDesc: "अपनी कंपनी के लिए भरोसेमंद लोग ढूंढें", postJob: "नौकरी पोस्ट करें", comingSoon: "जल्द आ रहा है" },
    en: { welcome: "Hello 👋", title: "Looking for a job?", subtitle: "We will help you find work that suits you.", worker: "I need a job", employer: "I need workers", listen: "Listen", categories: "What work can you do?", nearby: "Jobs near me", safe: "Find jobs safely", language: "Change language", back: "← Back", search: "Search work...", all: "All", more: "See more jobs", less: "See fewer jobs", fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "Near you", experience: "Experience", salary: "Salary", distance: "Distance", assist: "Find a job with someone's help", jobDetail: "Job Details", apply: "Apply Now", applied: "Applied ✓", call: "📞 Call", location: "Location", savedTitle: "Saved Jobs", noSaved: "No saved jobs yet", employerTitle: "Need workers?", employerDesc: "Find trusted people for your company", postJob: "Post a Job", comingSoon: "Coming Soon" }
  };
  // fallback to Hindi if other lang selected
  const getContent = () => content[language] || content.hi;
  const t = getContent();
  const getJobName = (job) => job.title || job.name;

  const speakText = (text) => {
    if('speechSynthesis' in window){
      const u = new SpeechSynthesisUtterance(text || t.title);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  const toggleSave = (id, e) => {
    e?.stopPropagation();
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
      setShowToast("🤍 सेव से हटाया");
    } else {
      setSavedJobs([...savedJobs, id]);
      setShowToast("❤ सेव किया");
    }
  };

  // === FINAL APPLY - DATABASE ME SAVE HOGA ===
  const handleApply = async (job) => {
    if (appliedJobs.includes(job.id)) {
      setShowToast("पहले से अप्लाई किया है");
      return;
    }
    
    // 1. Local me turant dikhao
    setAppliedJobs([...appliedJobs, job.id]);
    setShowToast(`✓ ${getJobName(job)} के लिए अप्लाई किया! DB me save ho raha...`);
    speakText(`${getJobName(job)} के लिए अप्लाई हो गया`);

    // 2. Backend PostgreSQL me bhejo
    try {
      const phone = prompt("Apna phone number daalo (10 digit) - jisse company call kare:", "9876543210");
      if(!phone) {
        setShowToast("Phone nahi diya, phir bhi local me save hua");
        return;
      }
      const res = await fetch(API + "/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: Number(job.id),
          worker_name: "SimpleJobs User",
          worker_phone: phone.replace(/\D/g,'').slice(-10),
          worker_city: job.city || job.location || "Delhi"
        })
      });
      const data = await res.json();
      if(res.ok){
        setShowToast(`✅ DB me save ho gaya! ID: ${data.application_id}`);
      } else {
        setShowToast(`DB Error: ${data.detail}`);
      }
    } catch (err) {
      setShowToast("❌ Internet/Backend error - backend so raha hoga, 30 sec baad try karo");
      console.error(err);
    }
  };

  // === CALL FIX ===
  const handleCall = (job) => {
    let num = (job.contact || "9876543210").toString().replace(/\D/g,'');
    num = num.slice(-10);
    if(num.length < 10){
      setShowToast("❌ Number galat hai: " + job.contact);
      return;
    }
    // Mobile pe direct call, laptop pe bhi try
    window.location.href = `tel:+91${num}`;
    setShowToast(`📞 ${num} pe call kar rahe...`);
  };

  const handleWhatsapp = (job) => {
    let num = (job.contact || "9876543210").toString().replace(/\D/g,'').slice(-10);
    const msg = encodeURIComponent(`Namaste, mujhe ${getJobName(job)} ke liye apply karna hai - SimpleJobs se`);
    window.open(`https://wa.me/91${num}?text=${msg}`, "_blank");
  };

  const handleJobClick = (job) => { setSelectedJob(job); setScreen("detail"); };

  const filteredJobs = allJobs.filter((job) => {
    if (!job) return false;
    const jobNameLower = getJobName(job).toLowerCase();
    const matchesSearch = jobNameLower.includes(searchText.toLowerCase()) || job.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = jobType === "all" || (job.types && job.types.includes(jobType));
    return matchesSearch && matchesType;
  });

  const savedJobsList = allJobs.filter(j => savedJobs.includes(j.id));

  if (!language) {
    return (
      <div className="language-screen">
        <div className="language-box">
          <div className="big-logo">💼</div>
          <h1>SimpleJobs</h1>
          <h2>पहले अपनी भाषा चुनें</h2>
          <p>Choose your language</p>
          <div className="language-list">
            {languages.map((item) => (
              <button className="language-card" key={item.code} onClick={() => setLanguage(item.code)}>
                <span className="language-icon">{item.icon}</span>
                <span className="language-name">{item.name}</span>
                <span className="language-sub">{item.sub}</span>
                <span className="language-arrow">→</span>
              </button>
            ))}
          </div>
          <div className="language-help">💡 8 Languages Available</div>
        </div>
      </div>
    );
  }

  if (screen === "detail" && selectedJob) {
    const isApplied = appliedJobs.includes(selectedJob.id);
    return (
      <div className="simple-page">
        <header className="simple-header">
          <button className="back-button" onClick={() => setScreen("categories")}>{t.back}</button>
          <div className="header-logo">💼 SimpleJobs</div>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐</button>
        </header>
        <main className="detail-page">
          <div className="detail-card">
            <div className="detail-icon">{selectedJob.icon}</div>
            <h1>{getJobName(selectedJob)}</h1>
            <p>🏢 {selectedJob.company}</p>
            <div className="detail-grid">
              <div>📍 {t.location}: {selectedJob.location}</div>
              <div>💰 {t.salary}: {selectedJob.salary}</div>
              <div>📍 {t.distance}: {selectedJob.distance}</div>
              <div>👷 {t.experience}: {selectedJob.experience}</div>
            </div>
            <div style={{marginTop:20}}>
              {!isApplied ? (
                <button className="big-apply-button" onClick={() => handleApply(selectedJob)}>✅ {t.apply} - DB me Save Hoga</button>
              ) : (
                <button className="big-apply-button applied">{t.applied}</button>
              )}
              <button className="big-call-button" onClick={() => handleCall(selectedJob)}>{t.call} - {selectedJob.contact}</button>
              <button className="big-whatsapp-button" onClick={() => handleWhatsapp(selectedJob)}>💬 WhatsApp Karo</button>
            </div>
            <p style={{marginTop:15, fontSize:14, color:'#666'}}>Apply karte hi ye job tumhare PostgreSQL database me save ho jayega - /applications pe dekho</p>
          </div>
        </main>
        {showToast && <div className="toast">{showToast}</div>}
      </div>
    );
  }

  if (screen === "categories") {
    const visibleJobs = showMore ? filteredJobs : filteredJobs.slice(0, 10);
    return (
      <div className="simple-page">
        <header className="simple-header">
          <button className="back-button" onClick={() => setScreen("home")}>{t.back}</button>
          <div className="header-logo">💼 SimpleJobs</div>
          <div style={{display:"flex", gap:"8px"}}>
            <button className="change-language" onClick={() => setScreen("saved")}>❤ {savedJobs.length}</button>
            <button className="change-language" onClick={() => setLanguage(null)}>🌐</button>
          </div>
        </header>
        <main className="category-page">
          <div className="page-title"><div className="big-page-icon">👷</div><h1>{t.categories}</h1></div>
          <div className="search-box"><span>🔎</span><input type="text" placeholder={t.search} value={searchText} onChange={(e) => setSearchText(e.target.value)} /></div>
          <div className="filter-buttons">
            <button className={jobType === "all" ? "active-filter" : ""} onClick={() => setJobType("all")}>{t.all}</button>
            <button className={jobType === "fulltime" ? "active-filter" : ""} onClick={() => setJobType("fulltime")}>🕐 {t.fulltime}</button>
          </div>
          <div className="big-category-grid">
            {visibleJobs.map((job) => (
              <div className="big-category-card" key={job.id} onClick={() => handleJobClick(job)}>
                <div className="big-category-icon">{job.icon}</div>
                <div className="category-main-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance} • 📞 {job.contact} {appliedJobs.includes(job.id) && "• ✓ Applied"}</small></div>
                <button className={savedJobs.includes(job.id) ? "save-button saved" : "save-button"} onClick={(e) => toggleSave(job.id, e)}>{savedJobs.includes(job.id) ? "❤" : "🤍"}</button>
              </div>
            ))}
          </div>
          {filteredJobs.length > 10 && <button className="more-jobs-button" onClick={() => setShowMore(!showMore)}>{showMore ? t.less : t.more}</button>}
        </main>
        {showToast && <div className="toast">{showToast}</div>}
      </div>
    );
  }

  if (screen === "saved") {
    return (
      <div className="simple-page">
        <header className="simple-header"><button className="back-button" onClick={() => setScreen("home")}>{t.back}</button><div className="header-logo">❤ {t.savedTitle}</div></header>
        <main className="category-page">
          {savedJobsList.length === 0 ? <div className="empty-box"><p>{t.noSaved}</p></div> : savedJobsList.map(job => (
            <div className="big-category-card" key={job.id} onClick={() => handleJobClick(job)}>
              <div className="big-category-icon">{job.icon}</div>
              <div className="category-main-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary} • 📞 {job.contact}</p></div>
            </div>
          ))}
        </main>
        {showToast && <div className="toast">{showToast}</div>}
      </div>
    );
  }

  return (
    <div className="simple-page">
      <header className="simple-header">
        <div className="header-logo"><span className="header-logo-icon">💼</span><span>SimpleJobs</span></div>
        <div className="header-actions">
          <button className="change-language" onClick={() => setScreen("saved")}>❤ {savedJobs.length}</button>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐</button>
        </div>
      </header>
      <main className="home-main">
        <div className="welcome"><div className="welcome-icon">👋</div><div><h2>{t.welcome}</h2></div></div>
        <section className="main-question">
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <button className="big-job-button" onClick={() => setScreen("categories")}><span>👷</span><span>{t.worker}</span><span>→</span></button>
        </section>
        <section className="quick-jobs">
          <div className="section-title"><h2>📍 {t.nearby}</h2><button className="see-all" onClick={() => setScreen("categories")}>सभी देखें →</button></div>
          <div className="job-grid">
            {allJobs.slice(0, 6).map((job) => (
              <div className="job-card" key={job.id} onClick={() => handleJobClick(job)}>
                <div className="job-icon">{job.icon}</div>
                <div className="job-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance} • 📞 {job.contact}</small></div>
                <div className="verified">✓</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {showToast && <div className="toast">{showToast}</div>}
    </div>
  );
}
export default App;
