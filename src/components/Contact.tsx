"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <input
        className="col-span-1 md:col-span-1 p-3 rounded-md bg-white/5 border border-white/6 text-white placeholder-gray-400"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="col-span-1 md:col-span-1 p-3 rounded-md bg-white/5 border border-white/6 text-white placeholder-gray-400"
        placeholder="Your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <textarea
        className="col-span-1 md:col-span-2 p-3 rounded-md bg-white/5 border border-white/6 text-white placeholder-gray-400 h-32 resize-none"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />

      <div className="col-span-1 md:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send message'}
        </button>
        {success && <div className="text-sm text-green-400">{success}</div>}
        {error && <div className="text-sm text-rose-400">{error}</div>}
      </div>
    </form>
  );
}

const Contact = () => {
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

  const templates: { key: string; label: string; subject: string; body: string }[] = [
    {
      key: 'general',
      label: 'General',
      subject: `Inquiry from portfolio - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI came across your portfolio and would like to get in touch regarding...%0D%0A%0D%0AThanks,%0D%0A[Your name]`
    },
    {
      key: 'collab',
      label: 'Collaboration',
      subject: `Collaboration opportunity - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI'd like to discuss a potential collaboration on...%0D%0A%0D%0ARegards,%0D%0A[Your name]`
    },
    {
      key: 'job',
      label: 'Job / Contract',
      subject: `Opportunity - ${CONTACT.name}`,
      body: `Hi ${CONTACT.name},%0D%0A%0D%0AI'm reaching out about a role/opportunity that might interest you...%0D%0A%0D%0ABest,%0D%0A[Your name]`
    }
  ];

  const buildMailto = (templateKey: string) => {
    const t = templates.find((x) => x.key === templateKey) || templates[0];
    const subject = encodeURIComponent(t.subject);
    const body = t.body; // already URL encoded with %0D%0A for newlines
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Let's connect</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">I'd love to hear from you — whether it's about collaboration, opportunities, or a simple hello.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/60 to-gray-800/30 border border-white/5 shadow-xl backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">YP</div>
                <div>
                  <h3 className="text-xl font-semibold">{CONTACT.name}</h3>
                  <p className="text-sm text-gray-400">Full Stack Developer · Writer</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-400 w-5 h-5" />
                    <div className="text-sm text-gray-300">{CONTACT.email}</div>
                  </div>
                  <button
                    onClick={copyEmail}
                    className="text-sm bg-white/6 hover:bg-white/10 px-3 py-1 rounded-md transition"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-pink-400 w-5 h-5" />
                    <div className="text-sm text-gray-300">{CONTACT.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <a href={CONTACT.github} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition text-gray-200">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition text-gray-200">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href={CONTACT.medium} target="_blank" rel="noreferrer" className="p-2 rounded-md bg-white/6 hover:bg-white/10 transition text-gray-200">
                    <FaMedium className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/20 border border-white/5 shadow-2xl backdrop-blur">
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group p-6 rounded-xl bg-gradient-to-b from-white/3 to-white/2 transition shadow-inner">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-600/20 rounded-lg text-blue-400"><FaEnvelope className="w-5 h-5" /></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Email me</h4>
                      <p className="text-sm text-gray-300 mt-1">{CONTACT.email}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {templates.map((t) => (
                          <button
                            key={t.key}
                            onClick={() => setSelectedTemplate(t.key)}
                            className={`px-3 py-1 text-sm rounded-full transition ${selectedTemplate === t.key ? 'bg-blue-600 text-white' : 'bg-white/6 text-gray-200 hover:bg-white/10'}`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="mt-4">
                        <a
                          href={buildMailto(selectedTemplate)}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md"
                        >
                          Compose Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <motion.a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-6 rounded-xl bg-gradient-to-b from-white/3 to-white/2 hover:from-white/5 hover:to-white/3 transition shadow-inner"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-700/20 rounded-lg text-blue-300"><FaLinkedin className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold">Connect on LinkedIn</h4>
                      <p className="text-sm text-gray-300 mt-1">linkedin.com/in/yashspatil4779</p>
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-6 rounded-xl bg-gradient-to-b from-white/3 to-white/2 hover:from-white/5 hover:to-white/3 transition shadow-inner"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-700/20 rounded-lg text-gray-200"><FaGithub className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold">View GitHub</h4>
                      <p className="text-sm text-gray-300 mt-1">github.com/Yashpatil88</p>
                    </div>
                  </div>
                </motion.a>

                <motion.a
                  href={CONTACT.medium}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-6 rounded-xl bg-gradient-to-b from-white/3 to-white/2 hover:from-white/5 hover:to-white/3 transition shadow-inner"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-600/20 rounded-lg text-purple-300"><FaMedium className="w-5 h-5" /></div>
                    <div>
                      <h4 className="font-semibold">Read my writing</h4>
                      <p className="text-sm text-gray-300 mt-1">medium.com/@yashspatil4779</p>
                    </div>
                  </div>
                </motion.a>
              </motion.div>

              {/* Contact form */}
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;