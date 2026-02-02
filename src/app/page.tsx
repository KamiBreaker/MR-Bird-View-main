import { maps, GameMode } from "@/data/maps";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const modes: GameMode[] = ['Convergence', 'Domination', 'Convoy'];

  return (
    <main className="min-h-screen p-8 bg-zinc-900 text-zinc-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-amber-500">Marvel Rivals Maps</h1>
          <p className="text-zinc-400">Tactical Bird&apos;s Eye View & Strategy Planner</p>
        </header>

        <div className="space-y-12">
          {modes.map((mode) => (
            <section key={mode}>
              <h2 className="text-2xl font-semibold mb-6 border-b border-zinc-700 pb-2 pl-2">
                {mode}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maps
                  .filter((map) => map.mode === mode)
                  .map((map) => (
                    <div 
                      key={map.id} 
                      className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-750 transition-colors border border-zinc-700 shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-white mb-1">{map.name}</h3>
                      <p className="text-sm text-amber-400/80 uppercase tracking-wider font-semibold">
                        {map.region !== 'Unknown' ? map.region : 'Unknown Region'}
                      </p>
                      
                      {/* Map Preview or Placeholder */}
                      {map.previewImage ? (
                        <div className="mt-4 w-full h-40 relative rounded overflow-hidden border border-zinc-700 group-hover:border-zinc-500 transition-colors">
                          <Image
                            src={map.previewImage}
                            alt={`${map.name} preview`}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      ) : (
                        <div className="mt-4 w-full h-40 bg-zinc-900/50 rounded flex items-center justify-center border border-dashed border-zinc-600">
                          <span className="text-zinc-500 text-sm">Map View Coming Soon</span>
                        </div>
                      )}
                      
                      <div className="mt-4 flex gap-2">
                        <Link 
                          href={`/map/${map.id}`}
                          className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-sm py-2 px-4 rounded transition-colors text-center"
                        >
                          Plan Strategy
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}