import React, { useState } from 'react';
import { Download, Maximize2, X, Sparkles, Sun, Moon } from 'lucide-react';
import './App.css';

const wallpapers = [
  {
    id: 1,
    title: "La Gran Ola",
    url: "/wallpapers/images/Mar.jpg",
    category: "Arte",
    type: "image"
  },
  {
    id: 2,
    title: "Esqueleto farmeando aura",
    url: "/wallpapers/images/Wallpaper skeleton bw.jpg",
    category: "Oscuro",
    type: "image"
  },
  {
    id: 3,
    title: "Jesus",
    url: "/wallpapers/images/Jesus.jpg",
    category: "Luz",
    type: "image"
  },
  {
    id: 4,
    title: "Lechuza Blanca - Deftones",
    url: "/wallpapers/images/Deftones.jpg",
    category: "Música",
    type: "image"
  },
  {
    id: 5,
    title: "Calavera fisura",
    url: "/wallpapers/images/Skeleton.jpg",
    category: "Arte",
    type: "image"
  },
  {
    id: 6,
    title: "Walter white skater",
    url: "/wallpapers/images/Walter white.jpg",
    category: "Urbano",
    type: "image"
  },
  {
    id: 7,
    title: "Shrek Windows XP",
    url: "/wallpapers/images/Shrek.jpg",
    category: "Memes",
    type: "image"
  },
  {
    id: 8,
    title: "Attack on Titan",
    url: "/wallpapers/gifs/Attack on titan.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 9,
    title: "Berserk Eclipse",
    url: "/wallpapers/gifs/Berserk.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 10,
    title: "Guts",
    url: "/wallpapers/gifs/Berserk 2.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 11,
    title: "Bola Espacial de aura",
    url: "/wallpapers/gifs/Circle black white.gif",
    category: "Space",
    type: "gif"
  },
  {
    id: 12,
    title: "Death Note",
    url: "/wallpapers/gifs/Death note.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 13,
    title: "Evangelion",
    url: "/wallpapers/gifs/Evangelion.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 14,
    title: "Evangelion 2",
    url: "/wallpapers/gifs/Evangelion 2.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 15,
    title: "One Punch Man",
    url: "/wallpapers/gifs/One Punch Man.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 16,
    title: "Tokyo Ghoul",
    url: "/wallpapers/gifs/Tokyo Ghoul.gif",
    category: "Anime",
    type: "gif"
  },
  {
    id: 17,
    title: "???",
    url: "/wallpapers/gifs/Wallapeper bw.gif",
    category: "Animado",
    type: "gif"
  },
  {
    id: 18,
    title: "Hand Animation",
    url: "/wallpapers/gifs/Wallpaper hand wb.gif",
    category: "Animado",
    type: "gif"
  },
  {
    id: 19,
    title: "Human bw",
    url: "/wallpapers/gifs/Wallpaper human bw.gif",
    category: "Animado",
    type: "gif"
  },
  {
    id: 20,
    title: "Moon conquist",
    url: "/wallpapers/gifs/Wallpaper moon bw.gif",
    category: "Animado",
    type: "gif"
  },
  {
    id: 21,
    title: "Sword loop",
    url: "/wallpapers/gifs/Wallpaper sword bw.gif",
    category: "Animado",
    type: "gif"
  },
  {
    id: 22,
    title: "Anime girl eyes",
    url: "/wallpapers/videos/Anime girl.mp4",
    category: "Videos",
    type: "video"
  }
];

const categories = ["Todos", ...new Set(wallpapers.map(w => w.category))];

function WallpaperGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [previewWallpaper, setPreviewWallpaper] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const filteredWallpapers = selectedCategory === "Todos" 
    ? wallpapers 
    : wallpapers.filter(w => w.category === selectedCategory);

const handleDownload = async (wallpaper) => {
  try {
    // Fetch el archivo como blob para mantener el formato original
    const response = await fetch(wallpaper.url);
    const blob = await response.blob();
    
    // Determinar extensión correcta
    const extension = wallpaper.type === 'video' ? 'mp4' : 
                     wallpaper.type === 'gif' ? 'gif' : 'jpg';
    const filename = `${wallpaper.title}.${extension}`;
    
    // Crear URL temporal del blob
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Crear link de descarga
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    
    // Trigger descarga
    document.body.appendChild(link);
    link.click();
    
    // Limpiar inmediatamente después del click
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
    
  } catch (error) {
    console.error('Error al descargar:', error);
    alert('Error al descargar. Intentá de nuevo.');
  }
};

