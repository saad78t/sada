import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // staleTime: 60 * 1000,
//       staleTime: 0,
//     },
//   },
// });
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 دقائق (يمكن تغييره حسب احتياجك)
      gcTime: 10 * 60 * 1000, // 10 دقائق للاحتفاظ بالبيانات في الذاكرة
      retry: false, // منع إعادة المحاولة في حالة الخطأ
      refetchOnWindowFocus: false, // منع الجلب عند التركيز على النافذة
    },
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <AppRoutes toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
