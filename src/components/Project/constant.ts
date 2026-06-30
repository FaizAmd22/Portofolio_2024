import { ProjectData } from "./ProjectDetail";

// Thumbnail
import BiproImage from "../../assets/project-bipro.png"
import BitrackImage from "../../assets/project-bitrack.png"
import FixworkImage from "../../assets/project-fixwork.png"
import TmsImage from "../../assets/project-tms.png"
import FixtrackMobile from "../../assets/project-fixtrack-mobile.png"
import FixtrackWeb from "../../assets/project-fixtrack-web.png"
import PerksoImage from "../../assets/project-perkeso.png"
import DotsImage from "../../assets/project-dots.png"
import NotifyImage from "../../assets/project-notify.png"
import NoflixImage from "../../assets/project-noflix.png"

// Bipro
import Bipro01 from "../../assets/projects/bipro/01.jpeg"
import Bipro02 from "../../assets/projects/bipro/02.jpeg"
import Bipro04 from "../../assets/projects/bipro/04.jpeg"
import Bipro05 from "../../assets/projects/bipro/05.jpeg"
import Bipro06 from "../../assets/projects/bipro/06.jpeg"
import Bipro07 from "../../assets/projects/bipro/07.jpeg"
import Bipro08 from "../../assets/projects/bipro/08.jpeg"
import Bipro09 from "../../assets/projects/bipro/09.jpg"
import Bipro10 from "../../assets/projects/bipro/10.jpg"

// Bitrack
import Bitrack01 from "../../assets/projects/bitrack/01.jpeg"
import Bitrack02 from "../../assets/projects/bitrack/02.jpeg"
import Bitrack03 from "../../assets/projects/bitrack/03.jpeg"
import Bitrack04 from "../../assets/projects/bitrack/04.jpeg"
import Bitrack05 from "../../assets/projects/bitrack/05.jpeg"
import Bitrack06 from "../../assets/projects/bitrack/06.jpeg"

// Fixwork
import Fixwork01 from "../../assets/projects/fixwork/01.jpeg"
import Fixwork02 from "../../assets/projects/fixwork/02.jpeg"
import Fixwork03 from "../../assets/projects/fixwork/03.jpeg"
import Fixwork04 from "../../assets/projects/fixwork/04.jpeg"
import Fixwork05 from "../../assets/projects/fixwork/05.jpeg"
import Fixwork06 from "../../assets/projects/fixwork/06.jpeg"
import Fixwork07 from "../../assets/projects/fixwork/07.jpeg"
import Fixwork08 from "../../assets/projects/fixwork/08.jpeg"
import Fixwork09 from "../../assets/projects/fixwork/09.jpeg"

// TMS
import Tms01 from "../../assets/projects/tms/01.jpg"
import Tms02 from "../../assets/projects/tms/02.jpg"
import Tms03 from "../../assets/projects/tms/03.jpg"
import Tms04 from "../../assets/projects/tms/04.jpg"

// Fixtrack Mobile
import FixtrackMobile00 from "../../assets/projects/fixtrack-mobile/00.jpeg"
import FixtrackMobile01 from "../../assets/projects/fixtrack-mobile/01.jpeg"
import FixtrackMobile02 from "../../assets/projects/fixtrack-mobile/02.jpeg"
import FixtrackMobile03 from "../../assets/projects/fixtrack-mobile/03.jpeg"
import FixtrackMobile04 from "../../assets/projects/fixtrack-mobile/04.jpeg"
import FixtrackMobile05 from "../../assets/projects/fixtrack-mobile/05.jpeg"
import FixtrackMobile06 from "../../assets/projects/fixtrack-mobile/06.jpeg"

// Fixtrack Web
import FixtrackWeb01 from "../../assets/projects/fixtrack-web/01.png"
import FixtrackWeb02 from "../../assets/projects/fixtrack-web/02.png"
import FixtrackWeb03 from "../../assets/projects/fixtrack-web/03.png"
import FixtrackWeb04 from "../../assets/projects/fixtrack-web/04.png"
import FixtrackWeb05 from "../../assets/projects/fixtrack-web/05.png"
import FixtrackWeb06 from "../../assets/projects/fixtrack-web/06.png"

