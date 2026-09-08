import React, { useState, useEffect } from 'react';
import {
  Camera,
  AlertTriangle,
  Clock,
  Settings,
  Home,
  BarChart2,
  Box,
  Video,
  User,
  Menu,
  X,
  Circle,
  ArrowRight,
  ChevronRight,
  Shield,
} from 'lucide-react';

/* ─── Data ───────────────────────────────────────────────── */

const CAMERAS = [
  { id: 1, name: 'Gerbang Masuk', status: 'active', location: 'Area Utara' },
  { id: 2, name: 'Zona Konstruksi Lt.2', status: 'active', location: 'Sektor 4' },
  { id: 3, name: 'Area Alat Berat', status: 'active', location: 'Gudang Timur' },
  { id: 4, name: 'Area Gudang', status: 'inactive', location: 'Gedung Penyimpanan' },
];

const ALERTS = [
  { id: 101, time: '14:32:00', type: 'Tidak memakai rompi', camera: 'Zona Konstruksi Lt.2 — Kamera 3', severity: 'high' },
  { id: 102, time: '14:29:15', type: 'Tidak memakai helm', camera: 'Area Alat Berat — Kamera 4', severity: 'critical' },
  { id: 103, time: '14:24:10', type: 'Tidak memakai sarung tangan', camera: 'Area Gudang — Kamera 4', severity: 'medium' },
  { id: 104, time: '14:19:05', type: 'Tidak memakai rompi', camera: 'Gerbang Masuk — Kamera 1', severity: 'high' },
  { id: 105, time: '14:15:30', type: 'Tidak memakai helm', camera: 'Zona Konstruksi Lt.2 — Kamera 3', severity: 'critical' },
  { id: 106, time: '14:12:11', type: 'Tidak memakai sarung tangan', camera: 'Area Alat Berat — Kamera 2', severity: 'medium' },
];

const NAV_ITEMS = [
  { icon: Home, label: 'Beranda' },
  { icon: Video, label: 'Live Monitoring', active: true },
  { icon: BarChart2, label: 'Laporan' },
  { icon: Box, label: 'Model AI' },
  { icon: Settings, label: 'Pengaturan' },
];

/* ─── Severity helpers ───────────────────────────────────── */

const SEVERITY_STYLES = {
  critical: {
    dot: 'bg-[#E31837]',
    badge: 'text-[#E31837] border-[#E31837]/20 bg-[#E31837]/5',
    label: 'Kritis',
  },
  high: {
    dot: 'bg-[#C2410C]',
    badge: 'text-[#C2410C] border-[#C2410C]/20 bg-[#C2410C]/5',
    label: 'Tinggi',
  },
  medium: {
    dot: 'bg-[#A16207]',
    badge: 'text-[#A16207] border-[#A16207]/20 bg-[#A16207]/5',
    label: 'Sedang',
  },
};

/* ─── Component ──────────────────────────────────────────── */

