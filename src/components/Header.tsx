interface HeaderProps {
  channelName?: string;
}

export function Header({ channelName = "ECOSISTEMA DE VIDEOS" }: HeaderProps) {
  return (
    <header className="border-b border-[#111C44] bg-[#010B1E]/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#0055FF] to-[#00A3FF] flex items-center justify-center font-black text-white text-lg tracking-tighter shadow-md shadow-blue-500/20">
            S
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              Softia
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">
              {channelName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] text-xs font-semibold tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00C853] animate-pulse"></span>
            EN LÍNEA
          </div>
        </div>
      </div>
    </header>
  );
}