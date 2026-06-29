"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { shop } from "@/config/shop";
import { Phone } from "./icons";

/** Mobile-only sticky action bar — slides up after the hero scrolls away. */
export default function StickyCallBar() {
  const [show, setShow] = useState(false);
  const tel = shop.phone.replace(/[^\d+]/g, "");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line/10 bg-bg/90 p-3 backdrop-blur-md lg:hidden"
        >
          <div className="container-px flex gap-3">
            <a href={`tel:${tel}`} className="btn-outline flex-1">
              <Phone width={16} height={16} />
              Call
            </a>
            <Link href="/book" className="btn-accent flex-[2]">
              Book appointment
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
