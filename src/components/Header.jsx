import { useTheme } from "@/context/ThemeContext";
import { HiSun, HiMoon } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Header({ currentPage, onPageChange }) {
  const { theme, toggleTheme } = useTheme();
  const navigate=useNavigate()
  const isDark = theme === 'dark';

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-zinc-800 px-8 py-4 transition-colors">
      <div className="max-w-[1800px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1  onClick={()=>navigate('/')} className="text-xl font-bold text-black dark:text-white font-disket">MTv1</h1>

          <nav className="flex items-center gap-2 bg-gray-50 dark:bg-zinc-950 rounded-lg p-1 border border-gray-200 dark:border-zinc-800">
            <button
              onClick={() => onPageChange('live')}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all font-disket ${
                currentPage === 'market'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white'
                  : 'text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => onPageChange('performers')}
              className={`px-5 py-1.5 rounded-md text-sm font-medium transition-all font-disket ${
                currentPage === 'performers'
                  ? 'bg-white dark:bg-zinc-800 text-black dark:text-white'
                  : 'text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'
              }`}
            >
              Performer
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Animated Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
              isDark ? 'bg-zinc-700' : 'bg-yellow-400'
            }`}
            aria-label="Toggle theme"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                isDark ? 'translate-x-7' : 'translate-x-0'
              }`}
            >
              {isDark ? (
                <HiMoon className="w-3.5 h-3.5 text-zinc-700" />
              ) : (
                <HiSun className="w-3.5 h-3.5 text-yellow-600" />
              )}
            </span>
          </button>

          <button
            onClick={() => onPageChange('profile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
              currentPage === 'profile'
                ? 'border-gray-400 dark:border-zinc-600 bg-gray-100 dark:bg-zinc-900'
                : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-zinc-900 flex items-center justify-center border border-gray-300 dark:border-zinc-700">
              <FiUser className="w-3.5 h-3.5 text-gray-600 dark:text-zinc-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-zinc-400 font-disket">Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
