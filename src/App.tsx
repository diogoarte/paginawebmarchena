import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { FilterBar } from "./components/FilterBar";
import { VideoCard } from "./components/VideoCard";
import api from "./services/api";


  interface Video {
  id: number;
  titulo: string;
  youtube_id: string;
  url: string;
  categoria: string;
  fecha: string;
  }

export default function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  //ventana emergente
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titulo: "",
    url: "",
    categoria: "Módulo Tesis"
  });

  const [categories, setCategories] = useState([
    "Módulo Tesis",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        selectedCategory === "Todos" || video.categoria === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        video.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.categoria.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedCategory, searchQuery]);

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
  //Cargar videos
  const cargarVideos = async () => {
    try {
      const response = await api.get("/videos");
      console.log("Respuesta del backend:");
      console.log(response.data);

      setVideos(response.data);
    } catch (error) {
      console.error("Error al cargar videos:", error);
    }
  };
  useEffect(() => {
    cargarVideos();
  }, []);

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
          <div className="mb-8 flex justify-between items-center">
            {/* Lado izquierdo */}
            <div>
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

            {/* Lado derecho */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 rounded-xl border border-[#00A3FF]/20 bg-[#00A3FF]/10 text-[#00A3FF] hover:text-white hover:border-[#00A3FF] hover:bg-[#00A3FF]/20 font-semibold text-sm transition-all duration-200"
            >
              + Agregar Video
            </button>
          </div>

            {/* VIDEOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.titulo}
                  thumbnail={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                  videoId={video.youtube_id}
                  category={video.categoria}
                  date={video.fecha}
                  views=""
                  duration=""
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

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0B1224] p-6 rounded-2xl w-full max-w-md border border-[#1E293B]">
            <h2 className="text-xl font-bold mb-4">Agregar Video</h2>
            {/* Título */}
            <input
              type="text"
              placeholder="Título del video"
              className="w-full mb-3 p-2 rounded bg-[#010B1E] border border-[#1E293B]"
              value={newVideo.titulo}
              onChange={(e) =>
                setNewVideo({ ...newVideo, titulo: e.target.value })
              }
            />
            {/* URL */}
            <input
              type="text"
              placeholder="URL de YouTube"
              className="w-full mb-3 p-2 rounded bg-[#010B1E] border border-[#1E293B]"
              value={newVideo.url}
              onChange={(e) =>
                setNewVideo({ ...newVideo, url: e.target.value })
              }
            />
            {/* Categoría */}
            <select
              className="w-full mb-4 p-2 rounded bg-[#010B1E] border border-[#1E293B]"
              value={newVideo.categoria}
              onChange={(e) =>
                setNewVideo({ ...newVideo, categoria: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Botones */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded bg-[#00A3FF] text-white hover:bg-[#0085cc]"
                onClick={async () => {
                  try {
                    await api.post("/videos", newVideo);
                    await cargarVideos(); // refrescar lista
                    setNewVideo({
                      titulo: "",
                      url: "",
                      categoria: "Módulo Tesis"
                    });
                    setShowModal(false);
                  } catch (error) {
                    console.error("Error al agregar video:", error);
                  }
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}