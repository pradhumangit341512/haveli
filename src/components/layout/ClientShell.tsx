"use client";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  useRevealOnScroll();

  return (
    <>
      <Loader />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
