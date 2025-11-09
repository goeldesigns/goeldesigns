import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for reaching out! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-cyan-100 rounded-full text-teal-700 mb-4">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-teal-700 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Let's Start a Conversation
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Ready to transform your digital presence? Get in touch with us today and let's discuss how we can help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Email Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-2 hover:border-teal-200 transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-cyan-500 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl mb-2">Email Us</h3>
              <p className="text-foreground/60">hello@goeldesigns.com</p>
              <p className="text-foreground/60">support@goeldesigns.com</p>
            </Card>
          </motion.div>

          {/* Call Us */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 border-2 hover:border-teal-200 transition-all h-full">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl mb-2">Call Us</h3>
              <p className="text-foreground/60">+91 9368207505</p>
              <p className="text-foreground/60">Mon-Fri, 10am-6pm IST</p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}