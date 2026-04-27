"use client";
import dynamic from "next/dynamic";

const AttentionAssessment = dynamic(
  () => import("./AttentionAssessment"),
  { ssr: false }
);

export default function Page() {
  return <AttentionAssessment />;
}
