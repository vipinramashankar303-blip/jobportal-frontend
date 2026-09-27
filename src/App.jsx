import { useState } from "react";
import "./App.css";

function App() {
  const [language, setLanguage] = useState(null);
  const [screen, setScreen] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobType, setJobType] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const languages = [
    { code: "hi", name: "हिन्दी", sub: "Hindi", icon: "🇮🇳" },
    { code: "mr", name: "मराठी", sub: "Marathi", icon: "🇮🇳" },
    { code: "en", name: "English", sub: "English", icon: "🌐" },
  ];

  const content = {
    hi: {
      welcome: "नमस्ते 👋",
      title: "आपको नौकरी चाहिए?",
      subtitle: "हम आपके लिए सही काम ढूंढने में मदद करेंगे।",
      worker: "मुझे नौकरी चाहिए",
      employer: "मुझे काम के लिए लोग चाहिए",
      listen: "आवाज़ में सुनें",
      categories: "आप कौन सा काम कर सकते हैं?",
      nearby: "मेरे पास की नौकरियां",
      safe: "सुरक्षित नौकरी खोजें",
      language: "भाषा बदलें",
      back: "← वापस",
      search: "काम खोजें...",
      all: "सभी",
      more: "और काम देखें",
      less: "कम काम देखें",
      fulltime: "Full Time",
      parttime: "Part Time",
      daily: "Daily Wage",
      temporary: "Temporary",
      permanent: "Permanent",
      save: "Save",
      saved: "Saved",
      verified: "Verified",
      report: "Report",
      nearbyText: "आपके आसपास",
      experience: "अनुभव",
      salary: "वेतन",
      distance: "दूरी",
      assist: "किसी की मदद से नौकरी खोजें",
    },
    mr: {
      welcome: "नमस्कार 👋",
      title: "तुम्हाला नोकरी हवी आहे?",
      subtitle: "तुमच्यासाठी योग्य काम शोधण्यात आम्ही मदत करू.",
      worker: "मला नोकरी हवी आहे",
      employer: "मला कामासाठी लोक हवे आहेत",
      listen: "आवाजात ऐका",
      categories: "तुम्ही कोणते काम करू शकता?",
      nearby: "माझ्या जवळच्या नोकऱ्या",
      safe: "सुरक्षित नोकरी शोधा",
      language: "भाषा बदला",
      back: "← मागे",
      search: "काम शोधा...",
      all: "सर्व",
      more: "आणखी कामे पहा",
      less: "कमी कामे पहा",
      fulltime: "Full Time",
      parttime: "Part Time",
      daily: "Daily Wage",
      temporary: "Temporary",
      permanent: "Permanent",
      save: "Save",
      saved: "Saved",
      verified: "Verified",
      report: "Report",
      nearbyText: "तुमच्या जवळ",
      experience: "अनुभव",
      salary: "पगार",
      distance: "अंतर",
      assist: "कुणाच्या मदतीने नोकरी शोधा",
    },
    en: {
      welcome: "Hello 👋",
      title: "Looking for a job?",
      subtitle: "We will help you find work that suits you.",
      worker: "I need a job",
      employer: "I need workers",
      listen: "Listen",
      categories: "What work can you do?",
      nearby: "Jobs near me",
      safe: "Find jobs safely",
      language: "Change language",
      back: "← Back",
      search: "Search work...",
      all: "All",
      more: "See more jobs",
      less: "See fewer jobs",
      fulltime: "Full Time",
      parttime: "Part Time",
      daily: "Daily Wage",
      temporary: "Temporary",
      permanent: "Permanent",
      save: "Save",
      saved: "Saved",
      verified: "Verified",
      report: "Report",
      nearbyText: "Near you",
      experience: "Experience",
      salary: "Salary",
      distance: "Distance",
      assist: "Find a job with someone's help",
    },
  };

  const t = content[language] || content["hi"];

  const jobs = [
    { id: 1, icon: "🚗", name: "driver", salary: "₹15,000 - ₹20,000", experience: "0-2 years", distance: "2.1 km", types: ["fulltime", "parttime"] },
    { id: 2, icon: "🍳", name: "cook", salary: "₹12,000 - ₹18,000", experience: "0-2 years", distance: "1.8 km", types: ["fulltime", "parttime"] },
    { id: 3, icon: "🧹", name: "cleaner", salary: "₹10,000 - ₹15,000", experience: "No experience", distance: "1.5 km", types: ["fulltime", "parttime"] },
    { id: 4, icon: "📦", name: "delivery", salary: "₹14,000 - ₹22,000", experience: "0-1 year", distance: "2.5 km", types: ["fulltime", "parttime"] },
    { id: 5, icon: "🛡", name: "security", salary: "₹13,000 - ₹18,000", experience: "0-2 years", distance: "3.2 km", types: ["fulltime", "permanent"] },
    { id: 6, icon: "⚡", name: "electrician", salary: "₹18,000 - ₹25,000", experience: "1+ year", distance: "4.1 km", types: ["fulltime", "temporary"] },
    { id: 7, icon: "🔧", name: "plumber", salary: "₹16,000 - ₹24,000", experience: "1+ year", distance: "3.7 km", types: ["fulltime", "temporary"] },
    { id: 8, icon: "🔨", name: "mechanic", salary: "₹18,000 - ₹26,000", experience: "1+ year", distance: "4.5 km", types: ["fulltime", "permanent"] },
    { id: 9, icon: "🎨", name: "painter", salary: "₹15,000 - ₹22,000", experience: "0-2 years", distance: "3.9 km", types: ["temporary", "daily"] },
    { id: 10, icon: "🧵", name: "tailor", salary: "₹12,000 - ₹20,000", experience: "1+ year", distance: "2.8 km", types: ["fulltime", "parttime"] },
    { id: 11, icon: "🏗", name: "construction", salary: "₹15,000 - ₹22,000", experience: "No experience", distance: "5.2 km", types: ["daily", "temporary"] },
    { id: 12, icon: "🔩", name: "welder", salary: "₹18,000 - ₹27,000", experience: "1+ year", distance: "5.5 km", types: ["fulltime", "permanent"] },
    { id: 13, icon: "🪚", name: "carpenter", salary: "₹17,000 - ₹25,000", experience: "1+ year", distance: "4.8 km", types: ["fulltime", "temporary"] },
    { id: 14, icon: "🌾", name: "farm", salary: "₹12,000 - ₹18,000", experience: "No experience", distance: "6.2 km", types: ["daily", "temporary"] },
    { id: 15, icon: "🏭", name: "factory", salary: "₹14,000 - ₹21,000", experience: "0-2 years", distance: "5.1 km", types: ["fulltime", "permanent"] },
    { id: 16, icon: "🏪", name: "shop", salary: "₹11,000 - ₹17,000", experience: "No experience", distance: "1.9 km", types: ["fulltime", "parttime"] },
    { id: 17, icon: "👨🍳", name: "kitchen", salary: "₹11,000 - ₹16,000", experience: "No experience", distance: "2.4 km", types: ["fulltime", "parttime"] },
    { id: 18, icon: "💼", name: "office", salary: "₹12,000 - ₹18,000", experience: "0-1 year", distance: "2.9 km", types: ["fulltime", "permanent"] },
    { id: 19, icon: "📦", name: "loading", salary: "₹13,000 - ₹19,000", experience: "No experience", distance: "3.5 km", types: ["daily", "fulltime"] },
    { id: 20, icon: "🛠", name: "repair", salary: "₹15,000 - ₹23,000", experience: "1+ year", distance: "3.8 km", types: ["fulltime", "parttime"] },
  ];

  const jobNames = {
    hi: { driver: "ड्राइवर", cook: "खाना बनाना", cleaner: "सफाई", delivery: "डिलीवरी", security: "सिक्योरिटी गार्ड", electrician: "इलेक्ट्रिशियन", plumber: "प्लंबर", mechanic: "मैकेनिक", painter: "पेंटर", tailor: "टेलर", construction: "निर्माण काम", welder: "वेल्डर", carpenter: "बढ़ई", farm: "खेती का काम", factory: "फैक्ट्री काम", shop: "दुकान में काम", kitchen: "किचन हेल्पर", office: "ऑफिस हेल्पर", loading: "लोडिंग / अनलोडिंग", repair: "रिपेयरिंग" },
    mr: { driver: "ड्रायव्हर", cook: "स्वयंपाक", cleaner: "सफाई", delivery: "डिलिव्हरी", security: "सिक्युरिटी गार्ड", electrician: "इलेक्ट्रिशियन", plumber: "प्लंबर", mechanic: "मेकॅनिक", painter: "पेंटर", tailor: "शिंपी", construction: "बांधकाम काम", welder: "वेल्डर", carpenter: "सुतार", farm: "शेतीचे काम", factory: "फॅक्टरी काम", shop: "दुकानात काम", kitchen: "किचन हेल्पर", office: "ऑफिस हेल्पर", loading: "लोडिंग / अनलोडिंग", repair: "दुरुस्ती" },
    en: { driver: "Driver", cook: "Cook", cleaner: "Cleaner", delivery: "Delivery", security: "Security Guard", electrician: "Electrician", plumber: "Plumber", mechanic: "Mechanic", painter: "Painter", tailor: "Tailor", construction: "Construction Worker", welder: "Welder", carpenter: "Carpenter", farm: "Farm Worker", factory: "Factory Worker", shop: "Shop Worker", kitchen: "Kitchen Helper", office: "Office Helper", loading: "Loading / Unloading", repair: "Repair Worker" },
  };

  // FIXED - This was crashing before
  const getJobName = (job) => {
    if (!job || !job.name) return "Job";
    if (!language) return job.name;
    return jobNames[language]?.[job.name] || jobNames["en"]?.[job.name] || job.name;
  };

  const speakText = () => {
    const message =
      language === "hi"
        ? "नमस्ते। आपको नौकरी चाहिए तो नीचे मुझे नौकरी चाहिए बटन दबाएं।"
        : language === "mr"
        ? "नमस्कार। तुम्हाला नोकरी हवी असेल तर मला नोकरी हवी आहे हे बटन दाबा."
        : "Hello. If you need a job, press the I need a job button.";
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert("आपके browser में voice search उपलब्ध नहीं है।"); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
    recognition.start();
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearchText(text);
    };
  };

  const toggleSave = (id) => {
    if (savedJobs.includes(id)) setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    else setSavedJobs([...savedJobs, id]);
  };

  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    const jobNameLower = getJobName(job).toLowerCase();
    const matchesSearch = jobNameLower.includes(searchText.toLowerCase()) || job.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = jobType === "all" || job.types.includes(jobType);
    return matchesSearch && matchesType;
  });

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
          <div className="language-help">💡 बाद में आप भाषा बदल सकते हैं</div>
        </div>
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
          <button className="change-language" onClick={() => setLanguage(null)}>🌐 {t.language}</button>
        </header>
        <main className="category-page">
          <div className="page-title">
            <div className="big-page-icon">👷</div>
            <h1>{t.categories}</h1>
            <p>जिस काम का अनुभव है, उसे चुनें</p>
          </div>
          <div className="search-box">
            <span>🔎</span>
            <input type="text" placeholder={t.search} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <button onClick={startVoiceSearch}>🎤</button>
          </div>
          <div className="filter-buttons">
            <button className={jobType === "all" ? "active-filter" : ""} onClick={() => setJobType("all")}>{t.all}</button>
            <button className={jobType === "fulltime" ? "active-filter" : ""} onClick={() => setJobType("fulltime")}>🕐 {t.fulltime}</button>
            <button className={jobType === "parttime" ? "active-filter" : ""} onClick={() => setJobType("parttime")}>🕐 {t.parttime}</button>
            <button className={jobType === "daily" ? "active-filter" : ""} onClick={() => setJobType("daily")}>💵 {t.daily}</button>
          </div>
          <div className="big-category-grid">
            {visibleJobs.map((job) => (
              <div className="big-category-card" key={job.id}>
                <div className="big-category-icon">{job.icon}</div>
                <div className="category-main-info">
                  <h3>{getJobName(job)}</h3>
                  <p>💰 {job.salary}</p>
                  <small>📍 {job.distance} &nbsp; • &nbsp; 👷 {job.experience}</small>
                </div>
                <button className={savedJobs.includes(job.id) ? "save-button saved" : "save-button"} onClick={() => toggleSave(job.id)}>
                  {savedJobs.includes(job.id) ? "❤" : "🤍"}
                </button>
              </div>
            ))}
          </div>
          {filteredJobs.length > 10 && (
            <button className="more-jobs-button" onClick={() => setShowMore(!showMore)}>{showMore ? t.less : t.more}</button>
          )}
          <div className="helper-box">
            <span>👨👩👦</span>
            <div><strong>{t.assist}</strong><p>परिवार या भरोसेमंद व्यक्ति आपकी मदद कर सकता है।</p></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="simple-page">
      <header className="simple-header">
        <div className="header-logo"><span className="header-logo-icon">💼</span><span>SimpleJobs</span></div>
        <div className="header-actions">
          <button className="listen-button" onClick={speakText}>🔊 {t.listen}</button>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐 {language === "hi" ? "हिन्दी" : language === "mr" ? "मराठी" : "English"}</button>
        </div>
      </header>
      <main className="home-main">
        <div className="welcome"><div className="welcome-icon">👋</div><div><h2>{t.welcome}</h2><p>SimpleJobs में आपका स्वागत है</p></div></div>
        <section className="main-question">
          <div className="question-icon">🔎</div>
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <button className="big-job-button" onClick={() => setScreen("categories")}><span className="button-icon">👷</span><span>{t.worker}</span><span className="button-arrow">→</span></button>
          <button className="employer-button"><span className="employer-icon">🏢</span><span>{t.employer}</span><span>→</span></button>
          <button className="voice-help" onClick={speakText}>🔊 {t.listen}</button>
        </section>
        <section className="quick-jobs">
          <div className="section-title"><h2>📍 {t.nearby}</h2><p>आपके आसपास मिलने वाले काम</p></div>
          <div className="job-grid">
            {jobs.slice(0, 6).map((job) => (
              <div className="job-card" key={job.id}>
                <div className="job-icon">{job.icon}</div>
                <div className="job-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance}</small></div>
                <div className="verified">✓</div>
              </div>
            ))}
          </div>
        </section>
        <section className="features-section">
          <h2>हमारे लिए क्या जरूरी है?</h2>
          <div className="features-grid">
            <div>🔊<strong>आवाज़ की मदद</strong><p>पढ़ने में परेशानी हो तो सुन सकते हैं</p></div>
            <div>📍<strong>पास की नौकरी</strong><p>अपने आसपास का काम खोजें</p></div>
            <div>💰<strong>साफ वेतन</strong><p>वेतन की जानकारी पहले देखें</p></div>
            <div>🛡<strong>सुरक्षित नौकरी</strong><p>संदिग्ध नौकरी को Report करें</p></div>
            <div>🌐<strong>अपनी भाषा</strong><p>अपनी सुविधा की भाषा चुनें</p></div>
            <div>👨👩👦<strong>मदद से खोजें</strong><p>भरोसेमंद व्यक्ति मदद कर सकता है</p></div>
          </div>
        </section>
        <section className="safe-box"><div className="safe-icon">🛡</div><div><h2>{t.safe}</h2><p>नौकरी पाने के लिए किसी को पैसे न दें। नौकरी की जानकारी पहले अच्छी तरह देखें।</p></div></section>
      </main>
    </div>
  );
}

export default App;
