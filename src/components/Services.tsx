import { motion } from 'motion/react';
import { Smartphone, Code, Palette, FileText, Sparkles, Layout, Server, Webhook, Video } from 'lucide-react';
import { Card } from './ui/card';

const services = [
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Create intuitive and beautiful interfaces for apps and websites that users love.',
    gradient: 'from-teal-600 to-teal-500',
  },
  {
    icon: Code,
    title: 'Development',
    description: 'Build robust, scalable applications with cutting-edge technologies.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Graphic & Logo Design',
    description: 'Eye-catching visuals, memorable logos, and compelling graphics that capture your brand essence.',
    gradient: 'from-cyan-500 to-teal-400',
  },
  {
    icon: FileText,
    title: 'Content Creation',
    description: 'Compelling content that engages your audience and drives conversions.',
    gradient: 'from-teal-600 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Branding',
    description: 'Develop a unique brand identity that sets you apart from competitors.',
    gradient: 'from-teal-700 to-teal-500',
  },
  {
    icon: Smartphone,
    title: 'Collateral Designing',
    description: 'Professional marketing materials that leave a lasting impression.',
    gradient: 'from-teal-600 to-cyan-600',
  },
  {
    icon: Server,
    title: 'Hosting',
    description: 'Reliable and secure hosting solutions to keep your website running smoothly 24/7.',
    gradient: 'from-teal-700 to-cyan-600',
  },
  {
    icon: Webhook,
    title: 'Functional APIs',
    description: 'Custom API development and integration for seamless data exchange and functionality.',
    gradient: 'from-cyan-600 to-teal-600',
  },
  {
    icon: Video,
    title: 'Video Shoot',
    description: 'Professional video production services to showcase your brand story with impact.',
    gradient: 'from-teal-500 to-cyan-400',
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-100 rounded-full text-teal-700 mb-4">
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 bg-clip-text text-transparent pb-2">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From concept to execution, we offer end-to-end digital services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 hover:border-teal-200">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}