import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Calendar, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  fullDescription?: string;
  client?: string;
  year?: string;
  team?: string[];
}

interface PortfolioDetailProps {
  project: Project | null;
  onClose: () => void;
}

export function PortfolioDetail({ project, onClose }: PortfolioDetailProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl max-w-5xl w-full my-8 overflow-hidden shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-[400px] overflow-hidden">
            <ImageWithFallback
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="text-sm mb-2 text-white/80">{project.category}</div>
              <h2 className="text-4xl mb-4">{project.title}</h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge key={index} className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Project Info */}
              <div className="md:col-span-2">
                <h3 className="text-2xl mb-4">Project Overview</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {project.fullDescription || project.description}
                </p>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  This project showcases our expertise in {project.category.toLowerCase()}, combining innovative design principles with cutting-edge technology to deliver exceptional results. Our team worked collaboratively to ensure every aspect of the project met the highest standards of quality and user experience.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  The result is a seamless, intuitive solution that not only meets but exceeds client expectations, driving engagement and delivering measurable business outcomes.
                </p>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Timeline</span>
                  </div>
                  <p className="text-foreground/70">{project.year || '2024'}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Team</span>
                  </div>
                  <div className="text-foreground/70">
                    {project.team?.map((member, index) => (
                      <div key={index}>{member}</div>
                    )) || (
                      <>
                        <div>Design Team</div>
                        <div>Development Team</div>
                        <div>Project Manager</div>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-teal-600 mb-2">
                    <ExternalLink className="w-5 h-5" />
                    <span className="font-semibold">Services</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button className="flex-1 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 hover:shadow-xl hover:scale-105 transition-all rounded-full">
                View Live Project
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="flex-1 border-2 border-teal-200 hover:bg-teal-50 rounded-full">
                Contact Us About This
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}