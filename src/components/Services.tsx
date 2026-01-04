import { motion } from "framer-motion";

const services = [
  {
    title: "Haircut",
    subtitle: "Male & Female",
    description: "Precision cuts tailored to your unique style and personality.",
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
  },
  {
    title: "Facial",
    subtitle: "Rejuvenating",
    description: "Deep cleansing and nourishing treatments for radiant skin.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    title: "Hydrafacial",
    subtitle: "Premium Care",
    description: "Advanced hydration therapy for a refreshed, glowing complexion.",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80",
  },
  {
    title: "Pedicure & Manicure",
    subtitle: "Complete Care",
    description: "Luxurious hand and foot treatments for ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
  },
];

const Services = () => {
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
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.a
              href="#booking"
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card overflow-hidden group cursor-pointer block"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-white/60 text-xs uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                  <h3 className="text-xl font-medium text-white">{service.title}</h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  Book Now →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
