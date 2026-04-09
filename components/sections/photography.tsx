"use client";

import { useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// Replace these with your actual photo URLs from Instagram or your own uploads
const photos = [
  { id: 1, src: "/clover.jpeg", alt: "Nature landscape" },
  { id: 2, src: "/flower.jpeg", alt: "Nature landscape" },
  { id: 3, src: "/flower3.jpeg", alt: "Nature landscape" },
  { id: 4, src: "/sky3.jpeg", alt: "Nature landscape" },
];

const platforms = [
  {
    label: "Shutterstock",
    description: "Licensed stock photos available for purchase.",
    href: "https://www.shutterstock.com/g/QuientNature", // update with your actual profile
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zm0 2.5a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    description: "Behind the lens — nature, landscapes, and the journey.",
    href: "https://www.instagram.com/quientnature",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    description: "Occasional shots shared while building in public.",
    href: "https://x.com/QuientNature",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function PhotographyPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div id="photography" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Photography
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-3"
      >
        Nature through a lens
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-muted-foreground text-sm leading-relaxed mb-16 max-w-md"
      >
        When I'm not building software, I'm outside with a camera. Landscapes,
        light, and quiet places. Some of it ends up on Shutterstock — most of
        it just stays as a reminder to slow down.
      </motion.p>

      {/* Photo grid */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-2 mb-4"
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            custom={i + 4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className={`relative overflow-hidden rounded-lg bg-card border border-border/40 ${
              i === 0 || i === 3 ? "col-span-2 aspect-16/7" : "aspect-square"
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Show more button */}
      <motion.div
        custom={8}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex justify-center mb-20"
      >
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md border border-border/50 bg-card px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
        >
          See more work
          <ArrowUpRight />
        </button>
      </motion.div>

      {/* About the work */}
      <motion.div
        custom={9}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="border-t border-border/40 pt-12"
      >
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-6">
          About the work
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
          I shoot mostly in natural light — early mornings, golden hours, and
          overcast days. Landscapes that feel quiet. I license select images on
          Shutterstock and share the rest on Instagram and X.
        </p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="w-full max-w-sm rounded-xl border border-border/50 bg-[oklch(0.12_0_0)] p-8 shadow-2xl">
                {/* Close */}
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40">
                    Find my work
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-muted-foreground/40 hover:text-foreground transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {platforms.map((platform) => (
                    <Link
                      key={platform.label}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setModalOpen(false)}
                      className="group flex items-center gap-4 rounded-lg border border-border/40 bg-card/50 p-4 hover:border-border hover:bg-card transition-all"
                    >
                      <span className="text-muted-foreground/50 group-hover:text-[var(--accent-green)] transition-colors shrink-0">
                        {platform.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground mb-0.5">
                          {platform.label}
                        </p>
                        <p className="text-xs text-muted-foreground/50 leading-relaxed">
                          {platform.description}
                        </p>
                      </div>
                      <span className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0">
                        <ArrowUpRight />
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground/30 text-center mt-6">
                  Click anywhere outside to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}