import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";

interface HeroContent {
  tagline: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  media: {
    type: "image" | "video";
    src: string;
    alt: string;
  } | null;
}

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

const Hero = () => {
  const [content, setContent] = useState<HeroContent>({
    tagline: "Indore's Most Trusted Salon Since 2014",
    title: "THE BARBER",
    titleHighlight: "SHOP",
    description: "5,000+ clients trust us for a reason. Expert cuts, premium facials, zero compromise. Your look, perfected.",
    primaryButtonText: "Book Now",
    primaryButtonLink: "#booking",
    secondaryButtonText: "See What We Do",
    secondaryButtonLink: "#services",
    media: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroMedia = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/hero-media?populate=*`);
        const json = await res.json();

        const media = json?.data?.media;

        if (!media?.url) {
          setIsLoading(false);
          return;
        }

        const fullUrl = media.url.startsWith("http")
          ? media.url
          : `${STRAPI_URL}${media.url}`;

        const mediaType: "image" | "video" =
          media.mime?.startsWith("video/") ? "video" : "image";

        setContent((prev) => ({
          ...prev,
          media: {
            type: mediaType,
            src: fullUrl,
            alt: media.alternativeText || media.name || "Hero image",
          },
        }));
      } catch (err) {
        console.error("[Hero] Strapi fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroMedia();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Media Background */}
      <div className="absolute inset-0 z-0">
        {!isLoading && content.media?.src && (
          <MediaRenderer
            type={content.media.type}
            src={content.media.src}
            alt={content.media.alt}
            className="w-full h-full object-cover"
            videoClassName="w-full h-full object-cover"
            fallbackSrc=""
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
            {content.tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium mb-6"
        >
          {content.title}
          <br />
          <span className="text-gradient-gold">{content.titleHighlight}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          {content.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href={content.primaryButtonLink} className="btn-primary">
            {content.primaryButtonText}
          </a>
          <a href={content.secondaryButtonLink} className="btn-outline">
            {content.secondaryButtonText}
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
