
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Digital Solutions Pro
            </h1>
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
              <a href="#services" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Services</a>
              <a href="#portfolio" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Portfolio</a>
              <a href="#contact" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Modern Web
            <span className="text-blue-600 dark:text-blue-400"> Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Creating beautiful, fast, and scalable web applications using the latest technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3 rounded-lg font-semibold transition-colors">
              View Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Frontend Development</h3>
              <p className="text-slate-600 dark:text-slate-300">Modern React, Next.js, and TypeScript applications with beautiful UI/UX design.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Backend Development</h3>
              <p className="text-slate-600 dark:text-slate-300">Scalable APIs, databases, and server-side solutions using Node.js and cloud services.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Cloud Deployment</h3>
              <p className="text-slate-600 dark:text-slate-300">Fast and reliable deployment on Vercel, AWS, and other cloud platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12">
            Technologies We Use
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AWS', 'Vercel'].map((tech) => (
              <div key={tech} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 dark:text-white">{tech}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let&apos;s build something amazing together. Contact us today for a free consultation.
          </p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Digital Solutions Pro</h3>
              <p className="text-slate-400">Creating modern web solutions that drive business growth.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>Cloud Solutions</li>
                <li>Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-400">info@digitalsolutionspro.com</p>
              <p className="text-slate-400">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Digital Solutions Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
