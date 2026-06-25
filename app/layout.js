import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Calculadora Fiscal ES',
  description:
    'IVA, autónomo (modelo 130) y salario bruto→neto — con explicaciones IA en español, neerlandés e inglés.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
