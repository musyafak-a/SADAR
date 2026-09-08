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
  ChevronRight,
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
    dot: 'bg-severity-critical',
    badge: 'text-severity-critical bg-severity-critical/8 border-severity-critical/20',
    label: 'Kritis',
  },
  high: {
    dot: 'bg-severity-high',
    badge: 'text-severity-high bg-severity-high/8 border-severity-high/20',
    label: 'Tinggi',
  },
  medium: {
    dot: 'bg-severity-medium',
    badge: 'text-severity-medium bg-severity-medium/8 border-severity-medium/20',
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
    <div className="min-h-[100dvh] flex bg-canvas font-body text-ink overflow-hidden">
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-ink/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ════════════════════ SIDEBAR ════════════════════ */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-30
          w-[252px] shrink-0 flex flex-col
          bg-sidebar text-zinc-400
          transition-transform duration-200 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand */}
        <div className="px-6 py-5 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-accent font-display font-extrabold text-2xl italic tracking-tighter leading-none select-none">
              Aj
            </span>
            <div>
              <p className="font-display font-bold text-[15px] text-white tracking-tight leading-none">
                SADAR
              </p>
              <p className="text-[9px] font-mono font-medium text-accent uppercase tracking-widest mt-0.5">
                Ajinomoto
              </p>
            </div>
          </div>

          <button
            className="lg:hidden p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-sidebar-hover transition-colors"
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
                    ? 'bg-accent text-white'
                    : 'text-zinc-500 hover:bg-sidebar-hover hover:text-zinc-200'
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
        <div className="px-5 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sidebar-hover flex items-center justify-center text-zinc-500 shrink-0">
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>
            </div>
            <div className="overflow-hidden">
              <p className="text-[13px] font-semibold text-zinc-300 truncate">PT Ajinomoto Indonesia</p>
              <p className="text-[11px] text-zinc-600 truncate">Mojokerto Factory</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ════════════════════ MAIN ════════════════════ */}
      <div className="flex-1 flex flex-col min-h-[100dvh] overflow-hidden">
        {/* ── Top bar ── */}
        <header className="shrink-0 bg-surface border-b border-border px-4 lg:px-7 flex items-center justify-between gap-4 min-h-[60px]">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 -ml-2 rounded-lg text-ink-secondary hover:bg-canvas transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-display font-bold text-[17px] lg:text-lg text-ink tracking-tight leading-tight">
                Live Monitoring CCTV
              </h1>
              <p className="text-[12px] text-ink-muted hidden sm:block leading-tight">
                Pantau kondisi lapangan secara real-time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Clock chip */}
            <div className="hidden md:flex items-center gap-2.5 text-[12px] text-ink-secondary bg-canvas px-3.5 py-1.5 rounded-lg border border-border">
              <span className="font-mono font-medium">
                {currentTime.toLocaleTimeString('id-ID', { hour12: false })}
              </span>
              <span className="w-px h-3 bg-border" />
              <span className="flex items-center gap-1.5 text-accent font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                Live
              </span>
            </div>

            {/* User */}
            <div className="flex items-center gap-2.5">
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-semibold text-ink leading-none">Admin</p>
                <p className="text-[11px] text-ink-muted mt-0.5">Administrator</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-canvas border border-border flex items-center justify-center text-ink-muted shrink-0">
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
              {/* Video player */}
              <div className="flex-none lg:flex-1 min-h-[220px] sm:min-h-[320px] lg:min-h-0 rounded-2xl overflow-hidden bg-sidebar relative flex flex-col shadow-sm">
                {/* Overlay labels */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 max-w-[calc(100%-80px)]">
                  <span className="inline-flex items-center gap-1.5 bg-sidebar/80 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/8 truncate">
                    <Video className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                    <span className="truncate">{activeCam?.name}</span>
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 ${isLive ? 'bg-status-online/90 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                    <Circle className="w-1.5 h-1.5 fill-current" />
                    {isLive ? 'Live' : 'Off'}
                  </span>
                </div>

                {/* Feed */}
                <div className="flex-1 relative flex items-center justify-center bg-sidebar">
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

                  <div
                    className={`absolute inset-0 flex-col items-center justify-center gap-3 text-zinc-600 ${isLive ? 'hidden' : 'flex'}`}
                  >
                    <Camera className="w-12 h-12 opacity-20" />
                    <p className="font-mono text-[11px] tracking-widest uppercase">
                      Stream tidak aktif
                    </p>
                  </div>
                </div>
              </div>

              {/* Camera grid */}
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
                          snap-center shrink-0 w-[180px] lg:w-auto
                          flex flex-col justify-between p-3.5 rounded-xl
                          border text-left transition-all duration-150
                          ${isSelected
                            ? 'bg-accent-subtle border-accent/30 shadow-sm'
                            : 'bg-surface border-border hover:border-zinc-300 hover:shadow-sm'
                          }
                        `}
                      >
                        <div className="flex justify-between items-start w-full">
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-accent/10' : 'bg-canvas'}`}>
                            <Camera className={`w-4 h-4 ${isSelected ? 'text-accent' : 'text-ink-muted'}`} />
                          </div>
                          <span
                            className={`
                              inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase
                              ${isOnline ? 'text-status-online bg-status-online/8' : 'text-ink-muted bg-canvas'}
                            `}
                          >
                            <Circle className="w-1.5 h-1.5 fill-current" />
                            {isOnline ? 'Live' : 'Off'}
                          </span>
                        </div>
                        <div className="mt-3">
                          <h3 className={`font-semibold text-[13px] truncate ${isSelected ? 'text-accent' : 'text-ink'}`}>
                            {cam.name}
                          </h3>
                          <p className="text-[11px] text-ink-muted mt-0.5 truncate">{cam.location}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ─── Right: Alert log ─── */}
            <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex flex-col bg-surface border border-border rounded-2xl overflow-hidden h-[380px] lg:h-auto shadow-sm">
              {/* Header */}
              <div className="px-5 py-4 border-b border-border-subtle flex items-center justify-between shrink-0">
                <h2 className="font-display font-bold text-[15px] text-ink">Log Peringatan</h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-status-online/8 border border-status-online/15">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-status-online opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-status-online" />
                  </span>
                  <span className="text-[10px] font-semibold text-status-online uppercase tracking-wider">Real-time</span>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">
                {ALERTS.map((alert, idx) => {
                  const sev = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.medium;
                  return (
                    <div
                      key={alert.id}
                      className={`
                        group flex items-start gap-3 px-5 py-3.5
                        hover:bg-canvas/60 transition-colors cursor-default
                        ${idx !== ALERTS.length - 1 ? 'border-b border-border-subtle' : ''}
                      `}
                    >
                      {/* Severity dot */}
                      <div className="mt-1.5 shrink-0">
                        <div className={`w-2 h-2 rounded-full ${sev.dot}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[11px] font-medium text-ink-muted">{alert.time}</span>
                          <span className={`inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded border ${sev.badge}`}>
                            {sev.label}
                          </span>
                        </div>
                        <p className="text-[13px] font-semibold text-ink mt-1 leading-snug">{alert.type}</p>
                        <p className="text-[11px] text-ink-muted mt-0.5 truncate">{alert.camera}</p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-ink-muted/40 mt-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border-subtle text-center shrink-0">
                <button className="text-[12px] font-semibold text-accent hover:text-accent-hover transition-colors">
                  Lihat semua peringatan
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