// Perkeso
import Perkseo01 from "../../assets/projects/3p-perkeso/01.jpg"
import Perkseo02 from "../../assets/projects/3p-perkeso/02.jpg"
import Perkseo03 from "../../assets/projects/3p-perkeso/03.jpg"
import Perkseo04 from "../../assets/projects/3p-perkeso/04.jpg"
import Perkseo05 from "../../assets/projects/3p-perkeso/05.jpg"

// Dots
import Dots01 from "../../assets/projects/dots/01.jpg"
import Dots02 from "../../assets/projects/dots/02.jpg"
import Dots03 from "../../assets/projects/dots/03.jpg"
import Dots04 from "../../assets/projects/dots/04.jpg"
import Dots05 from "../../assets/projects/dots/05.jpg"

// Notify
import Notify01 from "../../assets/projects/notify/01.jpg"
import Notify02 from "../../assets/projects/notify/02.jpg"
import Notify03 from "../../assets/projects/notify/03.jpg"
import Notify04 from "../../assets/projects/notify/04.jpg"

// Noflix
import Noflix01 from "../../assets/projects/noflix/01.jpg"
import Noflix02 from "../../assets/projects/noflix/02.jpg"
import Noflix03 from "../../assets/projects/noflix/03.jpg"
import Noflix04 from "../../assets/projects/noflix/04.jpg"
import Noflix05 from "../../assets/projects/noflix/05.jpg"

