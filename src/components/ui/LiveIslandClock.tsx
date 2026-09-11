import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sunset, Compass } from 'lucide-react';

export const LiveIslandClock: React.FC = () => {
  const [timeString, setTimeString] = useState('');
  const [solarStatus, setSolarStatus] = useState<{ label: string; icon: React.ReactNode; tone: string }>({
    label: 'Tropical Sun',
    icon: <Sun className="w-3.5 h-3.5 text-[#F3E5AB]" />,
    tone: 'text-[#F3E5AB]'
  });

  useEffect(() => {
    const updateTime = () => {
      // Calculate Sri Lanka Standard Time (UTC+5:30)
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const slTime = new Date(utcTime + 5.5 * 3600000);

      const hours = slTime.getHours();
      const minutes = slTime.getMinutes().toString().padStart(2, '0');
      const seconds = slTime.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

      setTimeString(`${formattedHours}:${minutes}:${seconds} ${ampm}`);

      if (hours >= 5 && hours < 7) {
        setSolarStatus({
          label: 'Misty Dawn',
          icon: <Sun className="w-3.5 h-3.5 text-[#FDBA74]" />,
          tone: 'text-[#FDBA74]'
        });
      } else if (hours >= 7 && hours < 16) {
        setSolarStatus({
          label: 'Tropical Sun',
          icon: <Sun className="w-3.5 h-3.5 text-[#FDE047]" />,
          tone: 'text-[#FDE047]'
        });
      } else if (hours >= 16 && hours < 19) {
        setSolarStatus({
          label: 'Golden Twilight',
          icon: <Sunset className="w-3.5 h-3.5 text-[#FB7185]" />,
          tone: 'text-[#FB7185]'
        });
      } else {
        setSolarStatus({
          label: 'Starlight Sky',
          icon: <Moon className="w-3.5 h-3.5 text-[#38BDF8]" />,
          tone: 'text-[#38BDF8]'
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeString) return null;

  return (
    <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full glass-obsidian border border-white/10 text-xs font-mono backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        <span className="text-[#A5B4FC] font-semibold tracking-wider">SLST (UTC+5:30)</span>
      </div>

      <span className="text-white/20">|</span>

      <div className="flex items-center gap-1.5 text-white/90 font-medium">
        <span>{timeString}</span>
      </div>

      <span className="text-white/20 hidden sm:inline">|</span>

      <div className={`hidden sm:flex items-center gap-1.5 ${solarStatus.tone}`}>
        {solarStatus.icon}
        <span className="tracking-wide text-[11px]">{solarStatus.label}</span>
      </div>

      <span className="text-white/20 hidden md:inline">|</span>

      <div className="hidden md:flex items-center gap-1 text-white/50 text-[11px]">
        <Compass className="w-3 h-3 text-[#C5A059]" />
        <span>7.8731° N, 80.7718° E</span>
      </div>
    </div>
  );
};
