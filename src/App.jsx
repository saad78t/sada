import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import AppRoutes from "./routes/AppRoutes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 5 * 60 * 1000, // 5 دقائق (يمكن تغييره حسب احتياجك)
//       gcTime: 10 * 60 * 1000, // 10 دقائق للاحتفاظ بالبيانات في الذاكرة
//       retry: false, // منع إعادة المحاولة في حالة الخطأ
//       refetchOnWindowFocus: false, // منع الجلب عند التركيز على النافذة
//     },
//   },
// });

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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              backgroundColor: "#d1fae5",
              color: "#065f46",
            },
          },
          error: {
            duration: 5000,
            style: {
              backgroundColor: "#fee2e2",
              color: "#991b1b",
            },
          },
          style: {
            fontSize: "15px",
            maxWidth: "500px",
            padding: "14px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(4px)",
            backgroundColor: "#f9fafb",
            color: "#1f2937",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
