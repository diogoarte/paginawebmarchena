interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoId: string;
  category: string;
  date: string;
  views: string;
  duration: string;
  onVideoClick: (id: string) => void;
}

export function VideoCard({
  title,
  thumbnail,
  videoId,
  category,
  date,
  views,
  duration,
  onVideoClick,
}: VideoCardProps) {
  const getBadgeStyle = (cat: string) => {
    if (cat.includes("Tesis")) return "bg-[#00A3FF]/10 text-[#00A3FF] border-[#00A3FF]/20";
    if (cat.includes("Finansoft")) return "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20";
    return "bg-[#AB47BC]/10 text-[#AB47BC] border-[#AB47BC]/20";
  };

  return (
    <div 
      onClick={() => onVideoClick(videoId)}
      className="group bg-[#041231] border border-[#112147] hover:border-[#007BFF]/50 rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[11px] font-bold px-2 py-0.5 rounded-md tracking-wider">
          {duration}
        </span>
        <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md border backdrop-blur-md ${getBadgeStyle(category)}`}>
          ● {category.replace("Módulo ", "")}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="font-bold text-base line-clamp-2 text-slate-100 group-hover:text-white transition-colors tracking-tight leading-snug">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium border-t border-[#12224A] pt-3">
          <span className="flex items-center gap-1">👁️ {views}</span>
          <span className="text-slate-600">•</span>
          <span>📅 {date}</span>
        </div>
      </div>
    </div>
  );
}