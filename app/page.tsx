import Hero from "@/components/sections/hero";
import About from "@/components/sections/About";
import ProjectsPage from "@/components/sections/projects";
import ServicesPage from "@/components/sections/services";
import NowPage from "@/components/sections/now";
import Notes from "./notes/page";
import ContactPage from "@/components/sections/contact";
import PhotographyPage from "@/components/sections/photography";
import JapaneseSection from "@/components/sections/JapaneseSection";
export default function Home() {
  return (
    <main>


<Hero />

<About />

<ProjectsPage />

<ServicesPage />
<Notes />
<NowPage />

<JapaneseSection />
<PhotographyPage />

<ContactPage />



{/*       
     <Image src="/image.png" alt="Profile Picture" width={130} height={130}></Image>
     <p className="font-medium">I'm Annu Kumari</p>
      <p className="leading-relaxed">
        I build small, focused software products.
        <br />
        Currently exploring AI, distribution, and long-term leverage.
      </p>

      <p className="space-x-2">
        <Link href="/about" id="color">About</Link>
        <span>·</span>
        <Link href="/now" id="color">Now</Link>
        <span>·</span>
        <Link href="/projects" id="color">Projects</Link>
        <span>·</span>
        <Link href="/notes" id="color">Notes & Build Thoughts</Link>
      </p>
      <p className="text-sm">
        <Link id="color" href="https://github.com/annuk123">GitHub</Link> ·{" "}
        <Link id="color" href="https://x.com/Annu66126617">X</Link> ·{" "}
        <Link id="color" href="mailto:anuk35168@gmail.com">Email</Link> ·{" "}
        <Link id="color" href="https://www.linkedin.com/in/annu-kumari-540337237/">LinkedIn</Link> · {" "}
        <Link id="color" href="https://www.youtube.com/@nexralab-ai">YouTube</Link> · {" "}
        <Link id="color" href="https://www.instagram.com/solopreneur_annu">Instagram</Link>
      </p> */}
    </main>
  );
}
