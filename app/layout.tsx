import type { Metadata, Viewport } from 'next';
import { Archivo, Geist_Mono, Inter } from 'next/font/google';

import { AppSidebar } from '@/components/layout/app-sidebar';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ThemeProvider } from '@/components/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Archivo's wide cuts echo the lettering on mission hardware.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-display',
});

const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

const SITE_TITLE = 'NASA API Explorer';
const SITE_DESCRIPTION =
  "Browse NASA's open data: the Astronomy Picture of the Day, full-disc Earth images from DSCOVR's EPIC camera, and the NASA Image and Video Library.";

export const metadata: Metadata = {
  metadataBase: new URL('https://nasa-api-explorer.zachscroggins.com'),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  alternates: { canonical: '/' },
  description: SITE_DESCRIPTION,
  robots: { index: false, follow: false },
  twitter: { creator: '@scroggins_zach', card: 'summary' },
  openGraph: {
    type: 'website',
    url: '/',
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-sans antialiased', inter.variable, archivo.variable, fontMono.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset className="min-w-0">
                <SiteHeader />
                <div className="flex flex-1 flex-col">{children}</div>
                <SiteFooter />
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
