import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "../context/LanguageContext";

const App = ({ Component, pageProps }) => {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
