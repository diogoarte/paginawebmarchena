import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { VideoCard } from "./components/VideoCard";

const VIDEOS = [
  {
    id: "IhGvxbFmR5s",
    title: "Registro de Plan de Tesis",
    thumbnail: "https://i.ytimg.com/vi/IhGvxbFmR5s/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "6.1K",
    duration: "01:03",
  },
  {
    id: "Ur27Qr46Jss",
    title: "Asignación de Dictaminadores",
    thumbnail: "https://i.ytimg.com/vi/Ur27Qr46Jss/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "5.1K",
    duration: "1:09",
  },
  {
    id: "5AJOT3VsYfc",
    title: "Observación de Plan de Tesis",
    thumbnail: "https://i.ytimg.com/vi/5AJOT3VsYfc/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "4.1K",
    duration: "1:21",
  },
    {
    id: "Ov-RX72Lzfk",
    title: "Levantar Observaciones",
    thumbnail: "https://i.ytimg.com/vi/Ov-RX72Lzfk/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "3.8K",
    duration: "1:18",
  },
  {
    id: "K3AooWiMFng",
    title: "Aprobación de Plan de Tesis",
    thumbnail: "https://img.youtube.com/vi/K3AooWiMFng/maxresdefault.jpg",
    category: "Módulo Tesis",
    date: "19 Jun 2026",
    views: "1.5K",
    duration: "1:01",
  },
  {
    id: "",
    title: "",
    thumbnail: "",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "3.1K",
    duration: "12:45",
  },
  {
    id: "L0g7Ik8no0Y",
    title: "Fin de Asesoría",
    thumbnail: "https://i.ytimg.com/vi/L0g7Ik8no0Y/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "3.5K",
    duration: "0:56",
  },
  {
    id: "Asignación del Tercer Jurado",
    title: "RhP28BOn7R8",
    thumbnail: "https://i.ytimg.com/vi/RhP28BOn7R8/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "1.4K",
    duration: "0:53",
  },
  {
    id: "_ClHff0RBts",
    title: "Aprobar Borrador de Tesis",
    thumbnail: "https://i.ytimg.com/vi/_ClHff0RBts/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "2.1K",
    duration: "0:55",
  },
  {
    id: "lWF0hYQnPdA",
    title: "Registro de Sustentación",
    thumbnail: "https://i.ytimg.com/vi/lWF0hYQnPdA/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "3.3K",
    duration: "1:11",
  },
  {
    id: "B43LhhMSe8Q",
    title: "Módulo de Gestión de Calidad",
    thumbnail: "https://i.ytimg.com/vi/B43LhhMSe8Q/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "18 Jun 2026",
    views: "2.8K",
    duration: "1:52",
  },
  {
    id: "ElnRCZBU7rM",
    title: "Seguimiento de Metas",
    thumbnail: "https://i.ytimg.com/vi/eUTECWjkrA8/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "1.4K",
    duration: "1:34",
  },
  {
    id: "-9sAEqtY3rA",
    title: "Investigación, Desarrollo e Investigación",
    thumbnail: "https://i.ytimg.com/vi/-9sAEqtY3rA/hqdefault.jpg",
    category: "Módulo Tesis",
    date: "17 Jun 2026",
    views: "2.1K",
    duration: "1:03",
  },

];

export default function App() {
  const [categories, setCategories] = useState([
    "Módulo Tesis",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return VIDEOS.filter((video) => {
      const matchesCategory =
        selectedCategory === "Todos" || video.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank", "noopener,noreferrer");
  };

  const handleAddModule = () => {
    const nuevoModulo = prompt("Ingresa el nombre del nuevo módulo para el ecosistema:");
    if (nuevoModulo && nuevoModulo.trim() !== "") {
      const nombreFormateado = nuevoModulo.startsWith("Módulo") 
        ? nuevoModulo.trim() 
        : `Módulo ${nuevoModulo.trim()}`;
      
      if (!categories.includes(nombreFormateado)) {
        setCategories([...categories, nombreFormateado]);
        setSelectedCategory(nombreFormateado);
      } else {
        alert("Este módulo ya existe.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#010B1E] text-white antialiased">
      <Header />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddModule={handleAddModule}
        totalVideos={filteredVideos.length}
      />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#1E293B] rounded-2xl bg-[#031435]/30">
            <p className="text-lg text-slate-400">
              No se encontraron videos disponibles en este módulo
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="text-xs font-semibold text-[#00A3FF] uppercase tracking-wider block mb-1">
                Índice de Módulos
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                {selectedCategory === "Todos" ? "Todos los Módulos" : selectedCategory}
                <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20">
                  +{filteredVideos.length} videos disponibles
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  videoId={video.id}
                  category={video.category}
                  date={video.date}
                  views={video.views}
                  duration={video.duration}
                  onVideoClick={handleVideoClick}
                />
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="border-t border-[#111C44] mt-24 py-8 bg-[#020D26]">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Softia Ecosistema — Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
}