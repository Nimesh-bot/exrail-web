import { useThemeContext } from '../context/ThemeContextProvider'

const useThemeChanger = () => {
  const { dark, setDark } = useThemeContext();

  const toggleTheme = () => {
    setDark?.(!dark)
    localStorage.setItem('darkMode', `${!dark}`)
  }

  return { dark, toggleTheme }
}

export default useThemeChanger