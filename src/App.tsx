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
  modulo: string;
  fecha: string;
  }
  interface Modulo {
  id: number;
  nombre: string;
}

export default function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  //ventana emergente
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titulo: "",
    url: "",
    modulo_id: 0

  });
  //modulo
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [newModule, setNewModule] = useState({
    nombre: ""
  });
  //
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [selectedModulo, setSelectedModulo] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesCategory =
        selectedModulo === "Todos" || video.modulo === selectedModulo;
      const matchesSearch =
        searchQuery === "" ||
        video.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.modulo.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [videos, selectedModulo, searchQuery]);

  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank", "noopener,noreferrer");
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
    cargarModulos();

  }, []);


    useEffect(() => {
    if (modulos.length > 0) {
      setNewVideo((prev) => ({
        ...prev,
        modulo_id: modulos[0].id
      }));
    }
    }, [modulos]);
//cargar modulos
  const cargarModulos = async () => {
    try {
      const response = await api.get("/modulos"); 
      setModulos(response.data);
    } catch (error) {
      console.error("Error al cargar modulo:", error);
    }
  };


  return (
    <div className="min-h-screen bg-[#010B1E] text-white antialiased">
      <Header />
      <FilterBar
        modulos={modulos}
        selectedModulo={selectedModulo}
        onModuloChange={setSelectedModulo}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddModule={() => setShowModuleModal(true)}
        totalVideos={filteredVideos.length}
      />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 flex justify-between items-center">

          <div>
            <span className="text-xs font-semibold text-[#00A3FF] uppercase tracking-wider block mb-1">
              Índice de Módulos
            </span>

            <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              {selectedModulo === "Todos" ? "Todos los Módulos" : selectedModulo}

              <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-[#00A3FF]/10 text-[#00A3FF] border border-[#00A3FF]/20">
                +{filteredVideos.length} videos disponibles
              </span>
            </h2>
          </div>

          {/* Botón para agregar videos */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-xl border border-[#00A3FF]/20 bg-[#00A3FF]/10 text-[#00A3FF] hover:text-white hover:border-[#00A3FF] hover:bg-[#00A3FF]/20 font-semibold text-sm transition-all duration-200"
          >
            + Agregar Video
          </button>

        </div>

        {/* Mostrar mensaje sin no hay videos */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#1E293B] rounded-2xl bg-[#031435]/30">
            <p className="text-lg text-slate-400">
              No hay videos en este módulo aún
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                title={video.titulo}
                thumbnail={`https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg`}
                videoId={video.youtube_id}
                category={video.modulo}
                date={video.fecha}
                views=""
                duration=""
                onVideoClick={handleVideoClick}
              />
            ))}
          </div>
        )}

      </main>
      <footer className="border-t border-[#111C44] mt-24 py-8 bg-[#020D26]">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Softia Ecosistema — Todos los derechos reservados</p>
        </div>
      </footer>
{/* Ventana emergente para agregar videos */}
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
            {/* Modulo */}
            <select
              className="w-full mb-4 p-2 rounded bg-[#010B1E] border border-[#1E293B]"
              value={newVideo.modulo_id}
              onChange={(e) =>
                setNewVideo({ ...newVideo, modulo_id: Number(e.target.value) })
              }
            >
              {modulos.map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.nombre}
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
                    await cargarVideos();
                    await cargarModulos();
                    setNewVideo({
                      titulo: newVideo.titulo,
                      url: newVideo.url,
                      modulo_id: modulos.length > 0 ? modulos[0].id : 1
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

{/* Ventana emergente para agregar modulos */}
{showModuleModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    
    <div className="bg-[#0B1224] p-6 rounded-2xl w-full max-w-md border border-[#1E293B]">

      <h2 className="text-xl font-bold mb-4">
        Crear nuevo módulo
      </h2>

      {/* INPUT NOMBRE */}
      <input
        type="text"
        placeholder="Nombre del módulo"
        className="w-full mb-4 p-2 rounded bg-[#010B1E] border border-[#1E293B]"
        value={newModule.nombre}
        onChange={(e) =>
          setNewModule({ nombre: e.target.value })
        }
      />

      {/* BOTONES */}
      <div className="flex justify-end gap-2">

        <button
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          onClick={() => setShowModuleModal(false)}
        >
          Cancelar
        </button>

        <button
          className="px-4 py-2 rounded bg-[#00A3FF] text-white hover:bg-[#0085cc]"
          onClick={async () => {
            try {
              const nombreFormateado = newModule.nombre.startsWith("Módulo")
                ? newModule.nombre.trim()
                : `Módulo ${newModule.nombre.trim()}`;

              const response = await api.post("/modulos", {
                nombre: nombreFormateado
              });

              setModulos([...modulos, response.data]);

              setSelectedModulo(nombreFormateado);
              setNewModule({ nombre: "" });
              setShowModuleModal(false);

            } catch (error) {
              console.error("Error creando módulo:", error);
            }
          }}
        >
          Crear
        </button>

      </div>
    </div>
  </div>
)}


    </div>
  );
}