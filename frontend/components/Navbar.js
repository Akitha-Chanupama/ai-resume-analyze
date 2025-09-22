import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <nav className="w-full py-4 mb-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold">AI</div>
          <div className="text-lg font-semibold">AI Resume Analyzer</div>
        </div>
        <div className="flex items-center space-x-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-slate-600 dark:text-slate-300">GitHub</a>
          <button
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (currentTheme === 'dark' ? '🌙' : '☀️')}
          </button>
        </div>
      </div>
    </nav>
  )
}
