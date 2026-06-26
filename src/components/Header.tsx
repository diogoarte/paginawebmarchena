import logo from "../../public/Softia-Blanco.svg";

export function Header (){
  return (
    <header className="border-b border-[#111C44] bg-[#010B1E]/80 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div >
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
              Ecosistema de videos
            </h1>

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