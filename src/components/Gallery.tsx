import { useMemo } from "react";
import { motion } from "framer-motion";
import MediaRenderer from "./MediaRenderer";

const images = [
  "/Images/BarberShop-img/img-1.jpg",
  "/Images/BarberShop-img/img-2.jpg",
  "/Images/BarberShop-img/img-3.jpg",
  "/Images/BarberShop-img/img-4.jpg",
];

const Gallery = () => {

  const duplicatedItems = useMemo(
    () => (images.length > 0 ? [...images, ...images, ...images] : []),
    [images]
  );

  const animationDuration = useMemo(
    () => Math.max(20, images.length * 8),
    [images.length]
  );

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 px-6"
      >
        <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
          See The Results
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium">
          Real <span className="text-gradient-gold">Work</span>
        </h2>
      </motion.div>

      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="relative">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -50 * images.length + "%"],
            }}
            transition={{
              x: {
                duration: animationDuration,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {duplicatedItems.map((imageSrc, index) => (
              <div
                key={`gallery-${index}`}
                className="flex-shrink-0 w-72 md:w-96 aspect-[4/3] rounded-3xl overflow-hidden bg-white/5"
              >
                <MediaRenderer
                  type="image"
                  src={imageSrc}
                  alt={`Gallery item ${(index % images.length) + 1}`}
                  className="w-full h-full object-cover object-center"
                  videoClassName="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </motion.div>
        </div>
    </section>
  );
};

export default Gallery;
