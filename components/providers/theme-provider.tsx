"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ConfigProvider, theme } from 'antd';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConfigProvider
        theme={{
          algorithm: [theme.defaultAlgorithm, theme.compactAlgorithm],
          token: {
            colorPrimary: '#38bdf8',
            borderRadius: 6,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </NextThemesProvider>
  );
}