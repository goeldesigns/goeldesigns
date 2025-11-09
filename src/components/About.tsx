import { motion } from 'motion/react';
import { Target, Users, Award, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

const values = [
  {
    icon: Target,
    title: 'Mission-Driven',
    description: 'We aim to empower businesses through innovative digital solutions that drive real results.',
  },
  {
    icon: Users,
    title: 'Client-Centric',
    description: 'Your success is our priority. We build lasting partnerships based on trust and collaboration.',
  },
  {
    icon: Award,
    title: 'Quality First',
    description: 'Excellence in every pixel, every line of code, and every interaction we create.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'We don\'t just build products; we create digital experiences that scale with your business.',
  },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-100 rounded-full text-teal-700 mb-4">
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 bg-clip-text text-transparent pb-2">
            We Are Goel Designs
          </h2>
          <p className="text-lg text-foreground/60 max-w-3xl mx-auto">
            A team of passionate designers, developers, and strategists dedicated to transforming your digital presence. With years of experience and a proven track record, we bring creativity and technical excellence to every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full text-center hover:shadow-xl transition-all group border-2 hover:border-teal-200">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{value.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-teal-100 via-cyan-50 to-teal-100 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl mb-4">Our Expert Team</h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              A diverse group of creative minds and technical experts working together to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {[
              { name: 'UI/UX Designers', count: '1' },
              { name: 'Developers', count: '2' },
              { name: 'Content Creators', count: '3' },
              { name: 'Brand Strategists', count: '4' },
              { name: 'Project Managers', count: '5' },
            ].map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="text-center"
              >
                <motion.div 
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-700 via-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-3 shadow-lg"
                  animate={{ 
                    boxShadow: [
                      '0 10px 25px -5px rgba(13, 89, 89, 0.3)',
                      '0 10px 35px -5px rgba(13, 89, 89, 0.5)',
                      '0 10px 25px -5px rgba(13, 89, 89, 0.3)',
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  }}
                >
                  <motion.span 
                    className="text-2xl text-white"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                    }}
                  >
                    {role.count}
                  </motion.span>
                </motion.div>
                <div className="text-sm">{role.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}