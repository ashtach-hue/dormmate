import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BrainCircuit,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  CircleHelp,
  Compass,
  Home,
  MapPinned,
  MessageSquareText,
  MessageSquareMore,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  X,
  Heart,
  Map,
  Building,
  BadgeCheck,
  SlidersHorizontal,
  Send,
  University,
  Users,
  Zap,
} from 'lucide-react';

const campusCenter = { lat: 40.7426, lng: -73.9854 };

const majorOptions = ['All', 'Business', 'Computer Science', 'Biology', 'Marketing', 'Engineering'];
const sleepOptions = ['Any', 'Night Owl', 'Early Riser'];

const initialRoommates = [
  {
    id: 'r1',
    name: 'Maya Chen',
    major: 'Computer Science',
    year: 'Junior',
    budget: 950,
    bio: 'Late-night coder with a spotless desk and a strong love for quiet study sessions.',
    sleepHabit: 'Night Owl',
    cleanliness: 5,
    tags: ['Studious', 'Gym', 'Coffee'],
    baseScore: 92,
    avatar: 'MC',
    accent: 'from-violet-500 to-indigo-500',
    verified: true,
    location: 'Library District',
    compatibility: 92,
  },
  {
    id: 'r2',
    name: 'Jordan Patel',
    major: 'Business',
    year: 'Sophomore',
    budget: 820,
    bio: 'Outgoing finance student who loves hosting friends and planning weekend coffee walks.',
    sleepHabit: 'Early Riser',
    cleanliness: 4,
    tags: ['Social', 'Meal Prep', 'Budget Smart'],
    baseScore: 88,
    avatar: 'JP',
    accent: 'from-emerald-500 to-cyan-500',
    verified: true,
    location: 'North Hall',
    compatibility: 88,
  },
  {
    id: 'r3',
    name: 'Ariana Lopez',
    major: 'Biology',
    year: 'Senior',
    budget: 1050,
    bio: 'Research-focused pre-med student who values a calm, organized, and respectful room.',
    sleepHabit: 'Early Riser',
    cleanliness: 5,
    tags: ['Organized', 'Lab Partner', 'Wellness'],
    baseScore: 90,
    avatar: 'AL',
    accent: 'from-pink-500 to-rose-500',
    verified: true,
    location: 'Science Quad',
    compatibility: 90,
  },
  {
    id: 'r4',
    name: 'Theo Brooks',
    major: 'Engineering',
    year: 'Junior',
    budget: 1100,
    bio: 'Mechanical engineer who likes a tidy desk, creative projects, and low-key evenings.',
    sleepHabit: 'Night Owl',
    cleanliness: 4,
    tags: ['DIY', 'Cycling', 'Quiet'],
    baseScore: 86,
    avatar: 'TB',
    accent: 'from-amber-500 to-orange-500',
    verified: false,
    location: 'Engineering Loop',
    compatibility: 86,
  },
  {
    id: 'r5',
    name: 'Sofia Nguyen',
    major: 'Marketing',
    year: 'Junior',
    budget: 900,
    bio: 'Creative strategist with a balanced routine, social energy, and a love for collaborative spaces.',
    sleepHabit: 'Night Owl',
    cleanliness: 3,
    tags: ['Creative', 'Events', 'People Person'],
    baseScore: 84,
    avatar: 'SN',
    accent: 'from-fuchsia-500 to-violet-500',
    verified: true,
    location: 'City Center',
    compatibility: 84,
  },
  {
    id: 'r6',
    name: 'Luis Alvarez',
    major: 'Computer Science',
    year: 'Freshman',
    budget: 780,
    bio: 'Friendly gamer and software tinkerer looking for a calm roommate with good communication.',
    sleepHabit: 'Night Owl',
    cleanliness: 3,
    tags: ['Gaming', 'Teamwork', 'Tech'],
    baseScore: 82,
    avatar: 'LA',
    accent: 'from-sky-500 to-blue-500',
    verified: false,
    location: 'Oak Terrace',
    compatibility: 82,
  },
];

const initialHousing = [
  {
    id: 'h1',
    title: 'The Quad Commons',
    type: '2BR Shared Apartment',
    distance: 4,
    price: 1360,
    landmark: 'Campus Quad',
    tags: ['Furnished', 'Utilities', 'Laundry'],
    availability: '2 rooms left',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    location: [40.7429, -73.9858],
    bedrooms: [
      { name: 'Bedroom A', rent: 820, sqft: 235, bed: 'Queen', bathroom: 'Shared bath', status: 'Available', selected: true },
      { name: 'Bedroom B', rent: 790, sqft: 220, bed: 'Full', bathroom: 'Shared bath', status: 'Reserved', selected: false },
      { name: 'Bedroom C', rent: 860, sqft: 250, bed: 'Queen', bathroom: 'Private half-bath', status: 'Available', selected: false },
    ],
  },
  {
    id: 'h2',
    title: 'Library Lofts',
    type: 'Studio + Private Room',
    distance: 7,
    price: 1190,
    landmark: 'Library',
    tags: ['Study Lounge', 'Bike Storage', 'Near Transit'],
    availability: '1 room left',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    location: [40.7448, -73.9798],
    bedrooms: [
      { name: 'North Loft', rent: 760, sqft: 198, bed: 'Twin XL', bathroom: 'Shared bath', status: 'Available', selected: true },
      { name: 'Reading Room', rent: 820, sqft: 214, bed: 'Full', bathroom: 'Shared bath', status: 'Available', selected: false },
    ],
  },
  {
    id: 'h3',
    title: 'Riverside Sublet',
    type: '4BR House',
    distance: 12,
    price: 990,
    landmark: 'North Pond',
    tags: ['Pets OK', 'Balcony', 'Walkable'],
    availability: '3 rooms left',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    location: [40.7368, -73.9812],
    bedrooms: [
      { name: 'Garden Room', rent: 690, sqft: 190, bed: 'Twin', bathroom: 'Shared bath', status: 'Available', selected: true },
      { name: 'Top Floor', rent: 710, sqft: 202, bed: 'Full', bathroom: 'Shared bath', status: 'Available', selected: false },
      { name: 'Back Suite', rent: 740, sqft: 228, bed: 'Queen', bathroom: 'Private bath', status: 'Available', selected: false },
    ],
  },
];

