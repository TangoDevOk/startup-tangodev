import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "TangoDev - Desarrollo Web Profesional | Servicios Freelance",
  description: "Agencia de desarrollo web freelance. Creamos sitios web, aplicaciones web y e-commerce con tecnologías modernas. Transformamos ideas en productos digitales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-helvetica-neue antialiased">
        {children}
      </body>
    </html>
  );
}
