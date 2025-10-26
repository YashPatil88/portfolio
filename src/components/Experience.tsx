"use client";
import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Computer Engineer",
    company: "Deccan Eduction Society Pune University Student",
    duration: "2022 - Present",
    description: [
      "Developed innovative solutions using cutting-edge technologies",
      "Created and maintained multiple full-stack applications",
      "Authored technical documentation and guides",
      "Contributed to open-source projects and technical communities"
    ]
  },
  {
    title: "Technical Author",
    company: "Self-Published (Medium)",
    duration: "2025 - Present",
    description: [
      "Regular contributor on Medium (https://medium.com/@yashspatil4779) — publishing technical tutorials and long-form articles",
      "Created comprehensive guides on software development",
      "Shared knowledge and insights with the developer community",
      "Focused on making complex concepts accessible to all skill levels"
    ]
  },
  {
    title: "Business Corporate ",
    company: "Sakal Media Group",
    duration: "2025 - Present",
    description: [
      "Collaborated with cross-functional teams to drive business growth",
      "Implemented technology solutions to streamline operations",
        "Analyzed market trends to inform strategic decisions",
        "Enhanced customer engagement through innovative digital initiatives"
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400">My professional journey</p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <p className="text-blue-500">{exp.company}</p>
                </div>
                <p className="text-gray-400 mt-2 md:mt-0">{exp.duration}</p>
              </div>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-md transition-colors duration-200"
          >
            View Full Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;