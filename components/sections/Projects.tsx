"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";
import { projects, categories } from "@/lib/projects";
import { constants } from "@/lib/constants";

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="min-h-screen bg-primary py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Featured Projects
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            A showcase of AI systems, research frameworks, and deployed applications
            built at the intersection of cognitive science and machine learning.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {projects.filter(p => p.featured).map(project => (
          <div key={project.id} className="mb-16">
            <div className="relative w-full rounded-2xl p-8 overflow-hidden border border-transparent bg-gradient-to-br from-[rgba(0,212,255,0.1)] via-[rgba(124,58,237,0.1)] to-[rgba(0,212,255,0.1)]">
              {/* Glow on left */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#00d4ff]/20 to-transparent pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="text-xs font-mono text-accent-primary uppercase tracking-widest mb-2">★ FLAGSHIP RESEARCH</div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary mb-4">{project.title}</h3>
                  <p className="font-body text-text-secondary max-w-2xl mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2 py-1 rounded text-xs font-mono bg-secondary/50 text-text-dim">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-primary/50 text-accent-primary text-sm font-medium hover:bg-accent-primary/10 transition-colors">
                      {project.demoLabel || 'Read Preprint'} ↗
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-text-secondary text-sm font-medium hover:border-accent-primary/50 hover:text-accent-primary transition-colors">
                      GitHub ↗
                    </a>
                  </div>
                </div>
                {project.highlight && (
                  <div className="flex-shrink-0">
                    <div className="font-mono text-xs text-accent-primary text-right">
                      DOI: {constants.doi}<br/>
                      {project.highlight}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-display text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-accent-primary text-black"
                  : "bg-secondary/30 text-text-secondary border border-border hover:border-accent-primary/50 hover:text-accent-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Grid info */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-mono text-text-dim">No projects in this category.</p>
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={projects.find((p) => p.id === selectedProject)!}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
