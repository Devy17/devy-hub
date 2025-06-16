import '../styles/globals.css'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const nowDark = !isDark
    setIsDark(nowDark)
    if (nowDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <>
      <div className="p-4 flex justify-end">
        <button
          onClick={toggleTheme}
          className="border px-3 py-1 rounded text-sm bg-gray-200 dark:bg-gray-800 dark:text-white"
        >
          {isDark ? '☀️ 라이트모드' : '🌙 다크모드'}
        </button>
      </div>
      <div className="min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}