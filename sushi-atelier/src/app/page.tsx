import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Journey from "@/components/Journey";
import Craft from "@/components/Craft";
import Chef from "@/components/Chef";
import Menu from "@/components/Menu";
import Reserve from "@/components/Reserve";

export default function Home() {
  return (
    <main>
      <Loader />
      <Hero />
      <Philosophy />
      <Journey />
      <Craft />
      <Chef />
      <Menu />
      <Reserve />
    </main>
  );
}
