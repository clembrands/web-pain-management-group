"use client";
import dynamic from "next/dynamic";
const ConfiguredStudio = dynamic(() => import("./configured-studio"), {
  ssr: false,
});
export function Studio() {
  return <ConfiguredStudio />;
}
