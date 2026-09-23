
import { useState, useEffect } from "react";
import "./App.css";

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

  // Load saved from localStorage
  useEffect(() => {
    const s = localStorage.getItem("savedJobs");
    if(s) setSavedJobs(JSON.parse(s));
    const a = localStorage.getItem("appliedJobs");
    if(a) setAppliedJobs(JSON.parse(a));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);
  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  useEffect(() => {
    if(showToast){
      const t = setTimeout(()=>setShowToast(""), 2500);
      return ()=>clearTimeout(t);
    }
  }, [showToast]);

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
    hi: {
      welcome: "नमस्ते 👋", title: "आपको नौकरी चाहिए?", subtitle: "हम आपके लिए सही काम ढूंढने में मदद करेंगे।",
      worker: "मुझे नौकरी चाहिए", employer: "मुझे काम के लिए लोग चाहिए", listen: "आवाज़ में सुनें",
      categories: "आप कौन सा काम कर सकते हैं?", nearby: "मेरे पास की नौकरियां", safe: "सुरक्षित नौकरी खोजें",
      language: "भाषा बदलें", back: "← वापस", search: "काम खोजें...", all: "सभी", more: "और काम देखें", less: "कम काम देखें",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "आपके आसपास", experience: "अनुभव", salary: "वेतन", distance: "दूरी", assist: "किसी की मदद से नौकरी खोजें",
      jobDetail: "नौकरी की जानकारी", apply: "अप्लाई करें", applied: "अप्लाई हो गया ✓", call: "📞 कॉल करें", location: "जगह", savedTitle: "सेव की हुई नौकरियां", noSaved: "आपने कोई नौकरी सेव नहीं की", employerTitle: "कर्मचारी चाहिए?", employerDesc: "अपनी कंपनी के लिए भरोसेमंद लोग ढूंढें", postJob: "नौकरी पोस्ट करें", comingSoon: "जल्द आ रहा है"
    },
    mr: {
      welcome: "नमस्कार 👋", title: "तुम्हाला नोकरी हवी आहे?", subtitle: "तुमच्यासाठी योग्य काम शोधण्यात आम्ही मदत करू.",
      worker: "मला नोकरी हवी आहे", employer: "मला कामासाठी लोक हवे आहेत", listen: "आवाजात ऐका",
      categories: "तुम्ही कोणते काम करू शकता?", nearby: "माझ्या जवळच्या नोकऱ्या", safe: "सुरक्षित नोकरी शोधा",
      language: "भाषा बदला", back: "← मागे", search: "काम शोधा...", all: "सर्व", more: "आणखी कामे पहा", less: "कमी कामे पहा",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "तुमच्या जवळ", experience: "अनुभव", salary: "पगार", distance: "अंतर", assist: "कुणाच्या मदतीने नोकरी शोधा",
      jobDetail: "नोकरीची माहिती", apply: "अर्ज करा", applied: "अर्ज झाला ✓", call: "📞 कॉल करा", location: "ठिकाण", savedTitle: "सेव्ह केलेल्या नोकऱ्या", noSaved: "तुम्ही कोणतीही नोकरी सेव्ह केली नाही", employerTitle: "कामगार हवेत?", employerDesc: "तुमच्या कंपनीसाठी विश्वसनीय लोक शोधा", postJob: "नोकरी पोस्ट करा", comingSoon: "लवकरच येत आहे"
    },
    en: {
      welcome: "Hello 👋", title: "Looking for a job?", subtitle: "We will help you find work that suits you.",
      worker: "I need a job", employer: "I need workers", listen: "Listen",
      categories: "What work can you do?", nearby: "Jobs near me", safe: "Find jobs safely",
      language: "Change language", back: "← Back", search: "Search work...", all: "All", more: "See more jobs", less: "See fewer jobs",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "Near you", experience: "Experience", salary: "Salary", distance: "Distance", assist: "Find a job with someone's help",
      jobDetail: "Job Details", apply: "Apply Now", applied: "Applied ✓", call: "📞 Call", location: "Location", savedTitle: "Saved Jobs", noSaved: "No saved jobs yet", employerTitle: "Need workers?", employerDesc: "Find trusted people for your company", postJob: "Post a Job", comingSoon: "Coming Soon"
    },
    gu: {
      welcome: "નમસ્તે 👋", title: "તમને નોકરી જોઈએ છે?", subtitle: "અમે તમારા માટે યોગ્ય કામ શોધવામાં મદદ કરીશું.",
      worker: "મને નોકરી જોઈએ છે", employer: "મને કામદારો જોઈએ છે", listen: "સાંભળો",
      categories: "તમે કયું કામ કરી શકો છો?", nearby: "મારી નજીકની નોકરીઓ", safe: "સુરક્ષિત નોકરી શોધો",
      language: "ભાષા બદલો", back: "← પાછા", search: "કામ શોધો...", all: "બધા", more: "વધુ જુઓ", less: "ઓછું જુઓ",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "તમારી નજીક", experience: "અનુભવ", salary: "પગાર", distance: "અંતર", assist: "કોઈની મદદથી નોકરી શોધો",
      jobDetail: "નોકરીની વિગતો", apply: "અરજી કરો", applied: "અરજી થઈ ✓", call: "📞 કૉલ કરો", location: "સ્થળ", savedTitle: "સેવ કરેલી નોકરીઓ", noSaved: "કોઈ સેવ કરેલી નોકરી નથી", employerTitle: "કામદારો જોઈએ છે?", employerDesc: "તમારી કંપની માટે વિશ્વાસપાત્ર લોકો શોધો", postJob: "નોકરી પોસ્ટ કરો", comingSoon: "ટૂંક સમયમાં"
    },
    bn: {
      welcome: "নমস্কার 👋", title: "আপনার কি চাকরি দরকার?", subtitle: "আমরা আপনাকে সঠিক কাজ খুঁজতে সাহায্য করব।",
      worker: "আমার চাকরি দরকার", employer: "আমার কর্মী দরকার", listen: "শুনুন",
      categories: "আপনি কোন কাজ করতে পারেন?", nearby: "আমার কাছের চাকরি", safe: "নিরাপদ চাকরি খুঁজুন",
      language: "ভাষা বদলান", back: "← ফিরে যান", search: "কাজ খুঁজুন...", all: "সব", more: "আরও দেখুন", less: "কম দেখুন",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "আপনার কাছে", experience: "অভিজ্ঞতা", salary: "বেতন", distance: "দূরত্ব", assist: "কারো সাহায্যে চাকরি খুঁজুন",
      jobDetail: "চাকরির বিবরণ", apply: "আবেদন করুন", applied: "আবেদন হয়েছে ✓", call: "📞 কল করুন", location: "অবস্থান", savedTitle: "সেভ করা চাকরি", noSaved: "কোনো সেভ করা চাকরি নেই", employerTitle: "কর্মী দরকার?", employerDesc: "আপনার কোম্পানির জন্য বিশ্বস্ত লোক খুঁজুন", postJob: "চাকরি পোস্ট করুন", comingSoon: "শীঘ্রই আসছে"
    },
    ta: {
      welcome: "வணக்கம் 👋", title: "வேலை தேவையா?", subtitle: "உங்களுக்கு பொருத்தமான வேலையை கண்டுபிடிக்க உதவுவோம்.",
      worker: "எனக்கு வேலை வேண்டும்", employer: "எனக்கு ஆட்கள் வேண்டும்", listen: "கேளுங்கள்",
      categories: "நீங்கள் என்ன வேலை செய்ய முடியும்?", nearby: "எனக்கு அருகிலுள்ள வேலைகள்", safe: "பாதுகாப்பான வேலை தேடுங்கள்",
      language: "மொழியை மாற்று", back: "← பின்", search: "வேலை தேடு...", all: "அனைத்தும்", more: "மேலும் பார்க்க", less: "குறைவாக பார்க்க",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "உங்கள் அருகில்", experience: "அனுபவம்", salary: "சம்பளம்", distance: "தூரம்", assist: "யாரோ உதவியுடன் வேலை தேடுங்கள்",
      jobDetail: "வேலை விவரங்கள்", apply: "விண்ணப்பிக்கவும்", applied: "விண்ணப்பித்தது ✓", call: "📞 அழைக்கவும்", location: "இடம்", savedTitle: "சேமித்த வேலைகள்", noSaved: "சேமித்த வேலைகள் இல்லை", employerTitle: "தொழிலாளர்கள் தேவையா?", employerDesc: "உங்கள் நிறுவனத்திற்கு நம்பகமான நபர்களைக் கண்டறியவும்", postJob: "வேலை பதிவு", comingSoon: "விரைவில்"
    },
    te: {
      welcome: "నమస్తే 👋", title: "మీకు ఉద్యోగం కావాలా?", subtitle: "మీకు సరైన పని కనుగొనడంలో మేము సహాయం చేస్తాము.",
      worker: "నాకు ఉద్యోగం కావాలి", employer: "నాకు కార్మికులు కావాలి", listen: "వినండి",
      categories: "మీరు ఏ పని చేయగలరు?", nearby: "నా దగ్గర ఉద్యోగాలు", safe: "సురక్షిత ఉద్యోగం వెతకండి",
      language: "భాష మార్చండి", back: "← వెనుకకు", search: "పని వెతకండి...", all: "అన్నీ", more: "మరిన్ని చూడండి", less: "తక్కువ చూడండి",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "మీ దగ్గర", experience: "అనుభవం", salary: "జీతం", distance: "దూరం", assist: "ఎవరి సహాయంతో ఉద్యోగం వెతకండి",
      jobDetail: "ఉద్యోగ వివరాలు", apply: "దరఖాస్తు చేయండి", applied: "దరఖాస్తు చేసారు ✓", call: "📞 కాల్ చేయండి", location: "ప్రదేశం", savedTitle: "సేవ్ చేసిన ఉద్యోగాలు", noSaved: "సేవ్ చేసిన ఉద్యోగాలు లేవు", employerTitle: "కార్మికులు కావాలా?", employerDesc: "మీ కంపెనీ కోసం నమ్మకమైన వ్యక్తులను కనుగొనండి", postJob: "ఉద్యోగం పోస్ట్ చేయండి", comingSoon: "త్వరలో"
    },
    kn: {
      welcome: "ನಮಸ್ತೆ 👋", title: "ನಿಮಗೆ ಕೆಲಸ ಬೇಕೇ?", subtitle: "ನಿಮಗೆ ಸೂಕ್ತವಾದ ಕೆಲಸ ಹುಡುಕಲು ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
      worker: "ನನಗೆ ಕೆಲಸ ಬೇಕು", employer: "ನನಗೆ ಕಾರ್ಮಿಕರು ಬೇಕು", listen: "ಕೇಳಿ",
      categories: "ನೀವು ಯಾವ ಕೆಲಸ ಮಾಡಬಹುದು?", nearby: "ನನ್ನ ಹತ್ತಿರದ ಉದ್ಯೋಗಗಳು", safe: "ಸುರಕ್ಷಿತ ಉದ್ಯೋಗ ಹುಡುಕಿ",
      language: "ಭಾಷೆ ಬದಲಾಯಿಸಿ", back: "← ಹಿಂದೆ", search: "ಕೆಲಸ ಹುಡುಕಿ...", all: "ಎಲ್ಲಾ", more: "ಇನ್ನಷ್ಟು ನೋಡಿ", less: "ಕಡಿಮೆ ನೋಡಿ",
      fulltime: "Full Time", parttime: "Part Time", daily: "Daily Wage", temporary: "Temporary", permanent: "Permanent",
      save: "Save", saved: "Saved", verified: "Verified", report: "Report", nearbyText: "ನಿಮ್ಮ ಹತ್ತಿರ", experience: "ಅನುಭವ", salary: "ಸಂಬಳ", distance: "ದೂರ", assist: "ಯಾರ ಸಹಾಯದಿಂದ ಕೆಲಸ ಹುಡುಕಿ",
      jobDetail: "ಕೆಲಸದ ವಿವರಗಳು", apply: "ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", applied: "ಅರ್ಜಿ ಸಲ್ಲಿಸಲಾಗಿದೆ ✓", call: "📞 ಕರೆ ಮಾಡಿ", location: "ಸ್ಥಳ", savedTitle: "ಉಳಿಸಿದ ಉದ್ಯೋಗಗಳು", noSaved: "ಯಾವುದೇ ಉಳಿಸಿದ ಉದ್ಯೋಗಗಳಿಲ್ಲ", employerTitle: "ಕಾರ್ಮಿಕರು ಬೇಕೇ?", employerDesc: "ನಿಮ್ಮ ಕಂಪನಿಗೆ ವಿಶ್ವಾಸಾರ್ಹ ಜನರನ್ನು ಹುಡುಕಿ", postJob: "ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಮಾಡಿ", comingSoon: "ಶೀಘ್ರದಲ್ಲೇ"
    },
  };

  const t = content[language] || content["hi"];

  const jobs = [
    { id: 1, icon: "🚗", name: "driver", salary: "₹15,000 - ₹20,000", experience: "0-2 years", distance: "2.1 km", types: ["fulltime", "parttime"], location: "Mumbai, Andheri", company: "City Cabs", desc: "Car driving, license compulsory. 8 hours duty." },
    { id: 2, icon: "🍳", name: "cook", salary: "₹12,000 - ₹18,000", experience: "0-2 years", distance: "1.8 km", types: ["fulltime", "parttime"], location: "Mumbai, Bandra", company: "Hotel Spice", desc: "Veg and non-veg cooking. Morning shift." },
    { id: 3, icon: "🧹", name: "cleaner", salary: "₹10,000 - ₹15,000", experience: "No experience", distance: "1.5 km", types: ["fulltime", "parttime"], location: "Mumbai, Dadar", company: "CleanPro", desc: "Office cleaning, 6 days working." },
    { id: 4, icon: "📦", name: "delivery", salary: "₹14,000 - ₹22,000", experience: "0-1 year", distance: "2.5 km", types: ["fulltime", "parttime"], location: "Mumbai, Kurla", company: "Quick Delivery", desc: "Bike compulsory, petrol allowance." },
    { id: 5, icon: "🛡", name: "security", salary: "₹13,000 - ₹18,000", experience: "0-2 years", distance: "3.2 km", types: ["fulltime", "permanent"], location: "Mumbai, Powai", company: "Secure India", desc: "12 hour shift, night/day both." },
    { id: 6, icon: "⚡", name: "electrician", salary: "₹18,000 - ₹25,000", experience: "1+ year", distance: "4.1 km", types: ["fulltime", "temporary"], location: "Mumbai, Malad", company: "ElectroFix", desc: "ITI compulsory." },
    { id: 7, icon: "🔧", name: "plumber", salary: "₹16,000 - ₹24,000", experience: "1+ year", distance: "3.7 km", types: ["fulltime", "temporary"], location: "Mumbai, Borivali", company: "WaterWorks", desc: "Residential work." },
    { id: 8, icon: "🔨", name: "mechanic", salary: "₹18,000 - ₹26,000", experience: "1+ year", distance: "4.5 km", types: ["fulltime", "permanent"], location: "Thane", company: "AutoCare", desc: "Two wheeler mechanic." },
    { id: 9, icon: "🎨", name: "painter", salary: "₹15,000 - ₹22,000", experience: "0-2 years", distance: "3.9 km", types: ["temporary", "daily"], location: "Mumbai, Ghatkopar", company: "ColorWall", desc: "Wall painting work." },
    { id: 10, icon: "🧵", name: "tailor", salary: "₹12,000 - ₹20,000", experience: "1+ year", distance: "2.8 km", types: ["fulltime", "parttime"], location: "Mumbai, Sion", company: "StitchWell", desc: "Ladies and gents tailor." },
    { id: 11, icon: "🏗", name: "construction", salary: "₹15,000 - ₹22,000", experience: "No experience", distance: "5.2 km", types: ["daily", "temporary"], location: "Navi Mumbai", company: "BuildWell", desc: "Site work, daily payment." },
    { id: 12, icon: "🔩", name: "welder", salary: "₹18,000 - ₹27,000", experience: "1+ year", distance: "5.5 km", types: ["fulltime", "permanent"], location: "Mumbai, Andheri MIDC", company: "SteelFab", desc: "Arc welding." },
    { id: 13, icon: "🪚", name: "carpenter", salary: "₹17,000 - ₹25,000", experience: "1+ year", distance: "4.8 km", types: ["fulltime", "temporary"], location: "Mumbai, Jogeshwari", company: "WoodCraft", desc: "Furniture work." },
    { id: 14, icon: "🌾", name: "farm", salary: "₹12,000 - ₹18,000", experience: "No experience", distance: "6.2 km", types: ["daily", "temporary"], location: "Palghar", company: "Green Farm", desc: "Farm work, food provided." },
    { id: 15, icon: "🏭", name: "factory", salary: "₹14,000 - ₹21,000", experience: "0-2 years", distance: "5.1 km", types: ["fulltime", "permanent"], location: "Bhiwandi", company: "Packwell", desc: "Packing work, 8 hours." },
    { id: 16, icon: "🏪", name: "shop", salary: "₹11,000 - ₹17,000", experience: "No experience", distance: "1.9 km", types: ["fulltime", "parttime"], location: "Mumbai, Dadar", company: "Daily Needs", desc: "Shop helper." },
    { id: 17, icon: "👨🍳", name: "kitchen", salary: "₹11,000 - ₹16,000", experience: "No experience", distance: "2.4 km", types: ["fulltime", "parttime"], location: "Mumbai, Lower Parel", company: "Food Court", desc: "Cutting, cleaning help." },
    { id: 18, icon: "💼", name: "office", salary: "₹12,000 - ₹18,000", experience: "0-1 year", distance: "2.9 km", types: ["fulltime", "permanent"], location: "Mumbai, Fort", company: "Office Hub", desc: "Peon work, documents." },
    { id: 19, icon: "📦", name: "loading", salary: "₹13,000 - ₹19,000", experience: "No experience", distance: "3.5 km", types: ["daily", "fulltime"], location: "Mumbai, Sewri", company: "Transport Co", desc: "Loading unloading." },
    { id: 20, icon: "🛠", name: "repair", salary: "₹15,000 - ₹23,000", experience: "1+ year", distance: "3.8 km", types: ["fulltime", "parttime"], location: "Mumbai, Kurla", company: "FixIt", desc: "Mobile and appliance repair." },
  ];

  const jobNames = {
    hi: { driver: "ड्राइवर", cook: "खाना बनाना", cleaner: "सफाई", delivery: "डिलीवरी", security: "सिक्योरिटी गार्ड", electrician: "इलेक्ट्रिशियन", plumber: "प्लंबर", mechanic: "मैकेनिक", painter: "पेंटर", tailor: "टेलर", construction: "निर्माण काम", welder: "वेल्डर", carpenter: "बढ़ई", farm: "खेती का काम", factory: "फैक्ट्री काम", shop: "दुकान में काम", kitchen: "किचन हेल्पर", office: "ऑफिस हेल्पर", loading: "लोडिंग / अनलोडिंग", repair: "रिपेयरिंग" },
    mr: { driver: "ड्रायव्हर", cook: "स्वयंपाक", cleaner: "सफाई", delivery: "डिलिव्हरी", security: "सिक्युरिटी गार्ड", electrician: "इलेक्ट्रिशियन", plumber: "प्लंबर", mechanic: "मेकॅनिक", painter: "पेंटर", tailor: "शिंपी", construction: "बांधकाम काम", welder: "वेल्डर", carpenter: "सुतार", farm: "शेतीचे काम", factory: "फॅक्टरी काम", shop: "दुकानात काम", kitchen: "किचन हेल्पर", office: "ऑफिस हेल्पर", loading: "लोडिंग / अनलोडिंग", repair: "दुरुस्ती" },
    en: { driver: "Driver", cook: "Cook", cleaner: "Cleaner", delivery: "Delivery", security: "Security Guard", electrician: "Electrician", plumber: "Plumber", mechanic: "Mechanic", painter: "Painter", tailor: "Tailor", construction: "Construction Worker", welder: "Welder", carpenter: "Carpenter", farm: "Farm Worker", factory: "Factory Worker", shop: "Shop Worker", kitchen: "Kitchen Helper", office: "Office Helper", loading: "Loading / Unloading", repair: "Repair Worker" },
    gu: { driver: "ડ્રાઈવર", cook: "રસોઈયા", cleaner: "સફાઈ", delivery: "ડિલિવરી", security: "સિક્યુરિટી ગાર્ડ", electrician: "ઇલેક્ટ્રિશિયન", plumber: "પ્લમ્બર", mechanic: "મિકેનિક", painter: "પેઇન્ટર", tailor: "દરજી", construction: "બાંધકામ", welder: "વેલ્ડર", carpenter: "સુથાર", farm: "ખેતી કામ", factory: "ફેક્ટરી કામ", shop: "દુકાન કામ", kitchen: "કિચન હેલ્પર", office: "ઓફિસ હેલ્પર", loading: "લોડિંગ", repair: "રિપેર" },
    bn: { driver: "ড্রাইভার", cook: "রান্না", cleaner: "পরিচ্ছন্নতা", delivery: "ডেলিভারি", security: "নিরাপত্তা প্রহরী", electrician: "ইলেকট্রিশিয়ান", plumber: "প্লাম্বার", mechanic: "মেকানিক", painter: "পেইন্টার", tailor: "দর্জি", construction: "নির্মাণ কাজ", welder: "ওয়েল্ডার", carpenter: "ছুতার", farm: "খামার কাজ", factory: "কারখানা", shop: "দোকান", kitchen: "রান্নাঘর সহায়ক", office: "অফিস সহায়ক", loading: "লোডিং", repair: "মেরামত" },
    ta: { driver: "ஓட்டுநர்", cook: "சமையல்", cleaner: "தூய்மை", delivery: "டெலிவரி", security: "பாதுகாப்பு", electrician: "எலக்ட்ரீஷியன்", plumber: "பிளம்பர்", mechanic: "மெக்கானிக்", painter: "பெயிண்டர்", tailor: "தையல்காரர்", construction: "கட்டுமான", welder: "வெல்டர்", carpenter: "தச்சர்", farm: "விவசாய", factory: "தொழிற்சாலை", shop: "கடை", kitchen: "சமையல் உதவி", office: "அலுவலக உதவி", loading: "லோடிங்", repair: "பழுது" },
    te: { driver: "డ్రైవర్", cook: "వంట", cleaner: "క్లీనర్", delivery: "డెలివరీ", security: "సెక్యూరిటీ", electrician: "ఎలక్ట్రీషియన్", plumber: "ప్లంబర్", mechanic: "మెకానిక్", painter: "పెయింటర్", tailor: "టైలర్", construction: "నిర్మాణం", welder: "వెల్డర్", carpenter: "వడ్రంగి", farm: "వ్యవసాయం", factory: "ఫ్యాక్టరీ", shop: "షాపు", kitchen: "కిచెన్ హెల్పర్", office: "ఆఫీస్ హెల్పర్", loading: "లోడింగ్", repair: "రిపేర్" },
    kn: { driver: "ಚಾಲಕ", cook: "ಅಡುಗೆ", cleaner: "ಸ್ವಚ್ಛತೆ", delivery: "ವಿತರಣೆ", security: "ಭದ್ರತೆ", electrician: "ಎಲೆಕ್ಟ್ರಿಷಿಯನ್", plumber: "ಪ್ಲಂಬರ್", mechanic: "ಮೆಕ್ಯಾನಿಕ್", painter: "ಪೇಂಟರ್", tailor: "ಟೈಲರ್", construction: "ನಿರ್ಮಾಣ", welder: "ವೆಲ್ಡರ್", carpenter: "ಬಡಗಿ", farm: "ಕೃಷಿ", factory: "ಕಾರ್ಖಾನೆ", shop: "ಅಂಗಡಿ", kitchen: "ಅಡುಗೆ ಸಹಾಯಕ", office: "ಕಚೇರಿ ಸಹಾಯಕ", loading: "ಲೋಡಿಂಗ್", repair: "ದುರಸ್ತಿ" },
  };

  const getJobName = (job) => {
    if (!job || !job.name) return "Job";
    return jobNames[language]?.[job.name] || jobNames["en"]?.[job.name] || job.name;
  };

  const speakText = (custom) => {
    const message = custom || (language === "hi" ? "नमस्ते। आपको नौकरी चाहिए तो नीचे मुझे नौकरी चाहिए बटन दबाएं।" : language === "mr" ? "नमस्कार। तुम्हाला नोकरी हवी असेल तर मला नोकरी हवी आहे हे बटन दाबा." : "Hello. If you need a job, press the I need a job button.");
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : language === "gu" ? "gu-IN" : language === "bn" ? "bn-IN" : language === "ta" ? "ta-IN" : language === "te" ? "te-IN" : language === "kn" ? "kn-IN" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setShowToast("Voice not supported"); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = language === "hi" ? "hi-IN" : language === "mr" ? "mr-IN" : "en-IN";
    recognition.start();
    setShowToast("🎤 सुन रहा हूँ...");
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearchText(text);
      setShowToast(`🔎 ${text} खोजा`);
    };
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

  const handleApply = (job) => {
    if (appliedJobs.includes(job.id)) {
      setShowToast("पहले से अप्लाई किया है");
      return;
    }
    setAppliedJobs([...appliedJobs, job.id]);
    setShowToast(`✓ ${getJobName(job)} के लिए अप्लाई किया!`);
    speakText(`${getJobName(job)} के लिए अप्लाई हो गया`);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setScreen("detail");
  };

  const filteredJobs = jobs.filter((job) => {
    if (!job) return false;
    const jobNameLower = getJobName(job).toLowerCase();
    const matchesSearch = jobNameLower.includes(searchText.toLowerCase()) || job.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = jobType === "all" || job.types.includes(jobType);
    return matchesSearch && matchesType;
  });

  const savedJobsList = jobs.filter(j => savedJobs.includes(j.id));

  if (!language) {
    return (
      <div className="language-screen">
        <div className="language-box">
          <div className="big-logo">💼</div>
          <h1>SimpleJobs</h1>
          <h2>पहले अपनी भाषा चुनें</h2>
          <p>Choose your language / તમારી ભાષા પસંદ કરો</p>
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
          <div className="language-help">💡 बाद में आप भाषा बदल सकते हैं • 8 Languages Available</div>
        </div>
      </div>
    );
  }

  // JOB DETAIL SCREEN
  if (screen === "detail" && selectedJob) {
    return (
      <div className="simple-page">
        <header className="simple-header">
          <button className="back-button" onClick={() => setScreen("categories")}>{t.back}</button>
          <div className="header-logo">💼 {t.jobDetail}</div>
          <button className="change-language" onClick={() => toggleSave(selectedJob.id)}>{savedJobs.includes(selectedJob.id) ? "❤" : "🤍"}</button>
        </header>
        <main className="detail-page">
          <div className="detail-card">
            <div className="detail-icon">{selectedJob.icon}</div>
            <h1>{getJobName(selectedJob)}</h1>
            <p className="detail-company">🏢 {selectedJob.company}</p>
            <div className="detail-grid">
              <div><strong>💰 {t.salary}</strong><p>{selectedJob.salary}</p></div>
              <div><strong>📍 {t.location}</strong><p>{selectedJob.location} • {selectedJob.distance}</p></div>
              <div><strong>👷 {t.experience}</strong><p>{selectedJob.experience}</p></div>
              <div><strong>🕐 Type</strong><p>{selectedJob.types.join(", ")}</p></div>
            </div>
            <div className="detail-desc">
              <h3>काम की जानकारी</h3>
              <p>{selectedJob.desc}</p>
            </div>
            <div className="detail-actions">
              <button className="apply-big-button" onClick={() => handleApply(selectedJob)} disabled={appliedJobs.includes(selectedJob.id)}>{appliedJobs.includes(selectedJob.id) ? t.applied : `✓ ${t.apply}`}</button>
              <button className="call-button" onClick={() => { setShowToast("📞 कॉल: 98765 43210"); }}>{t.call}</button>
            </div>
            <div className="safe-box small"><div className="safe-icon">🛡</div><div><h2>{t.safe}</h2><p>किसी को पैसे न दें।</p></div></div>
          </div>
        </main>
        {showToast && <div className="toast">{showToast}</div>}
      </div>
    );
  }

  // SAVED JOBS SCREEN
  if (screen === "saved") {
    return (
      <div className="simple-page">
        <header className="simple-header">
          <button className="back-button" onClick={() => setScreen("home")}>{t.back}</button>
          <div className="header-logo">❤ {t.savedTitle} ({savedJobsList.length})</div>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐</button>
        </header>
        <main className="category-page">
          {savedJobsList.length === 0 ? (
            <div className="empty-box"><p>💔</p><h3>{t.noSaved}</h3><button className="big-job-button" onClick={() => setScreen("categories")}>{t.categories}</button></div>
          ) : (
            <div className="big-category-grid">
              {savedJobsList.map((job) => (
                <div className="big-category-card" key={job.id} onClick={() => handleJobClick(job)}>
                  <div className="big-category-icon">{job.icon}</div>
                  <div className="category-main-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance}</small></div>
                  <button className="save-button saved" onClick={(e) => toggleSave(job.id, e)}>❤</button>
                </div>
              ))}
            </div>
          )}
        </main>
        {showToast && <div className="toast">{showToast}</div>}
      </div>
    );
  }

  // EMPLOYER SCREEN
  if (screen === "employer") {
    return (
      <div className="simple-page">
        <header className="simple-header">
          <button className="back-button" onClick={() => setScreen("home")}>{t.back}</button>
          <div className="header-logo">🏢 {t.employerTitle}</div>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐</button>
        </header>
        <main className="category-page">
          <div className="page-title"><div className="big-page-icon">🏢</div><h1>{t.employerTitle}</h1><p>{t.employerDesc}</p></div>
          <div className="employer-form">
            <input placeholder="कंपनी का नाम / Company Name" />
            <input placeholder="फोन नंबर / Phone Number" />
            <input placeholder="कौन सा काम? / What work?" />
            <textarea placeholder="काम की जानकारी लिखें..." rows="4"></textarea>
            <button className="big-job-button" onClick={() => { setShowToast("✓ नौकरी पोस्ट हो गई! " + t.comingSoon); setScreen("home"); }}>{t.postJob} →</button>
          </div>
          <div className="helper-box"><span>💡</span><div><strong>Free Posting</strong><p>पहली 2 नौकरी फ्री में पोस्ट करें</p></div></div>
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
          <div className="page-title"><div className="big-page-icon">👷</div><h1>{t.categories}</h1><p>जिस काम का अनुभव है, उसे चुनें</p></div>
          <div className="search-box"><span>🔎</span><input type="text" placeholder={t.search} value={searchText} onChange={(e) => setSearchText(e.target.value)} /><button onClick={startVoiceSearch}>🎤</button></div>
          <div className="filter-buttons">
            <button className={jobType === "all" ? "active-filter" : ""} onClick={() => setJobType("all")}>{t.all}</button>
            <button className={jobType === "fulltime" ? "active-filter" : ""} onClick={() => setJobType("fulltime")}>🕐 {t.fulltime}</button>
            <button className={jobType === "parttime" ? "active-filter" : ""} onClick={() => setJobType("parttime")}>🕐 {t.parttime}</button>
            <button className={jobType === "daily" ? "active-filter" : ""} onClick={() => setJobType("daily")}>💵 {t.daily}</button>
          </div>
          <div className="big-category-grid">
            {visibleJobs.map((job) => (
              <div className="big-category-card" key={job.id} onClick={() => handleJobClick(job)}>
                <div className="big-category-icon">{job.icon}</div>
                <div className="category-main-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance} • 👷 {job.experience} {appliedJobs.includes(job.id) && "• ✓ Applied"}</small></div>
                <button className={savedJobs.includes(job.id) ? "save-button saved" : "save-button"} onClick={(e) => toggleSave(job.id, e)}>{savedJobs.includes(job.id) ? "❤" : "🤍"}</button>
              </div>
            ))}
          </div>
          {filteredJobs.length === 0 && <div className="empty-box"><p>🔎</p><h3>कोई नौकरी नहीं मिली</h3><p>{searchText} के लिए कुछ नहीं मिला</p></div>}
          {filteredJobs.length > 10 && <button className="more-jobs-button" onClick={() => setShowMore(!showMore)}>{showMore ? t.less : t.more}</button>}
          <div className="helper-box"><span>👨👩👦</span><div><strong>{t.assist}</strong><p>परिवार या भरोसेमंद व्यक्ति आपकी मदद कर सकता है।</p></div></div>
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
          <button className="listen-button" onClick={() => speakText()} >🔊 {t.listen}</button>
          <button className="change-language" onClick={() => setScreen("saved")}>❤ {savedJobs.length}</button>
          <button className="change-language" onClick={() => setLanguage(null)}>🌐 {language === "hi" ? "हिन्दी" : language === "mr" ? "मराठी" : language === "gu" ? "ગુજરાતી" : language === "bn" ? "বাংলা" : language === "ta" ? "தமிழ்" : language === "te" ? "తెలుగు" : language === "kn" ? "ಕನ್ನಡ" : "English"}</button>
        </div>
      </header>
      <main className="home-main">
        <div className="welcome"><div className="welcome-icon">👋</div><div><h2>{t.welcome}</h2><p>SimpleJobs में आपका स्वागत है</p></div></div>
        <section className="main-question">
          <div className="question-icon">🔎</div>
          <h1>{t.title}</h1><p>{t.subtitle}</p>
          <button className="big-job-button" onClick={() => setScreen("categories")}><span className="button-icon">👷</span><span>{t.worker}</span><span className="button-arrow">→</span></button>
          <button className="employer-button" onClick={() => setScreen("employer")}><span className="employer-icon">🏢</span><span>{t.employer}</span><span>→</span></button>
          <button className="voice-help" onClick={() => speakText()}>🔊 {t.listen}</button>
        </section>
        <section className="quick-jobs">
          <div className="section-title"><h2>📍 {t.nearby}</h2><p>आपके आसपास मिलने वाले काम</p><button className="see-all" onClick={() => setScreen("categories")}>सभी देखें →</button></div>
          <div className="job-grid">
            {jobs.slice(0, 6).map((job) => (
              <div className="job-card" key={job.id} onClick={() => handleJobClick(job)}>
                <div className="job-icon">{job.icon}</div>
                <div className="job-info"><h3>{getJobName(job)}</h3><p>💰 {job.salary}</p><small>📍 {job.distance} {appliedJobs.includes(job.id) && "✓"}</small></div>
                <div className="verified">✓</div>
              </div>
            ))}
          </div>
        </section>
        <section className="features-section">
          <h2>हमारे लिए क्या जरूरी है?</h2>
          <div className="features-grid">
            <div onClick={() => speakText()}>🔊<strong>आवाज़ की मदद</strong><p>पढ़ने में परेशानी हो तो सुन सकते हैं</p></div>
            <div onClick={() => setScreen("categories")}>📍<strong>पास की नौकरी</strong><p>अपने आसपास का काम खोजें</p></div>
            <div>💰<strong>साफ वेतन</strong><p>वेतन की जानकारी पहले देखें</p></div>
            <div>🛡<strong>सुरक्षित नौकरी</strong><p>संदिग्ध नौकरी को Report करें</p></div>
            <div onClick={() => setLanguage(null)}>🌐<strong>अपनी भाषा</strong><p>8 भाषाएं उपलब्ध</p></div>
            <div onClick={() => setScreen("saved")}>❤<strong>सेव की हुई</strong><p>{savedJobs.length} नौकरियां सेव हैं</p></div>
          </div>
        </section>
        <section className="safe-box"><div className="safe-icon">🛡</div><div><h2>{t.safe}</h2><p>नौकरी पाने के लिए किसी को पैसे न दें। नौकरी की जानकारी पहले अच्छी तरह देखें।</p></div></section>
      </main>
      {showToast && <div className="toast">{showToast}</div>}
    </div>
  );
}

export default App;
