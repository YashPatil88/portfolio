"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheck, FaCopy } from 'react-icons/fa';

const CONTACT = {
  name: 'Yash Patil',
  email: 'yashspatil4779@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yashspatil4779/',
  github: 'https://github.com/Yashpatil88',
  medium: 'https://medium.com/@yashspatil4779',
  location: 'Pune, Maharashtra, 411023',
};

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Submission failed');
      } else {
        setSuccess('Message sent — thank you!');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      onSubmit={submit} 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <input
            className="w-full p-4 rounded-xl glass-strong border border-white/10 text-white placeholder-gray-400 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <input
            className="w-full p-4 rounded-xl glass-strong border border-white/10 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            placeholder="Your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <textarea
          className="w-full p-4 rounded-xl glass-strong border border-white/10 text-white placeholder-gray-400 h-32 resize-none focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-4"
      >
        <motion.button
          type="submit"
          disabled={loading}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-xl disabled:opacity-60 hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane />
              <span>Send Message</span>
            </>
          )}
        </motion.button>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 text-green-400"
          >
            <FaCheck />
            <span>{success}</span>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-rose-400"
          >
            {error}
          </motion.div>
        )}
      </motion.div>
    </motion.form>
  );
}

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [copied, setCopied] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('general');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
  };

  const templates: { key: string; label: string; subject: string; body: string; color: string }[] = [
    {
      key: 'general',
      label: 'General',
      subject: `Inquiry from portfolio - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI came across your portfolio and would like to get in touch regarding...%0D%0A%0D%0AThanks,%0D%0A[Your name]`,
      color: 'blue'
    },
    {
      key: 'collab',
      label: 'Collaboration',
      subject: `Collaboration opportunity - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI'd like to discuss a potential collaboration on...%0D%0A%0D%0ARegards,%0D%0A[Your name]`,
      color: 'purple'
    },
    {
      key: 'job',
      label: 'Job / Contract',
      subject: `Opportunity - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI'm reaching out about a role/opportunity that might interest you...%0D%0A%0D%0ABest,%0D%0A[Your name]`,
      color: 'pink'
    }
  ];

  const buildMailto = (templateKey: string) => {
    const t = templates.find((x) => x.key === templateKey) || templates[0];
    const subject = encodeURIComponent(t.subject);
    const body = t.body;
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const socialLinks = [
    { icon: FaGithub, href: CONTACT.github, label: 'GitHub', color: 'from-gray-400 to-gray-600', bgColor: 'bg-gray-700/20' },
    { icon: FaLinkedin, href: CONTACT.linkedin, label: 'LinkedIn', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-700/20' },
    { icon: FaMedium, href: CONTACT.medium, label: 'Medium', color: 'from-purple-400 to-pink-600', bgColor: 'bg-purple-600/20' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-32 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          style={{ y }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        style={{ opacity }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl sm:text-7xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
            <motion.span
              className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
              initial={{ width: "0%", scaleX: 0 }}
              whileInView={{ width: "100%", scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            I'd love to hear from you — whether it's about collaboration, opportunities, or a simple hello.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="glass-strong rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all h-full">
              {/* Profile Header */}
              <motion.div
                className="flex items-center gap-4 mb-8"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative z-10">YP</span>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">{CONTACT.name}</h3>
                  <p className="text-sm text-gray-400">Full Stack Developer · Writer</p>
                </div>
              </motion.div>

              {/* Contact Details */}
              <div className="space-y-4 mb-8">
                <motion.div
                  className="flex items-center justify-between p-4 glass rounded-xl border border-white/5"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(59, 130, 246, 0.3)' }}
                >
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-400 w-5 h-5" />
                    <div className="text-sm text-gray-300">{CONTACT.email}</div>
                  </div>
                  <motion.button
                    onClick={copyEmail}
                    className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {copied ? (
                      <FaCheck className="text-green-400 w-4 h-4" />
                    ) : (
                      <FaCopy className="text-gray-400 w-4 h-4" />
                    )}
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex items-center gap-3 p-4 glass rounded-xl border border-white/5"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(236, 72, 153, 0.3)' }}
                >
                  <FaMapMarkerAlt className="text-pink-400 w-5 h-5" />
                  <div className="text-sm text-gray-300">{CONTACT.location}</div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 p-4 glass rounded-xl border border-white/10 hover:border-white/30 transition-all ${social.bgColor} flex items-center justify-center group`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon 
                      className={`w-6 h-6 ${
                        social.label === 'GitHub' ? 'text-gray-300 group-hover:text-white' :
                        social.label === 'LinkedIn' ? 'text-blue-400 group-hover:text-blue-300' :
                        'text-purple-400 group-hover:text-pink-400'
                      } transition-colors`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Email Template */}
              <motion.div
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400">
                    <FaEnvelope className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">Email Templates</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {templates.map((t) => (
                        <motion.button
                          key={t.key}
                          onClick={() => setSelectedTemplate(t.key)}
                          className={`px-3 py-1 text-xs rounded-full transition ${
                            selectedTemplate === t.key
                              ? `bg-gradient-to-r ${
                                  t.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                                  t.color === 'purple' ? 'from-purple-500 to-pink-500' :
                                  'from-pink-500 to-rose-500'
                                } text-white`
                              : 'glass text-gray-300 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {t.label}
                        </motion.button>
                      ))}
                    </div>
                    <motion.a
                      href={buildMailto(selectedTemplate)}
                      className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      Compose Email <FaPaperPlane className="w-3 h-3" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* LinkedIn */}
              <motion.a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noreferrer"
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-700/20 rounded-xl text-blue-300">
                    <FaLinkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">LinkedIn</h4>
                    <p className="text-xs text-gray-400">Connect with me</p>
                  </div>
                </div>
              </motion.a>

              {/* GitHub */}
              <motion.a
                href={CONTACT.github}
                target="_blank"
                rel="noreferrer"
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-700/20 rounded-xl text-gray-200">
                    <FaGithub className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">GitHub</h4>
                    <p className="text-xs text-gray-400">View my code</p>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Contact Form */}
            <div className="glass-strong rounded-3xl p-8 border border-white/10">
              <motion.h3
                className="text-2xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Send me a message
              </motion.h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;