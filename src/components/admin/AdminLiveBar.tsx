import React, { useState } from 'react';
import { useMedia } from '../../context/MediaContext';
import { Sliders, Download, Lock, ChevronRight, ChevronLeft, ShieldCheck } from 'lucide-react';

export const AdminLiveBar: React.FC = () => {
  const {
    isAdminAuthenticated,
    setIsAdminOpen,
    logoutAdmin,
    totalCustomOverridesCount,
    exportConfigurationJSON
  } = useMedia();

  const [isMinimized, setIsMinimized] = useState(false);

  if (!isAdminAuthenticated) return null;

  const handleDownloadBackup = (e: React.MouseEvent) => {
    e.stopPropagation();
    const json = exportConfigurationJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `serendib-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <aside
      aria-label="Admin Studio Live Bar"
      className="fixed bottom-6 left-6 z-[9998] animate-in slide-in-from-bottom-4 duration-500 font-sans select-none"
    >
      {isMinimized ? (
        /* Minimized golden badge */
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#08090C]/95 border border-[#C5A059] shadow-[0_10px_35px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-[#C5A059] hover:text-[#F3E5AB] transition-all cursor-pointer group"
          title="Expand Curator Studio HUD"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
          </span>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Studio</span>
          <ChevronRight className="w-3.5 h-3.5 text-white/50 group-hover:translate-x-0.5 transition-transform" />
        </button>
      ) : (
        /* Full floating live HUD bar */
        <div className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 bg-[#090B0E]/95 backdrop-blur-2xl border border-[#C5A059]/50 rounded-full shadow-[0_15px_45px_rgba(0,0,0,0.95)] text-white text-xs">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 pl-0.5 font-mono text-[11px] text-[#C5A059]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
            </span>
            <span className="font-bold tracking-wider uppercase">Curator Studio</span>
          </div>

          <span className="text-white/20">|</span>

          {/* Overrides Badge */}
          {totalCustomOverridesCount > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#F3E5AB] font-mono text-[10px]">
              {totalCustomOverridesCount} draft{totalCustomOverridesCount === 1 ? '' : 's'}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 font-mono text-[10px] hidden sm:inline">
              Master build
            </span>
          )}

          {/* Edit Studio Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E2C785] text-[#08090A] font-bold text-[11px] uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-sm"
          >
            <Sliders className="w-3 h-3" />
            <span>Edit Site</span>
          </button>

          {/* Quick Export JSON Backup */}
          <button
            onClick={handleDownloadBackup}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="Export JSON Configuration Backup"
            aria-label="Export Backup"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Lock & Exit */}
          <button
            onClick={logoutAdmin}
            className="p-1.5 rounded-full hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
            title="Lock & Exit Studio"
            aria-label="Logout"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          {/* Minimize Chevron */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors cursor-pointer"
            title="Minimize Bar"
            aria-label="Minimize"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

        </div>
      )}
    </aside>
  );
};
