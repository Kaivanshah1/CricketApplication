'use client'

import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300">
              IPL Team Manager
            </Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start mb-6 md:mb-0">
            <Link href="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-3">
              Home
            </Link>
            <Link href="/features" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-3">
              Features
            </Link>
            <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-3">
              About
            </Link>
          </div>
          <div className="flex items-center">
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-3">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mx-3">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} IPL Team Manager. All rights reserved.
        </div>
      </div>
    </footer>
  )
}