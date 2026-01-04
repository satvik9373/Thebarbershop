import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";
import { fetchContent, getHeroContent, type HeroContent } from "@/lib/cms";

const Hero = () => {
  const [content, setContent] = useState<HeroContent>(() => getHeroContent());
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const data = await fetchContent<HeroContent>("hero");
      if (data) {
        setContent(data);
      }
    } catch {
      console.warn("[Hero] Using default content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Safe content access with defaults
  const tagline = content?.tagline ?? "";
  const title = content?.title ?? "THE BARBER";
  const titleHighlight = content?.titleHighlight ?? "SHOP";
  const description = content?.description ?? "";
  const primaryButtonText = content?.primaryButtonText ?? "Book Now";
  const primaryButtonLink = content?.primaryButtonLink ?? "#booking";
  const secondaryButtonText = content?.secondaryButtonText ?? "See What We Do";
  const secondaryButtonLink = content?.secondaryButtonLink ?? "#services";
  const media = content?.media;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Media Background */}
      <div className="absolute inset-0 z-0">
        {!isLoading && media?.src && (
          <MediaRenderer
            type={media.type ?? "video"}
            src={media.src}
            alt={media.alt ?? "Hero background"}
            className="w-full h-full object-cover"
            videoClassName="w-full h-full object-cover"
            fallbackSrc="/uploads/hero-video.mp4"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block text-primary uppercase tracking-widest text-sm mb-6">
            {tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium mb-6"
        >
          {title}
          <br />
          <span className="text-gradient-gold">{titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href={primaryButtonLink} className="btn-primary">
            {primaryButtonText}
          </a>
          <a href={secondaryButtonLink} className="btn-outline">
            {secondaryButtonText}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
