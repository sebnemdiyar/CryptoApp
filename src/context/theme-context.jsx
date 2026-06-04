import { createContext, useContext, useEffect, useState } from "react";

// context kurulumu
export const ThemeContext = createContext();

// Sağlayıcı - HOC
export const ThemeProvider = ({ children }) => {
  // tema state'i
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  ); // koyu modda başlamasını istediğimiz için true yaptık

  // temayı değişterecek fonksiyon
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // tema değişince ara yüzü güncelle
  useEffect(() => {
    const root = window.document.documentElement; // buradaki içeriği console(window) diyerek html elementine eriştik

    if (isDarkMode) {
      root.classList.add("dark"); // classların arasına dark mod ekledik
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook (usecontext'e abone olmamızı sağlayacak custom hook)
// useTheme fonksiyonu kullanıldığında geriye yukarıdaki isDarkMode ve toggleTheme değerleri dönüyor
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Provider ile App'i Sarmala"); // main.jsx'te
  }

  return context; // context yapısından sağlanan verileri döndürüyoruz
};
