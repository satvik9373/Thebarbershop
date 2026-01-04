import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";
import { fetchContent, getServicesContent, type ServicesContent, type ServiceItem } from "@/lib/cms";

const Services = () => {
  const [content, setContent] = useState<ServicesContent>(() => getServicesContent());
  const [isLoading, setIsLoading] = useState(true);

  const loadContent = useCallback(async () => {
    try {
      const data = await fetchContent<ServicesContent>("services");
      if (data?.items?.length) {
        setContent(data);
      }
    } catch {
      console.warn("[Services] Using default content");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // Safe content access with defaults
  const tagline = content?.tagline ?? "What We Do Best";
  const title = content?.title ?? "Pick Your";
  const titleHighlight = content?.titleHighlight ?? "Service";
  const services: ServiceItem[] = content?.items ?? [];

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
            {tagline}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium">
            {title} <span className="text-gradient-gold">{titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            // Safe access to service properties
            const serviceTitle = service?.title ?? "Service";
            const serviceSubtitle = service?.subtitle ?? "";
            const serviceDescription = service?.description ?? "";
            const serviceMedia = service?.media;

            return (
              <motion.a
                href="#booking"
                key={`service-${serviceTitle}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card overflow-hidden group cursor-pointer block"
              >
                {/* Media */}
                <div className="relative h-48 overflow-hidden">
                  {serviceMedia?.src && (
                    <MediaRenderer
                      type={serviceMedia.type ?? "image"}
                      src={serviceMedia.src}
                      alt={serviceMedia.alt ?? serviceTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      videoClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white/60 text-xs uppercase tracking-wider">
                      {serviceSubtitle}
                    </span>
                    <h3 className="text-xl font-medium text-white">{serviceTitle}</h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {serviceDescription}
                  </p>
                  <span className="text-primary text-sm font-medium group-hover:underline">
                    Get This →
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
