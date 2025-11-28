import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import About from '../components/About';
import Contact from '../components/Contact';
import Technologies from '../components/Technologies';
import MediumArticles from '../components/MediumArticles';
import ScrollProgress from '../components/ScrollProgress';

export default function Home() {
  return (
  <main className="min-h-screen relative">
      {/* Fixed elements */}
      <ScrollProgress />
      <Navbar />

      {/* Main content */}
      <div className="relative">
        {/* Hero/Introduction */}
        <Hero />

        {/* About Me Section */}
        <About />

        {/* Technologies Section */}
        <Technologies />

        {/* Projects Section */}
        <Projects />

        {/* Experience/Skills Section */}
        <Experience />

        {/* Medium Articles Section */}
        <MediumArticles />

        {/* Contact Section */}
        <Contact />
      </div>
    </main>
  );
}
