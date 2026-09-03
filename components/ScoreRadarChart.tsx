"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface ScoreRadarChartProps {
  technical: number;
  communication: number;
  problemSolving: number;
  relevance: number;
  confidence: number;
}

export function ScoreRadarChart(props: ScoreRadarChartProps) {
  const data = [
    { dimension: "Technical", score: props.technical },
    { dimension: "Communication", score: props.communication },
    { dimension: "Problem Solving", score: props.problemSolving },
    { dimension: "Relevance", score: props.relevance },
    { dimension: "Confidence", score: props.confidence }
  ];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data}>
        <PolarGrid stroke="#232B3B" />
        <PolarAngleAxis dataKey="dimension" tick={{ fill: "#8B94A8", fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#8B94A8", fontSize: 10 }} />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#2DD4BF"
          fill="#2DD4BF"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
