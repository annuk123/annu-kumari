import Hero from "@/components/sections/hero";
import About from "@/components/sections/About";
import ProjectsPage from "@/components/sections/projects";
import Notes from "./notes/page";
import ContactPage from "@/components/sections/contact";
export default function Home() {
  return (
    <main>


<Hero />



<ProjectsPage />
<Notes />
<About />


<ContactPage />

    </main>
  );
}