export default function App() {
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const activeCam = CAMERAS.find((c) => c.id === selectedCamera);

  return (
    <div className="min-h-[100dvh] flex bg-white text-[#18181B] overflow-hidden" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#18181B]/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════ SIDEBAR ════════════════════ */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30
          w-[248px] shrink-0 flex flex-col
          bg-[#1C1C1E] text-[#A1A1AA]
          transition-transform duration-200 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-[#3A3A3C] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E31837] flex items-center justify-center shrink-0">
              <Shield className="w-[18px] h-[18px] text-white" />
            </div>
            <div>
              <p className="font-bold text-[15px] text-white tracking-tight leading-none">
                SADAR
              </p>
              <p className="text-[10px] text-[#E31837] font-semibold uppercase tracking-widest mt-0.5" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                Ajinomoto
              </p>
            </div>
          </div>

          <button
            className="lg:hidden p-1.5 rounded-md text-[#71717A] hover:text-white hover:bg-[#2C2C2E] transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item, i) => {
            const Icon = item.icon;
            const isActive = item.active;
            return (
              <button
                key={i}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                  text-[13px] font-semibold tracking-wide transition-colors
                  ${isActive
                    ? 'bg-[#E31837] text-white'
                    : 'text-[#71717A] hover:bg-[#2C2C2E] hover:text-[#E4E4E7]'
                  }
                `}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#3A3A3C]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2C2C2E] flex items-center justify-center text-[#71717A] shrink-0">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-semibold text-[#E4E4E7] truncate">PT Ajinomoto Indonesia</p>
              <p className="text-[11px] text-[#71717A] truncate">Mojokerto Factory</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ════════════════════ MAIN ════════════════════ */}
      <div className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden bg-[#F8F9FA]">
        {/* ── Top bar ── */}
        <header className="shrink-0 bg-white border-b border-[#E4E4E7] px-4 lg:px-7 flex items-center justify-between gap-4 min-h-[60px]">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg text-[#71717A] hover:bg-[#F4F4F5] transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-[17px] lg:text-lg text-[#18181B] tracking-tight leading-tight">
                Live Monitoring CCTV
              </h1>
              <p className="text-[12px] text-[#A1A1AA] hidden sm:block leading-tight">
                Pantau kondisi lapangan secara real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Clock */}
            <div className="hidden md:flex items-center gap-2.5 text-[12px] text-[#71717A] bg-[#F8F9FA] px-3.5 py-1.5 rounded-full border border-[#E4E4E7]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
              <span className="font-medium">
                {currentTime.toLocaleTimeString('id-ID', { hour12: false })}
              </span>
              <span className="w-px h-3 bg-[#E4E4E7]" />
              <span className="flex items-center gap-1.5 text-[#E31837] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#E31837] opacity-50 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E31837]" />
                </span>
                Live
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-semibold text-[#18181B] leading-none">Admin</p>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">Administrator</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center text-[#A1A1AA] shrink-0">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* ── Content area ── */}
        <main className="flex-1 overflow-y-auto lg:overflow-hidden">
          <div className="p-4 lg:p-6 h-full flex flex-col lg:flex-row gap-5">

            {/* ─── Left: Feed + cameras ─── */}
            <div className="w-full lg:w-auto flex-none lg:flex-1 flex flex-col gap-5 lg:overflow-hidden min-h-0">

              {/* Video player — Ajinomoto-style card: thin border, generous radius, no shadow */}
              <div className="flex-none lg:flex-1 min-h-[220px] sm:min-h-[320px] lg:min-h-0 rounded-2xl overflow-hidden bg-[#1C1C1E] border border-[#E4E4E7] relative flex flex-col">
                {/* Overlay labels */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 max-w-[calc(100%-80px)]">
                  <span className="inline-flex items-center gap-1.5 bg-[#1C1C1E]/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/8 truncate">
                    <Video className="w-3.5 h-3.5 shrink-0 text-[#A1A1AA]" />
                    <span className="truncate">{activeCam?.name}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${isLive ? 'bg-[#15803D]/90 text-white' : 'bg-[#71717A] text-[#E4E4E7]'}`}>
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {isLive ? 'Live' : 'Off'}
                  </span>
                </div>

                {/* Feed */}
                <div className="flex-1 relative flex items-center justify-center bg-[#1C1C1E]">
                  {isLive ? (
                    <img
                      src="http://127.0.0.1:5000/api/detect-frame"
                      alt="Live Camera Feed"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}

                  <div className={`absolute inset-0 flex-col items-center justify-center gap-3 text-[#71717A] ${isLive ? 'hidden' : 'flex'}`}>
                    <Camera className="w-12 h-12 opacity-20" />
                    <p className="text-[11px] tracking-widest uppercase" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      Stream tidak aktif
                    </p>
                  </div>
                </div>
              </div>

              {/* Camera grid — Ajinomoto-style: thin border, rounded-2xl, outline active state */}
              <div className="shrink-0">
                <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-3 pb-1 lg:pb-0 snap-x snap-mandatory">
                  {CAMERAS.map((cam) => {
                    const isSelected = selectedCamera === cam.id;
                    const isOnline = cam.status === 'active';
                    return (
                      <button
                        key={cam.id}
                        onClick={() => setSelectedCamera(cam.id)}
                        className={`
                          snap-center shrink-0 w-[176px] lg:w-auto
                          flex flex-col justify-between p-3.5 rounded-2xl
                          border text-left transition-all duration-150
                          ${isSelected
                            ? 'bg-white border-[#E31837] ring-1 ring-[#E31837]/20'
                            : 'bg-white border-[#E4E4E7] hover:border-[#D4D4D8]'
                          }
                        `}
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#E31837]/8' : 'bg-[#F4F4F5]'}`}>
                            <Camera className={`w-4 h-4 ${isSelected ? 'text-[#E31837]' : 'text-[#A1A1AA]'}`} />
                          </div>
                          <span
                            className={`
                              inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold uppercase
                              ${isOnline ? 'text-[#15803D] bg-[#15803D]/8' : 'text-[#A1A1AA] bg-[#F4F4F5]'}
                            `}
                          >
                            <Circle className="w-1.5 h-1.5 fill-current" />
                            {isOnline ? 'Live' : 'Off'}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h3 className={`font-semibold text-[13px] truncate ${isSelected ? 'text-[#E31837]' : 'text-[#18181B]'}`}>
                            {cam.name}
                          </h3>
                          <p className="text-[11px] text-[#A1A1AA] mt-0.5 truncate">{cam.location}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── Right: Alert log — Ajinomoto-style card ─── */}
            <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden h-[380px] lg:h-auto">
              {/* Header */}
              <div className="px-5 py-4 border-b border-[#F4F4F5] flex items-center justify-between shrink-0">
                <h2 className="font-bold text-[15px] text-[#18181B]">Log Peringatan</h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#15803D]/15 bg-[#15803D]/5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#15803D] opacity-50 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#15803D]" />
                  </span>
                  <span className="text-[10px] font-semibold text-[#15803D] uppercase tracking-wider" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Real-time</span>
                </div>
              </div>

              {/* List — divider-separated rows, not card-in-card */}
              <div className="flex-1 overflow-y-auto">
                {ALERTS.map((alert, idx) => {
                  const sev = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.medium;
                  return (
                    <div
                      key={alert.id}
                      className={`
                        group flex items-start gap-3 px-5 py-3.5
                        hover:bg-[#F8F9FA] transition-colors cursor-default
                        ${idx !== ALERTS.length - 1 ? 'border-b border-[#F4F4F5]' : ''}
                      `}
                    >
                      {/* Severity dot */}
                      <div className="mt-1.5 shrink-0">
                        <div className={`w-2 h-2 rounded-full ${sev.dot}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[11px] font-medium text-[#A1A1AA]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>{alert.time}</span>
                          <span className={`inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${sev.badge}`}>
                            {sev.label}
                          </span>
                        </div>
                        <p className="text-[13px] font-semibold text-[#18181B] mt-1 leading-snug">{alert.type}</p>
                        <p className="text-[11px] text-[#A1A1AA] mt-0.5 truncate">{alert.camera}</p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-[#D4D4D8] mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>

              {/* Footer — Ajinomoto pill-outline button with arrow */}
              <div className="px-5 py-3.5 border-t border-[#F4F4F5] flex justify-center shrink-0">
                <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#E31837] text-[#E31837] text-[12px] font-semibold hover:bg-[#E31837]/5 transition-colors">
                  <span>Lihat Semua Peringatan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
