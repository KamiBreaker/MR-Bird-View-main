import { maps } from "@/data/maps";
import { notFound } from "next/navigation";
import StrategyBoard from "@/components/StrategyBoard";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MapStrategyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const mapData = maps.find((m) => m.id === resolvedParams.id);

  if (!mapData) {
    notFound();
  }

  return <StrategyBoard mapData={mapData} />;
}