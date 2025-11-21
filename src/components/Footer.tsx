import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from 'lucide-react';
import logo from 'figma:asset/3ccb6ac30a92321dfbacbf6b6fe2873cc83edd0b.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/goeldesigns/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/goel-designs/posts/?feedView=all', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'Github' },
  ];

  const footerLinks = {
    Services: ['UI/UX Design', 'Development', 'Graphic Design', 'Content Creation', 'Branding'],
    Company: ['About Us', 'Portfolio', 'Careers', 'Blog', 'Contact'],
    Resources: ['Case Studies', 'Testimonials', 'Help Center', 'Privacy Policy', 'Terms of Service'],
  };

  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <img src={logo} alt="Goel Designs" className="w-[100px] h-[100px] mb-4 brightness-0 invert" />
              <p className="text-teal-200 leading-relaxed mb-6">
                Transforming ideas into exceptional digital experiences. We're your partner in digital innovation.
              </p>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-300" />
                <a href="mailto:ceo@goeldesigns.com" className="text-teal-200 hover:text-white transition-colors">
                  ceo@goeldesigns.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-teal-200 hover:text-white transition-colors inline-block hover:translate-x-1 transform duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-teal-700 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-teal-300 text-sm">
              © {currentYear} Goel Designs. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                     target="_blank"
      rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-teal-800 hover:bg-white hover:text-teal-900 flex items-center justify-center transition-all hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}