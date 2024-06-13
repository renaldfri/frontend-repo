"use client";

import * as React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