export const PROJECTS: ProjectData[] = [
  {
    id: 1,
    name: "BIPRO",
    category: "HRMS Platform",
    year: "2025",
    role: "Frontend & Mobile Developer",
    description:
      "BIPRO is a cross-platform mobile HR management system that lets employees handle their entire work lifecycle from a single app — from biometric attendance and field visits to leave requests, payroll, performance reviews, and online training. Built with Framework7 and shipped natively via Cordova to iOS and Android, with full Bahasa Indonesia/English localization.",
    features: [
      "Face-recognition attendance with GPS validation",
      "Client visit check-in with digital signature",
      "OCR-powered ID card onboarding",
      "Leave, overtime & reimbursement workflows",
      "Digital payroll & payslip",
      "Performance dashboard with interactive charts",
      "Training & certification with quizzes",
      "Employee self-service with interactive org chart",
    ],
    tech: ["React.js", "Framework7", "Cordova", "Capacitor", "Redux Toolkit", "Zod"],
    links: [
      {type: "appstore", url: "https://apps.apple.com/us/app/bipro-by-b-log/id6749756009"},
      {type: "playstore", url: "https://play.google.com/store/apps/details?id=com.treffix.bihuman&pcampaignid=web_share"},
      {type: "website", url: "https://bipro.b-log.id/"},
    ],
    thumbnail: BiproImage,
    images: [
      { src: Bipro01, device: "mobile" },
      { src: Bipro02, device: "mobile" },
      { src: Bipro04, device: "mobile" },
      { src: Bipro05, device: "mobile" },
      { src: Bipro06, device: "mobile" },
      { src: Bipro07, device: "mobile" },
      { src: Bipro08, device: "mobile" },
      { src: Bipro09, device: "website" },
      { src: Bipro10, device: "website" },
    ],
    bg: "linear-gradient(135deg, #1a0a2e 0%, #2d1854 100%)",
  },
  {
    id: 2,
    name: "BITRACK",
    category: "Fleet Management & GPS Tracking",
    year: "2025",
    role: "Mobile Developer",
    description:
      "BITRACK is a cross-platform mobile fleet management system that lets fleet operators monitor and maintain enterprise vehicle fleets from a single app — from real-time GPS tracking and route history playback to geofencing, live dashcam monitoring, and device installation work orders. Built with Framework7 and shipped natively via Cordova/Capacitor to iOS and Android, with biometric login and full Bahasa Indonesia/English localization.",
    features: [
      "Real-time fleet map with marker clustering",
      "OSRM-powered route history playback",
      "Live dashcam streaming with two-way audio",
      "Geofence creation & vehicle filtering",
      "GPS, dashcam & SIM installation work orders",
      "Periodic tracking with speed, fuel & ignition charts",
      "Biometric fingerprint login",
      "Vehicle status alerts (moving, idle, stop, silence)",
    ],
    tech: ["React", "Framework7", "Capacitor", "Redux Toolkit", "Leaflet.js", "Mapbox GL", "Socket.IO", "OSRM"],
    links: [
      {type: "appstore", url: "https://apps.apple.com/us/app/bipro-by-b-log/id6749756009"},
      {type: "playstore", url: "https://play.google.com/store/apps/details?id=com.bitrack.mobile&pcampaignid=web_share"},
    ],
    thumbnail: BitrackImage,
    images: [
      { src: Bitrack01, device: "mobile" },
      { src: Bitrack02, device: "mobile" },
      { src: Bitrack03, device: "mobile" },
      { src: Bitrack04, device: "mobile" },
      { src: Bitrack05, device: "mobile" },
      { src: Bitrack06, device: "mobile" },
    ],
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1a3a5a 100%)",
  },
  {
    id: 3,
    name: "FixWork",
    category: "HRMS Platform",
    year: "2026",
    role: "Mobile Developer",
    description:
      "FixWork is a cross-platform mobile HR management system that lets employees handle their entire work lifecycle from a single app — from face-recognition attendance and field visits to leave requests, payroll, performance reviews, and online training. Built with Framework7 and shipped via Cordova to iOS (Unlisted, for enterprise clients) and Android, with full Bahasa Indonesia/English localization.",
    features: [
      "Face-recognition attendance with GPS geofence validation",
      "Client visit check-in with GPS & photo proof",
      "OCR-powered ID card onboarding",
      "Leave, overtime & reimbursement workflows",
      "Digital payroll & payslip",
      "Attendance dashboard with interactive charts",
      "Training & certification with quizzes",
      "Employee self-service with interactive org chart",
    ],
    tech: ["React.js", "Cordova", "Redux", "SQLite", "Framework7", "Zod"],
    links: [
      {type: "appstore", url: "https://apps.apple.com/us/app/fixwork/id6759553307"},
      {type: "playstore", url: "https://play.google.com/store/apps/details?id=com.treffix.qerja&pcampaignid=web_share"},
    ],
    thumbnail: FixworkImage,
    images: [
      { src: Fixwork01, device: "mobile" },
      { src: Fixwork02, device: "mobile" },
      { src: Fixwork03, device: "mobile" },
      { src: Fixwork04, device: "mobile" },
      { src: Fixwork05, device: "mobile" },
      { src: Fixwork06, device: "mobile" },
      { src: Fixwork07, device: "mobile" },
      { src: Fixwork08, device: "mobile" },
      { src: Fixwork09, device: "mobile" },
    ],
    bg: "linear-gradient(135deg, #0a1f0a 0%, #163a16 100%)",
  },
  {
    id: 4,
    name: "TMS",
    category: "Logistics & Fleet Management Platform",
    year: "2026",
    role: "Frontend Developer",
    description:
      "TMS is a logistics and fleet operations dashboard for managing delivery orders end-to-end — from route optimization and live vehicle tracking to delivery performance reporting. Built with Next.js and TypeScript, it renders interactive Leaflet maps with OSRM-powered trip optimization, drag-and-drop stop reordering, and animated real-time vehicle tracking with ETA timelines, wrapped in a modular dashboard shell ready for fleet monitoring, geofencing, and alert management.",
    features: [
      "Delivery order tracker with live stat cards, search, and status filtering",
      "Route optimization powered by OSRM with drag-and-drop stop reordering",
      "Real-time delivery tracking with animated vehicle movement on Leaflet maps",
      "Auto-calculated ETA and trip distance per stop, recomputed on re-optimize",
      "Estimated fuel & toll cost breakdown per delivery stop",
      "Delivery summary report with on-time vs late status and pagination",
      "Modular sidebar dashboard for fleet operations (Vehicle Monitoring, Geofence, Point of Interest, Alert Mapping, Investigation, Analytics)",
      "English/Indonesian language switcher",
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Ant Design",
      "Tailwind CSS",
      "Leaflet",
      "TanStack Query",
      "OSRM",
    ],
    links: [
      { type: "code", url: "https://github.com/FaizAmd22/tms-frontend" },
      { type: "website", url: "https://tms-develop.netlify.app/delivery-tracker" }
    ],
    thumbnail: TmsImage,
    images: [{ src: Tms01 }, { src: Tms02 }, { src: Tms03 }, { src: Tms04 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 5,
    name: "FixTrack Mobile",
    category: "Fleet Management Platform",
    year: "2026",
    role: "Mobile Developer",
    description:
      "FixTrack Mobile is the native iOS and Android companion app for the FixTrack fleet tracking platform — built as a standalone mobile project separate from its web dashboard counterpart. It lets fleet operators and field staff track trucks in real time on the map, replay historical trips with synced telemetry charts, and view live in-cab dashcam footage on the go. Built with Flutter and Riverpod, it combines Google Maps and OpenStreetMap-based tracking, WebSocket live video/audio streaming, and Syncfusion analytics charts, with full Bahasa Indonesia/English localization.",
    features: [
      "Real-time fleet monitoring map with marker clustering & geofence alerts",
      "Historical trip playback with animated route and speed control",
      "Synced telemetry charts for speed, fuel, voltage & temperature",
      "Multi-channel live dashcam streaming with audio over WebSocket",
      "Guided vehicle & device onboarding with license plate validation",
      "Alert notification center with map deep-linking",
      "Biometric login with secure session storage",
      "OTP-verified password reset",
    ],
    tech: ["Flutter", "Riverpod", "Google Maps", "flutter_map (OpenStreetMap)", "WebSocket", "Syncfusion Flutter Charts", "Media Kit"],
    links: [],
    thumbnail: FixtrackMobile,
    images: [
      { src: FixtrackMobile00, device: "mobile" },
      { src: FixtrackMobile01, device: "mobile" },
      { src: FixtrackMobile02, device: "mobile" },
      { src: FixtrackMobile03, device: "mobile" },
      { src: FixtrackMobile04, device: "mobile" },
      { src: FixtrackMobile05, device: "mobile" },
      { src: FixtrackMobile06, device: "mobile" },
    ],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 6,
    name: "FixTrack (Web)",
    category: "Fleet Management System · Web Dashboard",
    year: "2025",
    role: "Frontend Developer",
    description:
      "FixTrack Web is the web-based fleet management and GPS tracking dashboard that lets operators monitor their entire vehicle fleet in real time — from live location tracking and dashcam streaming to geofencing, automated alerts, and trip/ritase reporting. Built with Next.js on the frontend and Elysia (Bun) on the backend, with fleet-group-scoped role-based access control for multi-tenant enterprise clients.",
    features: [
      "Real-time GPS tracking with live interactive map & speedometer",
      "Live dashcam streaming with history playback",
      "Geofence creation with entry/exit violation alerts",
      "Configurable alert mapping & real-time notifications",
      "Trip replay and periodic tracking with interactive charts",
      "POI (point of interest) management by category",
      "Ritase (trip-cycle) tracking for logistics & hauling fleets",
      "Role-based access control scoped by fleet group",
    ],
    tech: ["Next.js", "TypeScript", "Ant Design", "Tailwind CSS", "TanStack Query", "Leaflet", "ECharts"],
    links: [
      { type: "website", url: "https://tracking-dev.treffix.id/" }
    ],
    thumbnail: FixtrackWeb,
    images: [{ src: FixtrackWeb01 }, { src: FixtrackWeb02 }, { src: FixtrackWeb03 }, { src: FixtrackWeb04 }, { src: FixtrackWeb05 }, { src: FixtrackWeb06 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 7,
    name: "3P Portal",
    category: "InsurTech Web Platform",
    year: "2025",
    role: "Frontend Developer",
    description:
      "3P (Pelan Penggantian Pendapatan) is Malaysia's first income protection web portal, developed in partnership with PERKESO and underwritten by Etiqa, giving professionals earning above RM6,000/month a digital path from enrollment to claims after involuntary job loss. Built with React, Vite, and HeroUI, it covers eligibility verification, real-time premium calculation, OTP-secured onboarding, and end-to-end claims handling — from Loss of Employment and Personal Accident submissions to beneficiary nomination and refunds.",
    features: [
      "Multi-step enrollment with real-time premium calculation",
      "OTP-verified onboarding & PERKESO contribution check",
      "Takaful and Conventional plan selection",
      "Protection status dashboard with contribution tracking",
      "Loss of Employment claim submission with document upload",
      "Personal Accident claim submission",
      "Beneficiary nomination with OTP verification",
      "Employer contract registration & company verification",
    ],
    tech: ["React", "TypeScript", "Vite", "HeroUI", "Tailwind CSS", "React Hook Form", "Zod"],
    links: [],
    thumbnail: PerksoImage,
    images: [{ src: Perkseo01 }, { src: Perkseo02 }, { src: Perkseo03 }, { src: Perkseo04 }, { src: Perkseo05 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 8,
    name: "Dots App",
    category: "Social Media Platform",
    year: "2024",
    role: "Fullstack Developer",
    description:
    "Dots is a full-stack social media app inspired by Threads/Twitter, where users publish text-and-image posts, like and reply in nested threads, and grow their network through a follow system — all from a single responsive feed. Built with React, TypeScript, and Redux Toolkit on the frontend, backed by a custom Express/PostgreSQL REST API, with session-based authentication and a fully responsive dark-themed UI.",
    features: [
      "Text & image post creation with live preview",
      "Like/unlike on posts and nested replies",
      "Threaded reply view with full conversation detail",
      "Follow/unfollow system with followers & following tabs",
      "Username search with real-time results",
      "Editable profile: name, bio, avatar & cover photo",
      "Suggested users sidebar for quick follow",
      "Responsive layout: sidebar nav (desktop) / bottom nav (mobile)",
    ],
    tech: ["React.js", "TypeScript", "Redux Toolkit", "Chakra UI", "Express.js", "PostgreSQL"],
    links: [
      { type: "code", url: "https://github.com/FaizAmd22/Fe-Dots-App" },
      { type: "code", url: "https://github.com/FaizAmd22/Be-Dots-App" },
      { type: "website", url: "https://dots-app-chill.vercel.app/" }
    ],
    thumbnail: DotsImage,
    images: [{ src: Dots01 }, { src: Dots02 }, { src: Dots03 }, { src: Dots04 }, { src: Dots05 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 9,
    name: "Notify",
    category: "Music Streaming Platform",
    year: "2023",
    role: "Full Stack Developer",
    description:
      "Notify is a Spotify-inspired music streaming web app where users can sign up, upload their own tracks, and curate a personal library. Built with Next.js 14 App Router and Tailwind CSS, with Supabase powering authentication, the Postgres database, and file storage for songs and cover art — plus a Stripe-ready data model for premium subscriptions.",
    features: [
      "Email and OAuth (Google, GitHub) authentication via Supabase Auth",
      "Song upload with title, author, cover image, and MP3 file storage",
      "Custom audio player with play/pause, next/previous track, and volume control",
      "Like/unlike songs synced to a personal Liked Songs library",
      "Real-time song search by title",
      "Personal library sidebar showing all uploaded tracks",
      "Responsive layout optimized for desktop and mobile",
      "Stripe-ready subscription data model for premium plans",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Zustand", "React Hook Form", "Radix UI"],
    links: [
      { type: "code", url: "https://github.com/FaizAmd22/Notify-NextJs-Tailwind-Supabase" },
      { type: "website", url: "https://notify-chill.vercel.app/" }
    ],
    thumbnail: NotifyImage,
    images: [{ src: Notify01 }, { src: Notify02 }, { src: Notify03 }, { src: Notify04 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
  {
    id: 10,
    name: "NoFlix",
    category: "Movie Discovery Platform",
    year: "2023",
    role: "Full Stack Developer",
    description:
      "Noflix is a MERN-stack movie and TV discovery platform powered by the TMDB API, letting users browse trending titles, dive into detailed media pages, and manage a personal watchlist. Built with React and Redux Toolkit on the frontend and a secured Express/MongoDB API on the backend, with JWT-based authentication and a proxied TMDB integration to keep API keys off the client.",
    features: [
      "JWT authentication with signup, signin & password update",
      "Movie & TV browsing by popular and top-rated categories",
      "Global search across movies, TV shows & people",
      "Detailed media pages with cast, trailers & recommendations",
      "Favorites list to save and remove titles per user",
      "User reviews with create, list & delete per title",
      "Person detail pages with biography and filmography",
      "Dark/light theme toggle with responsive hero carousel",
    ],
    tech: ["React.js", "Redux Toolkit", "Material UI", "Node.js", "Express.js", "MongoDB", "JWT", "TMDB API"],
    links: [
      { type: "code", url: "https://github.com/FaizAmd22/Movie-App-MERN" },
      { type: "website", url: "https://noflix-chill.vercel.app/" }
    ],
    thumbnail: NoflixImage,
    images: [{ src: Noflix01 }, { src: Noflix02 }, { src: Noflix03 }, { src: Noflix04 }, { src: Noflix05 }],
    bg: "linear-gradient(135deg, #1f1500 0%, #3a2a00 100%)",
  },
];