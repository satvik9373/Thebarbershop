import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";
import { fetchContent, getGalleryContent, type GalleryContent, type GalleryItem } from "@/lib/cms";

const Gallery = () => {
  const [content, setContent] = useState<GalleryContent>(() => getGalleryContent());
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const data = await fetchContent<GalleryContent>("gallery");
      if (data?.items?.length) {
        setContent(data);
      }
    } catch {
      console.warn("[Gallery] Using default content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Safe content access with defaults
  const tagline = content?.tagline ?? "See The Results";
  const title = content?.title ?? "Real";
  const titleHighlight = content?.titleHighlight ?? "Work";
  const items: GalleryItem[] = content?.items ?? [];

  // Duplicate items for seamless infinite loop (memoized)
  const duplicatedItems = useMemo(
    () => (items.length > 0 ? [...items, ...items, ...items] : []),
    [items]
  );

  // Calculate animation duration based on item count
  const animationDuration = useMemo(
    () => Math.max(20, items.length * 8),
    [items.length]
  );

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
          {tagline}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium">
          {title} <span className="text-gradient-gold">{titleHighlight}</span>
        </h2>
      </motion.div>

      {/* Faded edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling gallery */}
      {!isLoading && duplicatedItems.length > 0 && (
        <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -50 * items.length + "%"],
            }}
            transition={{
              x: {
                duration: animationDuration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={`gallery-${index}`}
                className="flex-shrink-0 w-72 md:w-96 aspect-[4/3] rounded-3xl overflow-hidden bg-white/5"
              >
                <MediaRenderer
                  type={item?.type ?? "image"}
                  src={item?.src ?? ""}
                  alt={item?.alt ?? `Gallery item ${(index % items.length) + 1}`}
                  className="w-full h-full object-cover object-center"
                  videoClassName="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
