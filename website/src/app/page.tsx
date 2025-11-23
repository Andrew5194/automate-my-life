'use client';

import { useState, useEffect } from 'react';
import GitHubHeatmap from './components/GitHubHeatmap';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Automate My Life
                </h1>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#platform" className="text-gray-300 hover:text-white transition-colors">Platform</a>
              <a href="#github-activity" className="text-gray-300 hover:text-white transition-colors">Activity</a>
              <a href="#tech" className="text-gray-300 hover:text-white transition-colors">Technology</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            <button className="hidden md:block bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold mb-4">
              AI-Powered Workflow Automation
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Reclaim Your Time.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Automate Everything.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Stop wasting time on repetitive tasks. Let AI handle the boring stuff while you focus on what truly matters.
              Transform your productivity with intelligent automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="group bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/50">
                Start Automating
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="border border-gray-700 hover:border-gray-500 hover:bg-gray-900/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                See How It Works
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {[
              { value: '10hrs+', label: 'Saved Per Week' },
              { value: '95%', label: 'Time Reduction' },
              { value: '50K+', label: 'Tasks Automated' },
              { value: '24/7', label: 'Always Running' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Automation <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Superpowers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Transform repetitive tasks into automated workflows that run on autopilot
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤖',
                title: 'Smart AI Workflows',
                description: 'Train custom AI agents to handle your routine tasks. From email sorting to data entry, let AI learn your patterns and work 24/7.',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast Triggers',
                description: 'Set up instant automation triggers. Respond to events in milliseconds with webhooks, schedules, and smart conditions.',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: '🔗',
                title: 'Universal Integration',
                description: 'Connect 500+ apps seamlessly. Gmail, Slack, Notion, GitHub - if it has an API, we can automate it.',
                gradient: 'from-violet-500 to-purple-500'
              },
              {
                icon: '📊',
                title: 'Visual Workflow Builder',
                description: 'Drag and drop your automation flows. No coding required - see your logic come to life with our intuitive interface.',
                gradient: 'from-teal-500 to-green-500'
              },
              {
                icon: '🎯',
                title: 'Smart Scheduling',
                description: 'Run tasks exactly when you need them. Set complex schedules, time zones, and conditions with natural language.',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                icon: '🛡️',
                title: 'Reliable & Secure',
                description: 'Bank-level encryption, automatic retries, and error handling. Your automations run safely and never fail silently.',
                gradient: 'from-orange-500 to-amber-500'
              }
            ].map((feature, i) => (
              <div key={i} className="group relative p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" style={{backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`}} />
                <div className={`text-5xl mb-4 filter grayscale group-hover:grayscale-0 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section id="github-activity" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Development <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Activity</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Track our continuous development and contributions to the open source ecosystem
            </p>
          </div>

          <GitHubHeatmap username="YOUR_GITHUB_USERNAME" />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Powered by <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Cutting-Edge Tech</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with the latest technologies for maximum performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'React 19', category: 'Frontend', color: 'from-cyan-500 to-blue-500' },
              { name: 'Next.js 15', category: 'Framework', color: 'from-gray-500 to-gray-700' },
              { name: 'TypeScript', category: 'Language', color: 'from-blue-600 to-blue-700' },
              { name: 'Tailwind CSS', category: 'Styling', color: 'from-sky-400 to-cyan-400' },
              { name: 'Node.js', category: 'Runtime', color: 'from-green-600 to-green-700' },
              { name: 'PostgreSQL', category: 'Database', color: 'from-blue-500 to-indigo-600' },
              { name: 'AWS / GCP', category: 'Cloud', color: 'from-orange-500 to-yellow-500' },
              { name: 'Docker', category: 'Container', color: 'from-blue-400 to-blue-600' },
              { name: 'Kubernetes', category: 'Orchestration', color: 'from-blue-500 to-purple-500' },
              { name: 'GraphQL', category: 'API', color: 'from-pink-500 to-rose-500' },
              { name: 'Redis', category: 'Cache', color: 'from-red-600 to-red-700' },
              { name: 'TensorFlow', category: 'AI/ML', color: 'from-orange-500 to-amber-500' }
            ].map((tech, i) => (
              <div key={i} className="group relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-300`} />
                <div className="text-sm text-gray-500 mb-1">{tech.category}</div>
                <h3 className="text-lg font-bold text-white">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-16 bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 rounded-3xl border border-emerald-500/20 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Automate</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands who have reclaimed their time with Automate My Life.
                Start automating today, no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-xl">
                  Start Free Trial
                  <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <button className="border border-gray-600 hover:border-gray-400 hover:bg-gray-900/50 px-10 py-4 rounded-xl font-semibold transition-all duration-300">
                  Schedule Demo
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                14-day free trial • No credit card required • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Automate My Life</h3>
              </div>
              <p className="text-gray-400">
                Reclaim your time with intelligent automation that works 24/7.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2025 Automate My Life. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
