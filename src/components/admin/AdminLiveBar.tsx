import React from 'react';
import { useMedia } from '../../context/MediaContext';
import { Sliders, Download, Lock } from 'lucide-react';

export const AdminLiveBar: React.FC = () => {
  const {
    isAdminAuthenticated,
    setIsAdminOpen,
    logoutAdmin,
    totalCustomOverridesCount,
    exportConfigurationJSON
  } = useMedia();

  if (!isAdminAuthenticated) return null;

  const handleDownloadBackup = () => {
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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 animate-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 bg-[#0B0D11]/90 backdrop-blur-xl border border-[#C5A059]/40 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white text-xs">
        
        {/* Status indicator */}
        <div className="flex items-center gap-1.5 pl-1 font-mono text-[11px] text-[#C5A059]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A059] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A059]" />
          </span>
          <span className="font-bold tracking-wider uppercase hidden sm:inline">Curator Studio</span>
        </div>

        <span className="text-white/20 hidden sm:inline">|</span>

        {/* Custom Overrides Badge */}
        {totalCustomOverridesCount > 0 ? (
          <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/30 text-[#F3E5AB] font-mono text-[10px]">
            {totalCustomOverridesCount} draft override{totalCustomOverridesCount === 1 ? '' : 's'}
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/50 font-mono text-[10px] hidden md:inline">
            Default master build
          </span>
        )}

        {/* Open Studio Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#C5A059] to-[#E2C785] text-[#08090A] font-bold text-[11px] uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-sm"
        >
          <Sliders className="w-3 h-3" />
          <span>Edit Site</span>
        </button>

        {/* Quick Export JSON */}
        <button
          onClick={handleDownloadBackup}
          className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          title="Export JSON Configuration Backup"
          aria-label="Export Backup"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Lock / Logout */}
        <button
          onClick={logoutAdmin}
          className="p-1.5 rounded-full hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-colors cursor-pointer"
          title="Lock & Exit Studio"
          aria-label="Logout"
        >
          <Lock className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
