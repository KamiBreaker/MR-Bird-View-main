import { maps } from "@/data/maps";
import { notFound } from "next/navigation";
import StrategyBoard from "@/components/StrategyBoard";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const mapData = maps.find((m) => m.id === resolvedParams.id);
  
  if (!mapData) {
    return {
      title: "Map Not Found",
    };
  }

  return {
    title: `${mapData.name} - Marvel Rivals Bird View`,
    description: `Tactical Bird's Eye View & Strategy Planner for ${mapData.name} in Marvel Rivals`,
  };
}

export default async function MapStrategyPage({ params }: PageProps) {
  const resolvedParams = await params;
  const mapData = maps.find((m) => m.id === resolvedParams.id);

  if (!mapData) {
    notFound();
  }

  return <StrategyBoard mapData={mapData} />;
}