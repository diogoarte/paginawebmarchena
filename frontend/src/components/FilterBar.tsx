interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddModule: () => void;
  totalVideos: number;
}

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onAddModule,
  totalVideos,
}: FilterBarProps) {
  return (
    <div className="bg-[#020D26] border-b border-[#111C44] py-6 sticky top-20 z-40">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onCategoryChange("Todos")}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
              selectedCategory === "Todos"
                ? "bg-[#007BFF] text-white shadow-lg shadow-blue-500/20 scale-105"
                : "bg-[#0A1631] text-slate-400 hover:text-white hover:bg-[#102144]"
            }`}
          >
            Todos
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-bold ${
              selectedCategory === "Todos" ? "bg-white/20 text-white" : "bg-[#16284E] text-slate-400"
            }`}>
              {totalVideos}
            </span>
          </button>

          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#007BFF] text-white shadow-lg shadow-blue-500/20 scale-105"
                  : "bg-[#0A1631] text-slate-400 hover:text-white hover:bg-[#102144]"
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            type="button"
            onClick={onAddModule}
            className="px-5 py-2.5 rounded-xl border border-dashed border-slate-600 text-slate-400 hover:text-white hover:border-[#00A3FF] hover:bg-[#00A3FF]/5 font-semibold text-sm transition-all duration-200 flex items-center gap-1.5"
          >
            <span className="text-base font-bold">+</span> Agregar Módulo
          </button>
        </div>

        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar en el ecosistema..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#05112A] text-sm text-white placeholder-slate-500 rounded-xl border border-[#16274E] focus:outline-none focus:border-[#007BFF] focus:ring-1 focus:ring-[#007BFF] transition-all"
          />
        </div>
      </div>
    </div>
  );
}