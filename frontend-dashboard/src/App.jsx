import React, { useState, useEffect } from 'react';
import { Camera, AlertTriangle, ShieldCheck, Clock, Settings, Home, BarChart2, Box, Video, User, Menu, X } from 'lucide-react';

export default function App() {
  const [selectedCamera, setSelectedCamera] = useState(1);
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const cameras = [
    { id: 1, name: 'Gate 1 - Main Entrance', status: 'active', fps: 30, location: 'North Wing' },
    { id: 2, name: 'Construction Zone A', status: 'active', fps: 28, location: 'Sector 4' },
    { id: 3, name: 'Warehouse Entry', status: 'inactive', fps: 0, location: 'Storage Building' },
    { id: 4, name: 'Factory Floor', status: 'active', fps: 24, location: 'Main Assembly' },
  ];

  const alerts = [
    { id: 101, time: '14:32:00', type: 'Tidak memakai rompi', camera: 'Zona Konstruksi Lantai 2 - Kamera 3', severity: 'high' },
    { id: 102, time: '14:29:15', type: 'Tidak memakai helm', camera: 'Area Alat Berat - Kamera 4', severity: 'critical' },
    { id: 103, time: '14:24:10', type: 'Tidak memakai sarung tangan', camera: 'Area Gudang - Kamera 4', severity: 'medium' },
    { id: 104, time: '14:19:05', type: 'Tidak memakai rompi', camera: 'Gerbang Masuk - Kamera 1', severity: 'high' },
    { id: 105, time: '14:15:30', type: 'Tidak memakai helm', camera: 'Zona Konstruksi Lantai 2 - Kamera 3', severity: 'critical' },
    { id: 106, time: '14:12:11', type: 'Tidak memakai sarung tangan', camera: 'Area Alat Berat - Kamera 2', severity: 'medium' },
  ];

  const activeCam = cameras.find(c => c.id === selectedCamera);

  const getSeverityColors = (severity) => {
    switch(severity) {
      case 'critical': return 'text-[#E31837] border-[#E31837] bg-red-50';
      case 'high': return 'text-orange-600 border-orange-500 bg-orange-50';
      case 'medium': return 'text-yellow-600 border-yellow-500 bg-yellow-50';
      case 'low': return 'text-blue-600 border-blue-500 bg-blue-50';
      default: return 'text-slate-600 border-slate-500 bg-slate-50';
    }
  };

  const navItems = [
    { icon: Home, label: 'Beranda' },
    { icon: Video, label: 'Live Monitoring', active: true },
    { icon: BarChart2, label: 'Reports & Analytics' },
    { icon: Box, label: 'Model Management' },
    { icon: Settings, label: 'Settings & CCTV' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex overflow-hidden">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 w-[260px] bg-[#111827] text-slate-300 flex flex-col shrink-0 h-screen z-30 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-slate-800 bg-[#0f1522] flex justify-between items-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#E31837] font-black text-3xl italic tracking-tighter">Aj</span>
            <div className="flex flex-col ml-1">
              <h1 className="text-xl font-bold text-white tracking-tight leading-none">SADAR</h1>
              <p className="text-[9px] text-[#E31837] font-bold uppercase tracking-wider mt-0.5">Ajinomoto</p>
            </div>
          </div>
          <button 
            className="lg:hidden text-slate-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item, idx) => (
            <button 
              key={idx}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                item.active 
                  ? 'bg-[#E31837] text-white shadow-lg shadow-red-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-5 border-t border-slate-800 bg-[#0f1522]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0">
              <span className="font-bold text-lg text-slate-300">🏢</span>
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-sm font-bold text-slate-200 truncate">Ajinomoto</p>
              <p className="text-xs text-slate-500 truncate">Mojokerto</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        
        {/* Top Header */}
        <header className="h-auto min-h-[72px] py-4 lg:py-0 bg-white border-b border-slate-200 px-4 lg:px-8 flex flex-wrap gap-4 items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg lg:text-xl font-bold text-slate-800">Live Monitoring CCTV</h2>
              <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">Pantau kondisi lapangan secara real-time dari berbagai titik kamera.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden md:flex items-center gap-3 text-xs lg:text-sm text-slate-500 font-medium bg-slate-50 px-3 lg:px-4 py-2 rounded-lg border border-slate-100">
              <span className="hidden lg:inline">05 Sep 2025</span>
              <div className="hidden lg:block w-1 h-1 rounded-full bg-slate-300"></div>
              <span className="font-mono">{currentTime.toLocaleTimeString('id-ID', { hour12: false })}</span>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <span className="text-[#E31837] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#E31837] animate-pulse"></span> Live</span>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-slate-800 text-sm leading-tight">Admin</p>
                <p className="text-[10px] lg:text-xs text-slate-500">Administrator</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                <User className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-8 flex flex-col lg:flex-row gap-6 overflow-y-auto lg:overflow-hidden bg-slate-50/50">
          
          {/* Left Column: Live Feed */}
          <div className="w-full lg:w-auto flex-none lg:flex-1 flex flex-col gap-6 lg:overflow-hidden min-h-0">
            
            {/* Video Player */}
            <div className="card-panel flex-1 min-h-[250px] sm:min-h-[350px] lg:min-h-0 relative overflow-hidden flex flex-col bg-slate-900 border-0 shadow-md">
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 z-10 flex flex-wrap items-center gap-2 max-w-[calc(100%-100px)]">
                <span className={`px-2 lg:px-3 py-1 lg:py-1.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] lg:text-xs font-bold text-white border border-white/10 flex items-center gap-1.5 lg:gap-2 truncate max-w-full`}>
                  <Video className="w-3 h-3 lg:w-4 lg:h-4 text-slate-300 shrink-0" />
                  <span className="truncate">{activeCam?.name}</span>
                </span>
                <span className={`px-2 lg:px-2.5 py-1 lg:py-1.5 rounded-md text-[9px] lg:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shrink-0 ${isLive ? 'bg-green-600/90 text-white' : 'bg-slate-700/90 text-white'}`}>
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>

              <div className="flex-1 relative flex items-center justify-center overflow-hidden h-full">
                {isLive ? (
                  <img 
                    src="http://127.0.0.1:5000/api/detect-frame" 
                    alt="Live Camera Feed"
                    className="w-full h-full object-contain bg-black"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                <div className={`absolute inset-0 flex-col items-center justify-center text-slate-500 gap-4 ${isLive ? 'hidden' : 'flex'} bg-slate-900`}>
                  <Camera className="w-12 h-12 lg:w-16 lg:h-16 opacity-20" />
                  <p className="font-mono text-xs lg:text-sm tracking-widest uppercase text-center px-4">Stream Offline</p>
                </div>
              </div>
            </div>

            {/* Camera Selection Grid */}
            <div className="shrink-0">
              <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-3 lg:gap-4 pb-2 lg:pb-0 snap-x">
                {cameras.map((cam, idx) => (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedCamera(cam.id)}
                    className={`relative p-3 lg:p-4 rounded-xl text-left transition-all duration-200 border bg-white flex flex-col justify-between shrink-0 w-[200px] lg:w-auto snap-center ${
                      selectedCamera === cam.id 
                        ? 'border-[#E31837] shadow-[0_4px_20px_-4px_rgba(227,24,55,0.2)] ring-1 ring-[#E31837]' 
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <div className="bg-slate-100 p-1.5 lg:p-2 rounded-lg">
                        <Camera className={`w-4 h-4 ${selectedCamera === cam.id ? 'text-[#E31837]' : 'text-slate-600'}`} />
                      </div>
                      <div className={`px-1.5 lg:px-2 py-0.5 rounded text-[9px] lg:text-[10px] font-bold uppercase ${cam.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {cam.status === 'active' ? 'LIVE' : 'OFF'}
                      </div>
                    </div>
                    <div className="mt-3 lg:mt-4">
                      <h3 className={`font-bold text-xs lg:text-sm truncate ${selectedCamera === cam.id ? 'text-[#E31837]' : 'text-slate-800'}`}>{cam.name}</h3>
                      <p className="text-[10px] lg:text-xs text-slate-500 mt-0.5 truncate">{cam.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Alert Log */}
          <div className="w-full lg:w-[350px] xl:w-[400px] shrink-0 card-panel flex flex-col overflow-hidden bg-white h-[400px] lg:h-auto">
            <div className="p-4 lg:p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="font-bold text-slate-800 text-base lg:text-lg">Live Alert Log</h2>
              <div className="flex items-center gap-1.5 px-2 lg:px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[9px] lg:text-[10px] font-bold text-green-700 uppercase tracking-wide">Real-time</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-4 lg:space-y-5 bg-slate-50">
              {alerts.map((alert, idx) => (
                <div key={alert.id} className="flex gap-3 lg:gap-4 group relative">
                  {/* Timeline line */}
                  {idx !== alerts.length - 1 && (
                    <div className="absolute left-3.5 lg:left-4 top-10 bottom-[-20px] w-px bg-slate-200 hidden sm:block"></div>
                  )}
                  
                  {/* Severity Icon */}
                  <div className="relative z-10 shrink-0 mt-1 hidden sm:block">
                    <div className={`w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center border shadow-sm ${getSeverityColors(alert.severity)}`}>
                      {alert.severity === 'critical' ? (
                        <AlertTriangle className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      ) : (
                        <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-current"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pb-1">
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-1">
                      <span className="text-[10px] lg:text-xs font-bold text-slate-500 bg-white px-1.5 lg:px-2 py-0.5 rounded border border-slate-200 shadow-sm shrink-0">{alert.time}</span>
                      <h3 className="text-xs lg:text-sm font-bold text-slate-800 leading-tight">{alert.type}</h3>
                    </div>
                    <p className="text-[10px] lg:text-xs text-slate-500 mt-1.5 ml-0 sm:ml-1">{alert.camera}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 lg:p-4 border-t border-slate-100 bg-white text-center shrink-0">
              <button className="text-xs lg:text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">Lihat semua alert →</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
