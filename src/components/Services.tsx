import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

const staticServices = [
  {
    title: "Haircut",
    subtitle: "Men & Women",
    description: "Clean fades, classic cuts, or something new. Tell us what you want and we'll make it happen.",
  },
  {
    title: "Facial",
    subtitle: "Deep Clean",
    description: "Tired skin? Dull face? Our facials clear out the gunk and bring back the glow.",
  },
  {
    title: "Hydrafacial",
    subtitle: "Premium",
    description: "The real deal. Medical-grade hydration that you'll see and feel instantly.",
  },
  {
    title: "Pedicure & Manicure",
    subtitle: "Full Service",
    description: "Hands and feet done right. Professional care, not a quick polish job.",
  },
];

const Services = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        const res = await fetch(`${STRAPI_URL}/api/services-images?populate=*`);
        const json = await res.json();

        const serviceImages = json?.data?.serviceimg;

        if (Array.isArray(serviceImages)) {
          const urls = serviceImages.map((img: any) => {
            const url = img?.url;
            if (!url) return null;
            return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
          }).filter(Boolean);

          setImages(urls);
        }
      } catch (err) {
        console.error("[Services] Strapi fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceImages();
  }, []);

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
            What We Do Best
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium">
            Pick Your <span className="text-gradient-gold">Service</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staticServices.map((service, index) => {
            const imageSrc = images[index];

            return (
              <motion.a
                href="#booking"
                key={`service-${service.title}-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card overflow-hidden group cursor-pointer block"
              >
                <div className="relative h-48 overflow-hidden">
                  {!isLoading && imageSrc && (
                    <MediaRenderer
                      type="image"
                      src={imageSrc}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      videoClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white/60 text-xs uppercase tracking-wider">
                      {service.subtitle}
                    </span>
                    <h3 className="text-xl font-medium text-white">{service.title}</h3>
                  </div>
                </div>
                
                <div className="p-5">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
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