const defaultChatMessages = {
  r1: [
    { sender: 'them', text: 'Hey! I saw your profile — I keep a quiet schedule and love a tidy room.' },
    { sender: 'me', text: 'That sounds perfect. I’m usually up late studying and prefer a clean space.' },
  ],
  r2: [
    { sender: 'them', text: 'I’m planning a weekend brunch and would love a roommate who’s social but chill.' },
    { sender: 'me', text: 'I’m in. I’d be happy to help split costs and keep the place organized.' },
  ],
};

const formatCurrency = (value) => `$${value.toLocaleString()}`;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function computeCompatibility(profile, quizAnswers) {
  let total = profile.baseScore;

  if (quizAnswers.bedtime === 'Late night') total += 6;
  if (quizAnswers.bedtime === 'Early bird') total -= 4;
  if (quizAnswers.cleanliness === 'Very tidy') total += 7;
  if (quizAnswers.cleanliness === 'Messy') total -= 5;
  if (quizAnswers.hosting === 'Often') total += 4;
  if (quizAnswers.hosting === 'Never') total -= 3;

  return clamp(Math.round(total + (profile.major === 'Computer Science' ? 2 : 0)), 72, 98);
}

function parseAiPrompt(prompt) {
  const lower = prompt.toLowerCase();
  const majorMap = {
    business: 'Business',
    'computer science': 'Computer Science',
    cs: 'Computer Science',
    biology: 'Biology',
    marketing: 'Marketing',
    engineering: 'Engineering',
  };

  const major = Object.entries(majorMap).find(([keyword]) => lower.includes(keyword))?.[1] || null;
  const sleep = lower.includes('late owl') || lower.includes('night owl') || lower.includes('night')
    ? 'Night Owl'
    : lower.includes('early riser') || lower.includes('early bird') || lower.includes('morning')
      ? 'Early Riser'
      : null;

  const budgetMatch = prompt.match(/\$?(\d{3,4})/i);
  const budget = budgetMatch ? Number(budgetMatch[1]) : null;

  const location = lower.includes('library')
    ? 'Library'
    : lower.includes('quad')
      ? 'Campus Quad'
      : lower.includes('engineering')
        ? 'Engineering Loop'
        : lower.includes('city')
          ? 'City Center'
          : null;

  return { major, sleep, budget, location };
}