React.useEffect(() => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 3 + 1
    });
  }
  
function animate() {
  // Limpiar completamente el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Color de las partículas y líneas según el modo
  ctx.fillStyle = isDarkMode ? 'rgba(107, 114, 128, 0.8)' : 'rgba(59, 130, 246, 0.8)';
  ctx.strokeStyle = isDarkMode ? 'rgba(107, 114, 128, 0.3)' : 'rgba(59, 130, 246, 0.3)';
  
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Conectar partículas cercanas
    particles.forEach((p2, j) => {
      if (i !== j) {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });
  });
  
  requestAnimationFrame(animate);
}
  animate();
  
  const handleResize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [isDarkMode]);

  return (
  <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
    {/* Canvas animado */}
    <canvas 
      id="bg-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <Sparkles size={32} />
              </div>
              <div>
                <h1 className="title">WallpaperHub</h1>
                <p className="subtitle">Personaliza tu escritorio</p>
              </div>
            </div>
            
            <div className="header-actions">
              <div className="counter">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{wallpapers.length} Fondos</span>
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="theme-toggle"
                title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Categorías */}
      <div className="categories-section">
        <div className="container">
          <div className="categories">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Galería */}
      <div className="gallery-section">
        <div className="container">
          <div className="gallery">
            {filteredWallpapers.map(wallpaper => (
              <div
                key={wallpaper.id}
                className="card"
                onMouseEnter={() => setHoveredId(wallpaper.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="card-image">
                  {wallpaper.type === 'video' ? (
                    <video
                      src={wallpaper.url}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="card-video"
                    />
                  ) : (
                    <img
                      src={wallpaper.url}
                      alt={wallpaper.title}
                    />
                  )}
                </div>
                <div className={`card-overlay ${hoveredId === wallpaper.id ? 'visible' : ''}`}>
                  <div className="card-content">
                    <h3 className="card-title">{wallpaper.title}</h3>
                    <p className="card-category">{wallpaper.category}</p>
                    
                    <div className="card-actions">
                      <button
                        onClick={() => setPreviewWallpaper(wallpaper)}
                        className="btn btn-secondary"
                      >
                        <Maximize2 size={20} />
                        Vista Previa
                      </button>
                      <button
                        onClick={() => handleDownload(wallpaper)}
                        className="btn btn-primary"
                      >
                        <Download size={20} />
                        Descargar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-badge">{wallpaper.category}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      {previewWallpaper && (
        <div className="modal-overlay" onClick={() => setPreviewWallpaper(null)}>
          <button
            onClick={() => setPreviewWallpaper(null)}
            className="modal-close"
          >
            <X size={24} />
          </button>

          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-inner">
              {previewWallpaper.type === 'video' ? (
                <video
                  src={previewWallpaper.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="modal-video"
                  controls
                />
              ) : (
                <img
                  src={previewWallpaper.url}
                  alt={previewWallpaper.title}
                  className="modal-image"
                />
              )}
              <div className="modal-info">
                <div className="modal-header">
                  <h2 className="modal-title">{previewWallpaper.title}</h2>
                  {previewWallpaper.type === 'gif' && (
                    <span className="modal-badge gif-badge">GIF</span>
                  )}
                  {previewWallpaper.type === 'video' && (
                    <span className="modal-badge video-badge">VIDEO</span>
                  )}
                </div>
                <p className="modal-category">{previewWallpaper.category}</p>
                <button
                  onClick={() => handleDownload(previewWallpaper)}
                  className="btn btn-primary btn-large"
                >
                  <Download size={24} />
                  Descargar Fondo de Pantalla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
<footer className="footer">
  <div className="container">
    <div className="footer-content">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <Sparkles size={24} />
          </div>
          <div>
            <h3 className="footer-title">WallpaperHub</h3>
            <p className="footer-tagline">Tu destino para fondos épicos</p>
          </div>
        </div>
        
        <div className="footer-stats">
          <div className="stat">
            <span className="stat-number">{wallpapers.length}</span>
            <span className="stat-label">Wallpapers</span>
          </div>
          <div className="stat">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">Categorías</span>
          </div>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p className="footer-credit">
          Diseñado y desarrollado con amor por <strong>Kenta</strong>
        </p>
        <p className="footer-copyright">
          © {new Date().getFullYear()} WallpaperHub. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};  
export default WallpaperGallery;