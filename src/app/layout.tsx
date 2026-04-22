import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "TangoDev - Desarrollo Web Profesional | Servicios Freelance",
  description: "Agencia de desarrollo web freelance. Creamos sitios web, aplicaciones web y e-commerce con tecnologías modernas. Transformamos ideas en productos digitales.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-helvetica-neue antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
