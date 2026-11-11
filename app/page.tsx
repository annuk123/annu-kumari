import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import BuildLog from "@/components/sections/BuildLog";
import About from "@/components/sections/About";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <BuildLog />
      <About />
      <Contact />
    </>
  );
}