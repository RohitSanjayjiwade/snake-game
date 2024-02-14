import SnakeGrid from "@/components/SnakeGrid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-sky-200 flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="border-2 text-3xl border-purple-800 py-2 px-24 border-dashed bg-yellow-400  font-bold">Snake Game</h1>
      <SnakeGrid />
    </main>
  );
}
