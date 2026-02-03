"use client";

import { useState, useRef, useEffect, useCallback, DragEvent, MouseEvent } from "react";
import { MapInfo } from "@/data/maps";
import { heroes, HeroRole } from "@/data/heroes";
import Image from "next/image";
import Link from "next/link";

interface StrategyBoardProps {
  mapData: MapInfo;
}

interface PlacedHero {
  instanceId: string;
  heroId: string;
  x: number;
  y: number;
}

interface Point {
  x: number;
  y: number;
}

interface DrawingPath {
  tool: string;
  points: Point[];
  color: string;
  width: number;
}

export default function StrategyBoard({ mapData }: StrategyBoardProps) {
  const [selectedRole, setSelectedRole] = useState<HeroRole>('Vanguard');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [placedHeroes, setPlacedHeroes] = useState<PlacedHero[]>([]);
  
  // Drawing State
  const [history, setHistory] = useState<DrawingPath[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const filteredHeroes = heroes.filter(h => h.role === selectedRole);

  // --- Drawing Logic ---
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Helper to draw a path
    const drawPath = (path: DrawingPath) => {
      if (path.points.length < 2) return;
      
      ctx.lineWidth = path.width;
      ctx.strokeStyle = path.color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (path.tool === 'Eraser') {
        ctx.globalCompositeOperation = 'destination-out';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      ctx.beginPath();
      
      if (path.tool === 'Line') {
        // Straight line from start to end
        const start = path.points[0];
        const end = path.points[path.points.length - 1];
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
      } else {
        // Freehand (Pencil or Eraser)
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y);
        }
      }
      ctx.stroke();
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';
    };

    // Draw History
    history.forEach(drawPath);

    // Draw Current Path (preview)
    if (currentPoints.length > 0 && selectedTool) {
      drawPath({
        tool: selectedTool,
        points: currentPoints,
        color: '#f59e0b', // Amber-500 default color for drawing
        width: selectedTool === 'Eraser' ? 20 : 3,
      });
    }
  }, [history, currentPoints, selectedTool]);

  useEffect(() => {
    // Resize canvas to match container
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
        redrawCanvas();
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial size
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawCanvas]); 

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]); // Redraw when history or current drawing changes

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTool) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setIsDrawing(true);
    const startPoint = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setCurrentPoints([startPoint]);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !selectedTool) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setCurrentPoints(prev => [...prev, point]);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentPoints.length > 1 && selectedTool) {
      setHistory(prev => [...prev, {
        tool: selectedTool,
        points: currentPoints,
        color: '#f59e0b',
        width: selectedTool === 'Eraser' ? 20 : 3,
      }]);
    }
    setCurrentPoints([]);
  };
  
  const undoLastAction = () => {
    setHistory(prev => prev.slice(0, -1));
  };


  // --- Drag & Drop Logic ---

  const handleDragStart = (e: DragEvent<HTMLDivElement>, heroId: string) => {
    e.dataTransfer.setData("heroId", heroId);
    e.dataTransfer.effectAllowed = "copy";
  };

  const handlePlacedHeroDragStart = (e: DragEvent<HTMLDivElement>, instanceId: string) => {
    e.stopPropagation(); // Prevent bubbling to parent
    e.dataTransfer.setData("instanceId", instanceId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Case 1: Moving an existing hero
    const instanceId = e.dataTransfer.getData("instanceId");
    if (instanceId) {
      setPlacedHeroes((prev) => 
        prev.map((h) => 
          h.instanceId === instanceId ? { ...h, x, y } : h
        )
      );
      return;
    }

    // Case 2: Placing a new hero from sidebar
    const heroId = e.dataTransfer.getData("heroId");
    if (heroId) {
      const newHero: PlacedHero = {
        instanceId: Math.random().toString(36).substr(2, 9),
        heroId,
        x,
        y,
      };
      setPlacedHeroes((prev) => [...prev, newHero]);
    }
  };

  const removeHero = (instanceId: string) => {
    setPlacedHeroes((prev) => prev.filter(h => h.instanceId !== instanceId));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = e.dataTransfer.types.includes("instanceid") ? "move" : "copy"; 
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-700 flex items-center px-6 bg-zinc-800 justify-between shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ← Back to Maps
          </Link>
          <h1 className="text-xl font-bold text-white border-l border-zinc-600 pl-4">
            {mapData.name} <span className="text-amber-500 text-sm font-normal ml-2">Strategy Board</span>
          </h1>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setPlacedHeroes([])}
             className="text-zinc-400 hover:text-white px-3 py-1.5 text-sm transition-colors"
           >
             Clear Heroes
           </button>
           <button className="bg-zinc-700 hover:bg-zinc-600 px-3 py-1.5 rounded text-sm transition-colors">
             Save Strategy
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Toolbox */}
        <aside className="w-80 bg-zinc-800 border-r border-zinc-700 flex flex-col z-10">
          
          {/* Drawing Tools */}
          <div className="p-4 border-b border-zinc-700">
            <div className="flex justify-between items-center mb-3">
               <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Drawing Tools</h3>
               <button 
                 onClick={undoLastAction}
                 disabled={history.length === 0}
                 className="text-[10px] text-amber-500 hover:text-amber-400 disabled:text-zinc-600 disabled:cursor-not-allowed uppercase"
               >
                 Undo Last
               </button>
            </div>
            
            <div className="grid grid-cols-5 gap-1 mb-2">
              {['Pencil', 'Line', 'Arrow', 'Circle', 'Eraser'].map((tool) => (
                <button 
                  key={tool}
                  onClick={() => setSelectedTool(selectedTool === tool ? null : tool)}
                  className={`p-1.5 rounded text-[10px] text-center transition-colors border ${
                    selectedTool === tool 
                      ? 'bg-amber-600 text-white border-amber-600' 
                      : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-300 border-transparent'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
            {selectedTool && (
               <div className="text-xs text-center text-amber-400/80 italic">
                 Drawing Mode Active
               </div>
            )}
            {!selectedTool && (
               <div className="text-xs text-center text-zinc-500 italic">
                 Drag & Drop / Move Mode
               </div>
            )}
          </div>

          {/* Heroes Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider m-4 mb-2">Heroes</h3>
            
            {/* Role Tabs */}
            <div className="flex px-4 gap-1 mb-2">
              {(['Vanguard', 'Duelist', 'Strategist'] as HeroRole[]).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-t-md transition-colors ${
                    selectedRole === role 
                      ? 'bg-zinc-700 text-amber-500 border-b-2 border-amber-500' 
                      : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-750'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Heroes Grid */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="grid grid-cols-3 gap-2">
                {filteredHeroes.map((hero) => (
                  <div 
                    key={hero.id}
                    className="group relative aspect-square bg-zinc-900 rounded border border-zinc-700 hover:border-amber-500 cursor-grab active:cursor-grabbing transition-colors"
                    title={hero.name}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, hero.id)}
                  >
                    <Image
                      src={hero.image}
                      alt={hero.name}
                      fill
                      className="object-cover rounded opacity-80 group-hover:opacity-100 transition-opacity"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Map Canvas Area */}
        <main 
          ref={containerRef}
          className={`flex-1 bg-zinc-950 relative overflow-hidden group ${selectedTool ? 'cursor-crosshair' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
            {/* Map Image Background */}
            {mapData.image ? (
              <div className="absolute inset-0 select-none pointer-events-none z-0">
                 <Image
                   src={mapData.image}
                   alt={mapData.name}
                   fill
                   className="object-contain"
                   priority
                 />
              </div>
            ) : (
               /* Fallback Text if no image */
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-zinc-700 mb-2">{mapData.name}</h2>
                  <p className="text-zinc-500 text-xl">Drag heroes from the sidebar to place them</p>
                </div>
              </div>
            )}
            
            {/* Drawing Canvas */}
            <canvas
               ref={canvasRef}
               className={`absolute inset-0 z-20 ${selectedTool ? 'pointer-events-auto' : 'pointer-events-none'}`}
               onMouseDown={startDrawing}
               onMouseMove={draw}
               onMouseUp={stopDrawing}
               onMouseLeave={stopDrawing}
            />

            {/* Placed Heroes */}
            {placedHeroes.map((placed) => {
              const heroInfo = heroes.find(h => h.id === placed.heroId);
              if (!heroInfo) return null;

              // Border color based on role
              const borderColor = 
                heroInfo.role === 'Vanguard' ? 'border-blue-500' :
                heroInfo.role === 'Duelist' ? 'border-red-500' :
                'border-green-500';

              return (
                <div
                  key={placed.instanceId}
                  // z-index 30 ensures heroes are above the drawing canvas (so you can drag them even if drawn over, or change z-index if you want to draw over them)
                  // If we want to draw OVER heroes, canvas needs higher z-index. 
                  // But if canvas has higher z-index and is full screen, we can't drag heroes unless pointer-events-none is set on canvas.
                  // Current Logic: 
                  // - Tool Selected: Canvas is z-20, pointer-events-auto. Heroes (z-10) are underneath but visible. Cannot be dragged.
                  // - No Tool: Canvas is z-20, pointer-events-none. Heroes (z-10) are accessible.
                  className={`absolute w-10 h-10 rounded-full border-2 ${borderColor} overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-move z-10`}
                  style={{
                    left: placed.x - 20, // Center the icon (width/2)
                    top: placed.y - 20,  // Center the icon (height/2)
                  }}
                  title={`${heroInfo.name} (Right-click to remove)`}
                  draggable="true" // Only draggable if canvas doesn't block events
                  onDragStart={(e) => handlePlacedHeroDragStart(e, placed.instanceId)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    removeHero(placed.instanceId);
                  }}
                >
                  <Image
                    src={heroInfo.image}
                    alt={heroInfo.name}
                    fill
                    className="object-cover"
                    draggable="false" // Prevent native drag of the image itself inside the canvas
                  />
                </div>
              );
            })}
        </main>
      </div>
    </div>
  );
}
