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
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

        {/* Radial gradient overlay - expanded */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />

        {/* Animated orbs - larger and more spread out */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />

        {/* Diagonal lines accent */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_48%,rgba(6,182,212,0.05)_48%,rgba(6,182,212,0.05)_52%,transparent_52%,transparent_100%)] bg-[size:60px_60px]" />
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
                  AML
                </h1>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#platform" className="text-gray-300 hover:text-white transition-colors">Platform</a>
              <a href="#github-activity" className="text-gray-300 hover:text-white transition-colors">Activity</a>
              <a href="#tech" className="text-gray-300 hover:text-white transition-colors">Technology</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/Andrew5194/automate-my-life"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-gray-700 hover:border-gray-500 hover:bg-gray-900/50 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
              <button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold mb-4">
              AI Tracking and Workflows
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Take Control.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                Master Your Time.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Transform how you work. Intelligent tools that help you focus on what matters most.
              Reclaim hours every week with smart productivity workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button className="group bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/50">
                Start Your Journey
                <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="border border-gray-700 hover:border-gray-500 hover:bg-gray-900/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
            {[
              { value: '10hrs+', label: 'Saved Per Week' },
              { value: '3x', label: 'More Productive' },
              { value: '100%', label: 'Focus Time' },
              { value: '24/7', label: 'Working For You' }
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
              Productivity <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Superpowers</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Smart tools designed to amplify your focus and maximize your impact
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Focus Time Blocks',
                description: 'Protect your deep work time. Intelligent scheduling that automatically blocks distractions and helps you stay in flow.',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                icon: '⚡',
                title: 'Smart Task Management',
                description: 'Prioritize what matters. AI-powered task organization that learns your patterns and surfaces the right work at the right time.',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'See your impact. Visual dashboards that track your productivity metrics and celebrate your achievements.',
                gradient: 'from-violet-500 to-purple-500'
              },
              {
                icon: '🔗',
                title: 'Unified Workspace',
                description: 'Everything in one place. Connect your favorite tools and eliminate context switching across 500+ integrations.',
                gradient: 'from-teal-500 to-green-500'
              },
              {
                icon: '🧠',
                title: 'Intelligent Insights',
                description: 'Understand your patterns. Analytics that reveal when you work best and how to optimize your energy throughout the day.',
                gradient: 'from-blue-500 to-indigo-500'
              },
              {
                icon: '🌟',
                title: 'Habit Building',
                description: 'Build lasting routines. Gentle nudges and streak tracking that turn good intentions into consistent habits.',
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

          <GitHubHeatmap
            username={process.env.NEXT_PUBLIC_GITHUB_USERNAME || "YOUR_GITHUB_USERNAME"}
          />
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
                Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Transform</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands mastering their time with AML.
                Start your productivity journey today, no credit card required.
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
                <h3 className="text-xl font-bold">AML</h3>
              </div>
              <p className="text-gray-400">
                Master your time. Amplify your impact. Work smarter, not harder.
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
