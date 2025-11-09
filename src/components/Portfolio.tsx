import { motion } from 'motion/react';
import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioDetail } from './PortfolioDetail';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'UI/UX Design & Development',
    description: 'A modern e-commerce platform with seamless user experience and powerful features.',
    image: 'https://images.unsplash.com/photo-1635939412822-8f3ee593d147?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZGVzaWduJTIwdWl8ZW58MXx8fHwxNzYxOTkxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['UI/UX', 'React', 'E-Commerce'],
  },
  {
    title: 'Mobile Banking App',
    category: 'App Design & Development',
    description: 'Intuitive mobile banking experience with advanced security features.',
    image: 'https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYxODgwMjM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Mobile', 'FinTech', 'UI/UX'],
  },
  {
    title: 'Brand Identity System',
    category: 'Branding & Design',
    description: 'Complete brand identity for a sustainable fashion startup.',
    image: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbnxlbnwxfHx8fDE3NjE5NTE2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Branding', 'Logo', 'Identity'],
  },
  {
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Analytics dashboard with real-time data visualization and insights.',
    image: 'https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBsYXB0b3B8ZW58MXx8fHwxNzYxODk2MDY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['SaaS', 'Dashboard', 'Analytics'],
  },
  {
    title: 'Content Management System',
    category: 'Development',
    description: 'Custom CMS built for managing large-scale content operations.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MTk4NTEyNnww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['CMS', 'Backend', 'Full Stack'],
  },
  {
    title: 'Marketing Campaign',
    category: 'Content & Graphics',
    description: 'Integrated marketing campaign with stunning visuals and compelling copy.',
    image: 'https://images.unsplash.com/photo-1603201667230-bd139210db18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MTk0NjAzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Marketing', 'Content', 'Design'],
  },
];

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-teal-700 mb-4">
            Our Work
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 bg-clip-text text-transparent pb-2">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Explore our portfolio of successful projects that have helped businesses grow and thrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                onClick={() => setSelectedProject(project)}
                className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-teal-200 flex flex-col"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="flex items-center gap-2 text-white">
                      <span>View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-sm text-teal-600 mb-2">{project.category}</div>
                  <h3 className="text-xl mb-2">{project.title}</h3>
                  <p className="text-foreground/60 mb-4 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-teal-100 text-teal-700 hover:bg-teal-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <PortfolioDetail 
      project={selectedProject} 
      onClose={() => setSelectedProject(null)} 
    />
    </>
  );
}