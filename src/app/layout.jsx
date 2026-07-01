import "../index.css";
import SmoothScroll from "./SmoothScroll";
import { CasperWalletProvider } from "./context/CasperWalletContext";

export const metadata = {
  title: "Revora | Revenue-Based Capital Markets",
  description: "The Operating System for Real-World Revenue Assets",
  icons: {
    icon: "/images/icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overscroll-none">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F8F8F8] overscroll-none m-0 p-0 font-jost">
        <CasperWalletProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CasperWalletProvider>
      </body>
    </html>
  );
}