function App() {
  const [activeView, setActiveView] = useState('roommates');
  const [globalSearch, setGlobalSearch] = useState('');
  const [majorFilter, setMajorFilter] = useState('All');
  const [sleepFilter, setSleepFilter] = useState('Any');
  const [rentLimit, setRentLimit] = useState(1200);
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [mapTheme, setMapTheme] = useState('dark');
  const [savedRoommates, setSavedRoommates] = useState(['r2', 'r5']);
  const [savedListings, setSavedListings] = useState(['h1']);
  const [profileModal, setProfileModal] = useState(null);
  const [chatModalProfile, setChatModalProfile] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({ bedtime: 'Flexible', cleanliness: 'Average', hosting: 'Occasional' });
  const [postSubletOpen, setPostSubletOpen] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [backendOpen, setBackendOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(true);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiThread, setAiThread] = useState([
    {
      role: 'assistant',
      text: 'I can match you with roommates or housing based on major, budget, sleep habits, and campus location. Try: “Business major late owl under $900” or “Sublet near Library.”',
    },
  ]);
  const [roommates, setRoommates] = useState(initialRoommates);
  const [listings, setListings] = useState(initialHousing);
  const [ignored, setIgnored] = useState(0);
  const [selectedBlueprint, setSelectedBlueprint] = useState(initialHousing[0]);
  const [selectedBedroom, setSelectedBedroom] = useState(0);
  const [subletForm, setSubletForm] = useState({
    title: 'Northside Studio',
    price: 980,
    distance: 8,
    landmark: 'Library',
    tags: 'Quiet, Laundry, Furnished',
    availability: '1 room left',
  });
  const [agreementForm, setAgreementForm] = useState({
    quietHours: '10:00 PM - 8:00 AM',
    cleaningRotation: 'Alternate Sundays',
    guestPolicy: '2 guests max, 2 nights/week',
    sig: 'A. Lopez',
  });
  const [backendConfig, setBackendConfig] = useState({
    url: 'https://xyz-project.supabase.co',
    key: 'sbp_xxx_live_key_....',
  });
  const [toast, setToast] = useState(null);
  const [chatMessages, setChatMessages] = useState(defaultChatMessages);

  const mapRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setSelectedBedroom((prev) => Math.min(prev, Math.max((selectedBlueprint?.bedrooms?.length || 1) - 1, 0)));
  }, [selectedBlueprint]);

  useEffect(() => {
    const firstId = selectedBlueprint?.bedrooms?.[selectedBedroom]?.name || null;
    if (!firstId && selectedBlueprint?.bedrooms?.length) {
      setSelectedBedroom(0);
    }
  }, [selectedBlueprint, selectedBedroom]);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) return;
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = () => {
        setIgnored((state) => state + 1);
      };
      document.body.appendChild(script);
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !window.L || activeView !== 'housing' || viewMode !== 'map') return;

    const map = window.L.map(mapRef.current, { zoomControl: true });
    map.setView([campusCenter.lat, campusCenter.lng], 15);

    const tileLayers = {
      dark: window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      }),
      street: window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }),
      satellite: window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
      }),
    };

    const activeLayer = tileLayers[mapTheme] || tileLayers.dark;
    activeLayer.addTo(map);

    window.L.circle([campusCenter.lat, campusCenter.lng], {
      radius: 500,
      color: '#60a5fa',
      fillColor: '#60a5fa',
      fillOpacity: 0.08,
      weight: 1,
    }).addTo(map);

    window.L.circle([campusCenter.lat, campusCenter.lng], {
      radius: 1000,
      color: '#34d399',
      fillColor: '#34d399',
      fillOpacity: 0.05,
      weight: 1,
    }).addTo(map);

    window.L.marker([campusCenter.lat, campusCenter.lng], {
      icon: window.L.divIcon({
        className: '',
        html: `<div class="flex items-center justify-center rounded-full border border-sky-300/60 bg-sky-500/20 px-2 py-1 text-[10px] font-medium text-sky-100 shadow-lg">Campus Quad</div>`,
        iconSize: [110, 26],
        iconAnchor: [55, 13],
      }),
    })
      .addTo(map)
      .bindPopup('Campus Quad');

    filteredListings.forEach((item) => {
      const icon = window.L.divIcon({
        className: '',
        html: `<div class="rounded-lg border border-indigo-400/60 bg-slate-900/90 px-2 py-1 text-[10px] font-semibold text-indigo-100 shadow-lg">${formatCurrency(item.price)}</div>`,
        iconSize: [72, 24],
        iconAnchor: [36, 12],
      });

      const marker = window.L.marker(item.location, { icon }).addTo(map);
      marker.bindPopup(`<div class="text-slate-900"><strong>${item.title}</strong><br/>${item.landmark}<br/>${formatCurrency(item.price)}</div>`);
    });

    map.invalidateSize();

    return () => {
      map.remove();
    };
  }, [activeView, viewMode, mapTheme, filteredListings]);

  const filteredRoommates = useMemo(() => {
    const q = globalSearch.toLowerCase();
    return roommates
      .filter((roommate) => {
        const inSearch = !q || [roommate.name, roommate.major, roommate.bio, roommate.tags.join(' '), roommate.location].join(' ').toLowerCase().includes(q);
        const inBudget = roommate.budget <= rentLimit;
        const inMajor = majorFilter === 'All' || roommate.major === majorFilter;
        const inSleep = sleepFilter === 'Any' || roommate.sleepHabit === sleepFilter;
        return inSearch && inBudget && inMajor && inSleep;
      })
      .map((roommate) => ({
        ...roommate,
        score: computeCompatibility(roommate, quizAnswers),
      }));
  }, [roommates, globalSearch, rentLimit, majorFilter, sleepFilter, quizAnswers]);

  const filteredListings = useMemo(() => {
    const q = globalSearch.toLowerCase();
    return listings.filter((listing) => {
      const inSearch = !q || [listing.title, listing.landmark, listing.type, listing.tags.join(' ')].join(' ').toLowerCase().includes(q);
      const inDistance = distanceFilter === 'all'
        || (distanceFilter === '<5' && listing.distance < 5)
        || (distanceFilter === '5-10' && listing.distance >= 5 && listing.distance <= 10)
        || (distanceFilter === '10-20' && listing.distance > 10 && listing.distance <= 20);
      return inSearch && inDistance;
    });
  }, [listings, globalSearch, distanceFilter]);

  const savedCount = savedRoommates.length + savedListings.length;

  const toggleSaved = (type, id) => {
    const setter = type === 'roommate' ? setSavedRoommates : setSavedListings;
    setter((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setToast(type === 'roommate' ? 'Roommate saved to shortlist' : 'Listing saved to shortlist');
  };

  const handleQuizChange = (key, value) => {
    setQuizAnswers((current) => ({ ...current, [key]: value }));
  };

  const handleAiPrompt = (promptOverride) => {
    const promptText = (promptOverride || aiPrompt || '').trim();
    if (!promptText) return;

    const parsed = parseAiPrompt(promptText);
    const roomMatches = filteredRoommates.filter((roommate) => {
      const majorOkay = !parsed.major || roommate.major === parsed.major;
      const sleepOkay = !parsed.sleep || roommate.sleepHabit === parsed.sleep;
      const budgetOkay = !parsed.budget || roommate.budget <= parsed.budget;
      const locationOkay = !parsed.location || roommate.location === parsed.location || roommate.location.toLowerCase().includes(parsed.location.toLowerCase());
      return majorOkay && sleepOkay && budgetOkay && locationOkay;
    });

    const housingMatches = listings.filter((listing) => {
      const locationOkay = !parsed.location || listing.landmark.toLowerCase().includes(parsed.location.toLowerCase()) || listing.title.toLowerCase().includes(parsed.location.toLowerCase());
      const budgetOkay = !parsed.budget || listing.price <= parsed.budget;
      return locationOkay && budgetOkay;
    });

    setAiThread((current) => [...current, { role: 'user', text: promptText }]);
    setAiThread((current) => [
      ...current,
      {
        role: 'assistant',
        text: `I found ${roomMatches.length} roommate matches and ${housingMatches.length} housing options for your request. ${roomMatches.slice(0, 2).map((r) => r.name).join(', ') || 'No exact matches yet'}${housingMatches.length ? `; nearby options include ${housingMatches.slice(0, 2).map((h) => h.title).join(', ')}` : ''}`,
      },
    ]);
    setAiPrompt('');
  };

  const generateAutoReply = (profile, questionText) => {
    const lower = questionText.toLowerCase();
    if (lower.includes('budget')) return `I can work with a budget around ${formatCurrency(profile.budget + 120)} as long as the space is comfortable and clean.`;
    if (lower.includes('sleep') || lower.includes('quiet')) return `I’m mostly a ${profile.sleepHabit.toLowerCase()} and I’m okay keeping a steady routine. I value a respectful room environment.`;
    if (lower.includes('clean')) return `I keep my side tidy and try to maintain a ${profile.cleanliness}/5 standard for shared spaces.`;
    return `That sounds good — I’d be happy to coordinate around your schedule and work out a simple roommate plan that fits both of us.`;
  };

  const sendMessage = (profileId, text) => {
    const profile = roommates.find((roommate) => roommate.id === profileId) || initialRoommates[0];
    setChatMessages((current) => ({
      ...current,
      [profileId]: [...(current[profileId] || []), { sender: 'me', text }],
    }));

    setTimeout(() => {
      setChatMessages((current) => ({
        ...current,
        [profileId]: [...(current[profileId] || []), { sender: 'them', text: generateAutoReply(profile, text) }],
      }));
    }, 600);
  };

  const generateContractSummary = () => {
    setToast('Roommate agreement drafted');
    setAgreementOpen(false);
  };

  const addListingFromForm = () => {
    const newListing = {
      id: `h${Date.now()}`,
      title: subletForm.title,
      type: 'Custom Sublet',
      distance: Number(subletForm.distance),
      price: Number(subletForm.price),
      landmark: subletForm.landmark,
      tags: subletForm.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      availability: subletForm.availability,
      image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
      location: [campusCenter.lat + 0.005, campusCenter.lng + 0.006],
      bedrooms: [
        { name: 'Available Room', rent: Number(subletForm.price), sqft: 176, bed: 'Full', bathroom: 'Shared bath', status: 'Available', selected: true },
      ],
    };
    setListings((current) => [newListing, ...current]);
    setPostSubletOpen(false);
    setToast('Your sublet was posted to the market');
  };

  const openBlueprint = (listing) => {
    setSelectedBlueprint(listing);
    setSelectedBedroom(0);
    setProfileModal({ type: 'blueprint', listing });
  };

  const contractMeta = [
    'Quiet hours',
    'Cleaning rotation',
    'Guest policy',
    'Digital signature',
  ];

  const handleViewProfile = (roommate) => {
    setProfileModal({ type: 'profile', roommate });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="sticky top-0 z-40 border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-4 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-emerald-400 shadow-glow">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight">DormMate</div>
                <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400">Campus living intelligence</div>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <button type="button" onClick={() => setVerificationOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-200">
                <ShieldCheck className="h-4 w-4" />
                .edu verified
              </button>

              <button type="button" onClick={() => setBackendOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:border-indigo-500/40 hover:text-white">
                <Settings2 className="h-4 w-4" />
                Backend API
              </button>

              <button type="button" onClick={() => setSavedDrawerOpen(true)} className="relative inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 hover:border-indigo-500/40 hover:text-white">
                <Heart className="h-4 w-4" />
                Saved
                <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] text-white">{savedCount}</span>
              </button>

              <button type="button" onClick={() => setPostSubletOpen(true)} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-glow hover:brightness-110">
                <Plus className="h-4 w-4" />
                Post Sublet
              </button>

              <button type="button" onClick={() => setAiOpen((prev) => !prev)} className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-100">
                <BrainCircuit className="h-4 w-4" />
                AI Matchmaker {aiOpen ? 'On' : 'Off'}
              </button>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <button type="button" onClick={() => setSavedDrawerOpen(true)} className="rounded-full border border-slate-700 bg-slate-900 p-2">
                <Heart className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => setAiOpen((prev) => !prev)} className="rounded-full border border-violet-500/40 bg-violet-500/10 p-2">
                <BrainCircuit className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-6 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-3 shadow-2xl ring-1 ring-slate-800/80">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex gap-2 rounded-full border border-slate-800 bg-slate-950 p-1">
                <button
                  type="button"
                  onClick={() => setActiveView('roommates')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeView === 'roommates' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
                >
                  Find Roommates
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('housing')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeView === 'housing' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-300 hover:text-white'}`}
                >
                  Campus Housing
                </button>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search names, majors, listings, tags..."
                  className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none lg:w-80"
                />
              </div>
            </div>
          </div>

          {activeView === 'roommates' ? (
            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-white">Roommate filters</div>
                    <div className="text-sm text-slate-400">Narrow your compatibility match</div>
                  </div>
                  <button type="button" onClick={() => setQuizOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-100">
                    <Sparkles className="h-4 w-4" />
                    Take Compatibility Quiz
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-4">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                      <span>Budget</span>
                      <span className="font-mono text-indigo-300">${rentLimit}</span>
                    </div>
                    <input
                      type="range"
                      min="600"
                      max="1200"
                      step="50"
                      value={rentLimit}
                      onChange={(e) => setRentLimit(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <label className="mb-3 block text-xs uppercase tracking-[0.24em] text-slate-400">Major</label>
                    <select
                      value={majorFilter}
                      onChange={(e) => setMajorFilter(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                    >
                      {majorOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <label className="mb-3 block text-xs uppercase tracking-[0.24em] text-slate-400">Sleep habit</label>
                    <select
                      value={sleepFilter}
                      onChange={(e) => setSleepFilter(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
                    >
                      {sleepOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-400">
                      <span>Match quality</span>
                      <span className="text-emerald-300">{filteredRoommates.length} found</span>
                    </div>
                    <div className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-300">Best fit: {filteredRoommates[0]?.score || 0}%</div>
                  </div>
                </div>
              </section>

              <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredRoommates.map((roommate) => {
                  const isSaved = savedRoommates.includes(roommate.id);
                  return (
                    <article key={roommate.id} className="group overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl transition hover:-translate-y-0.5 hover:border-indigo-500/40">
                      <div className={`h-24 bg-gradient-to-r ${roommate.accent} p-4`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-slate-900/20 text-lg font-bold text-white">{roommate.avatar}</div>
                            <div>
                              <div className="flex items-center gap-2 text-white">
                                <span className="font-semibold">{roommate.name}</span>
                                {roommate.verified && <BadgeCheck className="h-4 w-4 text-emerald-300" />}
                              </div>
                              <div className="text-xs text-slate-200">{roommate.major} • {roommate.year}</div>
                            </div>
                          </div>

                          <div className="rounded-full border border-white/20 bg-slate-900/20 px-2 py-1 text-xs font-semibold text-white">{roommate.score}%</div>
                        </div>
                      </div>

                      <div className="space-y-4 p-4">
                        <div className="flex items-center justify-between text-sm text-slate-300">
                          <div className="flex items-center gap-2"><UserRoundCheck className="h-4 w-4 text-emerald-400" /> {roommate.location}</div>
                          <div className="font-mono text-indigo-300">{formatCurrency(roommate.budget)}/mo</div>
                        </div>

                        <p className="text-sm leading-6 text-slate-300">{roommate.bio}</p>

                        <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Sleep</div>
                            <div className="mt-1 font-medium text-slate-100">{roommate.sleepHabit}</div>
                          </div>
                          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
                            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Cleanliness</div>
                            <div className="mt-1 font-medium text-slate-100">{roommate.cleanliness}/5</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {roommate.tags.map((tag) => (
                            <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/70 px-2.5 py-1 text-[11px] text-slate-300">#{tag}</span>
                          ))}
                        </div>

                        <div className="flex gap-2 pt-1">
                          <button type="button" onClick={() => toggleSaved('roommate', roommate.id)} className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${isSaved ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200' : 'border-slate-700 bg-slate-950/60 text-slate-200 hover:border-indigo-500/40'}`}>
                            {isSaved ? 'Saved' : 'Save'}
                          </button>
                          <button type="button" onClick={() => handleViewProfile(roommate)} className="flex-1 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-200 hover:border-indigo-500/40">
                            View Profile
                          </button>
                          <button type="button" onClick={() => { setChatModalProfile(roommate); setChatMessages((current) => ({ ...current, [roommate.id]: current[roommate.id] || [{ sender: 'them', text: `Hi! I’m ${roommate.name}. Want to talk about a room plan?` }] })); }} className="flex-1 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-100">
                            DM
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div>
                    <div className="text-lg font-semibold text-white">Housing filters</div>
                    <div className="text-sm text-slate-400">Properties, pricing, and campus commute</div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['all', '<5', '5-10', '10-20'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setDistanceFilter(option)}
                        className={`rounded-full px-3 py-1.5 text-sm ${distanceFilter === option ? 'bg-indigo-500 text-white' : 'border border-slate-700 bg-slate-950 text-slate-300'}`}
                      >
                        {option === 'all' ? 'All' : option === '<5' ? '< 5 min' : option === '5-10' ? '5–10 min' : '10–20 min'}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2 rounded-full border border-slate-700 bg-slate-950 p-1">
                    <button type="button" onClick={() => setViewMode('cards')} className={`rounded-full px-3 py-1.5 text-sm ${viewMode === 'cards' ? 'bg-slate-100 text-slate-900' : 'text-slate-300'}`}>
                      Cards
                    </button>
                    <button type="button" onClick={() => setViewMode('map')} className={`rounded-full px-3 py-1.5 text-sm ${viewMode === 'map' ? 'bg-slate-100 text-slate-900' : 'text-slate-300'}`}>
                      Map View
                    </button>
                  </div>
                </div>

                {viewMode === 'map' && (
                  <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <MapPinned className="h-4 w-4 text-indigo-300" />
                      Campus walking radius
                    </div>
                    <div className="flex gap-2">
                      {['dark', 'street', 'satellite'].map((theme) => (
                        <button key={theme} type="button" onClick={() => setMapTheme(theme)} className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] ${mapTheme === theme ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300'}`}>
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {viewMode === 'cards' ? (
                <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredListings.map((listing) => {
                    const isSaved = savedListings.includes(listing.id);
                    return (
                      <article key={listing.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl transition hover:-translate-y-0.5 hover:border-indigo-500/40">
                        <div className="relative">
                          <img src={listing.image} alt={listing.title} className="h-52 w-full object-cover" />
                          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                            <span className="rounded-full border border-slate-800/80 bg-slate-950/80 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200">{listing.availability}</span>
                            <button type="button" onClick={() => toggleSaved('listing', listing.id)} className={`rounded-full p-2 backdrop-blur ${isSaved ? 'bg-emerald-500/90 text-white' : 'bg-slate-900/80 text-white'}`}>
                              <Heart className={`h-4 w-4 ${isSaved ? 'fill-white' : ''}`} />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xl font-semibold text-white">{listing.title}</div>
                              <div className="mt-1 text-sm text-slate-400">{listing.type}</div>
                            </div>
                            <div className="rounded-xl bg-indigo-500/10 px-2.5 py-1.5 text-sm font-semibold text-indigo-200">{formatCurrency(listing.price)}</div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-slate-300">
                            <div className="flex items-center gap-2"><Compass className="h-4 w-4 text-emerald-400" /> {listing.distance} min walk</div>
                            <div className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-sky-400" /> {listing.landmark}</div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {listing.tags.map((tag) => (
                              <span key={tag} className="rounded-full border border-slate-700 bg-slate-950/70 px-2 py-1 text-[11px] text-slate-300">{tag}</span>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <button type="button" onClick={() => openBlueprint(listing)} className="flex-1 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-100">
                              View Blueprint
                            </button>
                            <button type="button" onClick={() => setToast('Reservation request sent')} className="flex-1 rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-medium text-slate-100">
                              Reserve
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </section>
              ) : (
                <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-4">
                  <div ref={mapRef} className="h-[520px] w-full rounded-2xl" />
                </section>
              )}
            </div>
          )}
        </main>
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {aiOpen && (
          <div className="w-[360px] overflow-hidden rounded-3xl border border-violet-500/30 bg-slate-950/95 shadow-2xl ring-1 ring-slate-800/80 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
              <div className="flex items-center gap-2 text-violet-100">
                <BrainCircuit className="h-4 w-4" />
                <span className="text-sm font-semibold">AI Matchmaker</span>
              </div>
              <button type="button" onClick={() => setAiOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[280px] space-y-3 overflow-y-auto p-4">
              {aiThread.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`rounded-2xl border p-3 text-sm ${message.role === 'assistant' ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-50' : 'border-slate-700 bg-slate-900 text-slate-200'}`}>
                  {message.text}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 bg-slate-900/70 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {['Business major late owl', 'Sublet near Library', 'Engineering roommate under $900', 'Budget-friendly biology match'].map((pill) => (
                  <button key={pill} type="button" onClick={() => { setAiPrompt(pill); handleAiPrompt(pill); }} className="rounded-full border border-slate-700 bg-slate-950 px-2 py-1 text-[11px] text-slate-300 hover:border-violet-500/50 hover:text-violet-100">
                    {pill}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiPrompt();
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ask for a roommate or sublet..."
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                />
                <button type="submit" className="rounded-xl bg-violet-500 px-3 py-2 text-white">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {!aiOpen && (
          <button type="button" onClick={() => setAiOpen(true)} className="flex h-14 w-14 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500 text-white shadow-2xl">
            <BrainCircuit className="h-6 w-6" />
          </button>
        )}
      </div>

      {verificationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-200">
                <ShieldCheck className="h-5 w-5" />
                <div className="text-lg font-semibold">Student verification</div>
              </div>
              <button type="button" onClick={() => setVerificationOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-50">
              Verified student profile • Campus ID approved • Identity checks complete.
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"><span>Student status</span><span className="text-emerald-200">Verified</span></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-2"><span>Academic email</span><span className="text-slate-100">stu@northwest.edu</span></div>
            </div>
          </div>
        </div>
      )}

      {backendOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DatabaseIcon className="h-5 w-5 text-indigo-300" />
                <div className="text-lg font-semibold">Database / API settings</div>
              </div>
              <button type="button" onClick={() => setBackendOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">PostgreSQL schema</div>
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-3 font-mono text-xs leading-6 text-emerald-200">
{`CREATE TABLE roommates (
  id UUID PRIMARY KEY,
  name TEXT,
  major TEXT,
  sleep_habit TEXT,
  budget INTEGER,
  verified BOOLEAN,
  bio TEXT,
  tags TEXT[]
);

CREATE TABLE listings (
  id UUID PRIMARY KEY,
  title TEXT,
  price INTEGER,
  distance INTEGER,
  landmark TEXT,
  availability TEXT,
  location POINT
);`}
                </pre>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Project URL</label>
                  <input value={backendConfig.url} onChange={(e) => setBackendConfig((current) => ({ ...current, url: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Service key</label>
                  <input value={backendConfig.key} onChange={(e) => setBackendConfig((current) => ({ ...current, key: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
                </div>
                <button type="button" onClick={() => { setToast('Backend synced successfully'); setBackendOpen(false); }} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-sm font-medium text-white">
                  Sync Database
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {postSubletOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-indigo-300" />
                <div className="text-lg font-semibold">Post a sublet</div>
              </div>
              <button type="button" onClick={() => setPostSubletOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Title</label>
                <input value={subletForm.title} onChange={(e) => setSubletForm((current) => ({ ...current, title: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Price</label>
                <input type="number" value={subletForm.price} onChange={(e) => setSubletForm((current) => ({ ...current, price: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Distance</label>
                <input type="number" value={subletForm.distance} onChange={(e) => setSubletForm((current) => ({ ...current, distance: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Landmark</label>
                <input value={subletForm.landmark} onChange={(e) => setSubletForm((current) => ({ ...current, landmark: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Tags</label>
                <input value={subletForm.tags} onChange={(e) => setSubletForm((current) => ({ ...current, tags: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Availability</label>
                <input value={subletForm.availability} onChange={(e) => setSubletForm((current) => ({ ...current, availability: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setPostSubletOpen(false)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200">Cancel</button>
              <button type="button" onClick={addListingFromForm} className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">Publish listing</button>
            </div>
          </div>
        </div>
      )}

      {profileModal && profileModal.type === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${profileModal.roommate.accent} text-lg font-bold text-white`}>{profileModal.roommate.avatar}</div>
                <div>
                  <div className="flex items-center gap-2 text-xl font-semibold text-white">
                    {profileModal.roommate.name}
                    {profileModal.roommate.verified && <BadgeCheck className="h-5 w-5 text-emerald-400" />}
                  </div>
                  <div className="text-sm text-slate-400">{profileModal.roommate.major} • {profileModal.roommate.year}</div>
                </div>
              </div>
              <button type="button" onClick={() => setProfileModal(null)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Compatibility</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-sm font-semibold text-emerald-200">{computeCompatibility(profileModal.roommate, quizAnswers)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Budget</span>
                  <span className="font-mono text-indigo-200">{formatCurrency(profileModal.roommate.budget)}/mo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Sleep habit</span>
                  <span>{profileModal.roommate.sleepHabit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Cleanliness</span>
                  <span>{profileModal.roommate.cleanliness}/5</span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">Bio</div>
                <p className="text-sm leading-6 text-slate-200">{profileModal.roommate.bio}</p>
              </div>
            </div>

            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => toggleSaved('roommate', profileModal.roommate.id)} className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100">
                {savedRoommates.includes(profileModal.roommate.id) ? 'Saved to shortlist' : 'Save to shortlist'}
              </button>
              <button type="button" onClick={() => { setChatModalProfile(profileModal.roommate); setProfileModal(null); }} className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">
                Direct Message
              </button>
            </div>
          </div>
        </div>
      )}

      {chatModalProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r ${chatModalProfile.accent} text-sm font-bold text-white`}>{chatModalProfile.avatar}</div>
                <div>
                  <div className="font-semibold text-white">{chatModalProfile.name}</div>
                  <div className="text-xs text-slate-400">{chatModalProfile.major}</div>
                </div>
              </div>
              <button type="button" onClick={() => setChatModalProfile(null)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[340px] space-y-3 overflow-y-auto p-1">
              {(chatMessages[chatModalProfile.id] || []).map((message, index) => (
                <div key={`${message.sender}-${index}`} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${message.sender === 'me' ? 'bg-indigo-500 text-white' : 'border border-slate-700 bg-slate-950 text-slate-200'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2 border-t border-slate-800 pt-3">
              <input
                placeholder="Write a message..."
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && event.currentTarget.value.trim()) {
                    const value = event.currentTarget.value.trim();
                    sendMessage(chatModalProfile.id, value);
                    event.currentTarget.value = '';
                  }
                }}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500"
              />
              <button type="button" onClick={() => {
                const input = document.querySelector('#dm-input');
                if (input && input.value.trim()) {
                  sendMessage(chatModalProfile.id, input.value.trim());
                  input.value = '';
                }
              }} className="rounded-xl bg-indigo-500 px-3 py-2 text-white">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {profileModal && profileModal.type === 'blueprint' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-xl font-semibold text-white">{profileModal.listing.title}</div>
                <div className="text-sm text-slate-400">Interactive 2D blueprint</div>
              </div>
              <button type="button" onClick={() => setProfileModal(null)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                <svg viewBox="0 0 520 360" className="h-[380px] w-full">
                  <rect x="60" y="60" width="220" height="180" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="300" y="60" width="150" height="180" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <rect x="60" y="260" width="390" height="60" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  <text x="150" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="22" fontWeight="600">Living Room</text>
                  <text x="375" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="22" fontWeight="600">Shared Bath</text>
                  <text x="255" y="290" textAnchor="middle" fill="#e2e8f0" fontSize="20" fontWeight="600">Kitchen</text>

                  {profileModal.listing.bedrooms.map((bedroom, index) => {
                    const x = 70 + (index % 2) * 160;
                    const y = 80 + (index > 1 ? 110 : 0);
                    const isSelected = selectedBedroom === index;

                    return (
                      <g key={bedroom.name} onClick={() => setSelectedBedroom(index)} style={{ cursor: 'pointer' }}>
                        <rect
                          x={x}
                          y={y}
                          width="120"
                          height="90"
                          rx="12"
                          fill={isSelected ? '#312e81' : '#1f2937'}
                          stroke={isSelected ? '#a5b4fc' : '#475569'}
                          strokeWidth="2"
                        />
                        <text x={x + 60} y={y + 46} textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="600">{bedroom.name.split(' ')[1]}</text>
                        <text x={x + 60} y={y + 64} textAnchor="middle" fill="#cbd5e1" fontSize="12">{bedroom.status}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">Selected room</div>
                <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                  <div className="text-lg font-semibold text-white">{profileModal.listing.bedrooms[selectedBedroom]?.name}</div>
                  <div className="mt-3 space-y-2 text-sm text-slate-200">
                    <div className="flex items-center justify-between"><span>Rent</span><span className="font-mono text-indigo-200">{formatCurrency(profileModal.listing.bedrooms[selectedBedroom]?.rent || 0)}</span></div>
                    <div className="flex items-center justify-between"><span>Sqft</span><span>{profileModal.listing.bedrooms[selectedBedroom]?.sqft} sq ft</span></div>
                    <div className="flex items-center justify-between"><span>Bed size</span><span>{profileModal.listing.bedrooms[selectedBedroom]?.bed}</span></div>
                    <div className="flex items-center justify-between"><span>Bathroom</span><span>{profileModal.listing.bedrooms[selectedBedroom]?.bathroom}</span></div>
                  </div>
                </div>

                <button type="button" onClick={() => setToast('Reservation request sent')} className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white">
                  Reserve this room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {agreementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-emerald-300" />
                <div className="text-lg font-semibold">Roommate agreement builder</div>
              </div>
              <button type="button" onClick={() => setAgreementOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Quiet hours</label>
                <input value={agreementForm.quietHours} onChange={(e) => setAgreementForm((current) => ({ ...current, quietHours: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Cleaning rotation</label>
                <input value={agreementForm.cleaningRotation} onChange={(e) => setAgreementForm((current) => ({ ...current, cleaningRotation: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Guest policy</label>
                <input value={agreementForm.guestPolicy} onChange={(e) => setAgreementForm((current) => ({ ...current, guestPolicy: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-[0.2em] text-slate-400">Digital signature</label>
                <input value={agreementForm.sig} onChange={(e) => setAgreementForm((current) => ({ ...current, sig: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-indigo-500" />
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-50">
              <div className="mb-2 font-semibold">Draft summary</div>
              <ul className="space-y-2 text-emerald-100">
                {contractMeta.map((item) => (
                  <li key={item} className="flex items-center gap-2"><Check className="h-4 w-4" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setAgreementOpen(false)} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200">Close</button>
              <button type="button" onClick={generateContractSummary} className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white">Generate contract</button>
            </div>
          </div>
        </div>
      )}

      {savedDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 flex max-w-md flex-col border-l border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
            <div className="text-lg font-semibold text-white">Saved shortlist</div>
            <button type="button" onClick={() => setSavedDrawerOpen(false)} className="rounded-full border border-slate-700 p-1 text-slate-400">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4 overflow-y-auto p-4">
            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Roommates</div>
              {savedRoommates.length ? savedRoommates.map((item) => {
                const data = roommates.find((roommate) => roommate.id === item);
                if (!data) return null;
                return (
                  <div key={data.id} className="mb-2 flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${data.accent} text-sm font-bold text-white`}>{data.avatar}</div>
                      <div>
                        <div className="font-medium text-white">{data.name}</div>
                        <div className="text-xs text-slate-400">{data.major}</div>
                      </div>
                    </div>
                    <button type="button" onClick={() => setAgreementOpen(true)} className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-200">Agreement</button>
                  </div>
                );
              }) : <div className="text-sm text-slate-400">No saved roommates yet.</div>}
            </div>

            <div>
              <div className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">Listings</div>
              {savedListings.length ? savedListings.map((item) => {
                const data = listings.find((listing) => listing.id === item);
                if (!data) return null;
                return (
                  <div key={data.id} className="mb-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-3">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-white">{data.title}</div>
                      <div className="font-mono text-indigo-200">{formatCurrency(data.price)}</div>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">{data.landmark} • {data.distance} min walk</div>
                  </div>
                );
              }) : <div className="text-sm text-slate-400">No saved listings yet.</div>}
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed left-1/2 top-5 z-[80] -translate-x-1/2 rounded-full border border-indigo-500/40 bg-slate-900/95 px-4 py-2 text-sm text-indigo-100 shadow-xl backdrop-blur-md">
          {toast}
        </div>
      )}

      <style>{`
        body { background: #020817; }
        .leaflet-container { background: #020817; border-radius: 1.5rem; }
        .leaflet-control-zoom a { background: rgba(15, 23, 42, 0.9); color: #e2e8f0; border-color: rgba(148, 163, 184, 0.22); }
        .leaflet-control-zoom a:hover { background: rgba(49, 46, 129, 0.8); }
      `}</style>
    </>
  );
}

function DatabaseIcon(props) {
  return <DatabaseIconBase {...props} />;
}

function DatabaseIconBase(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h8" />
    </svg>
  );
}

export default App;
