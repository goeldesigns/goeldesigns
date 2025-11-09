import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, TechStart Inc.',
    content: 'DigitalCraft transformed our vision into a stunning reality. Their attention to detail and creative approach exceeded our expectations. The team was professional, responsive, and delivered on time.',
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Founder, GrowthLabs',
    content: 'Working with DigitalCraft was a game-changer for our business. They created a beautiful brand identity and website that truly represents who we are. Highly recommended!',
    rating: 5,
    initials: 'MR',
  },
  {
    name: 'Emily Watson',
    role: 'Marketing Director, Innovate Co.',
    content: 'The best digital agency we\'ve worked with. Their strategic thinking and design excellence helped us stand out in a crowded market. Our conversion rates increased by 40%!',
    rating: 5,
    initials: 'EW',
  },
  {
    name: 'David Park',
    role: 'Product Manager, NextGen Apps',
    content: 'From wireframes to final product, the process was seamless. The team understood our requirements perfectly and delivered a mobile app that our users absolutely love.',
    rating: 5,
    initials: 'DP',
  },
  {
    name: 'Lisa Anderson',
    role: 'COO, Brand Solutions',
    content: 'DigitalCraft doesn\'t just design; they solve problems. Their holistic approach to our digital transformation project was impressive. They\'re true partners in success.',
    rating: 5,
    initials: 'LA',
  },
  {
    name: 'James Thompson',
    role: 'Founder, Startup Hub',
    content: 'Exceptional quality and creativity. They took our rough ideas and turned them into a polished, professional brand. The ROI on our investment has been outstanding.',
    rating: 5,
    initials: 'JT',
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <Card className="p-6 h-full hover:shadow-xl transition-all group border-2 hover:border-teal-200 w-[380px] flex-shrink-0 mx-4">
    <div className="flex gap-1 mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-teal-500 text-teal-500" />
      ))}
    </div>
    <p className="text-foreground/70 mb-6 leading-relaxed">"{testimonial.content}"</p>
    <div className="flex items-center gap-3 mt-auto">
      <Avatar className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-500">
        <AvatarFallback className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white">
          {testimonial.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{testimonial.name}</div>
        <div className="text-sm text-foreground/60">{testimonial.role}</div>
      </div>
    </div>
  </Card>
);

export function Testimonials() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 via-white to-cyan-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-teal-100 rounded-full text-teal-700 mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 bg-clip-text text-transparent pb-2">
            What Our Clients Say
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with us.
          </p>
        </motion.div>

        <div className="relative">
          {/* Marquee Container */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: [0, -testimonials.length * 412], // 380px width + 32px margin
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}