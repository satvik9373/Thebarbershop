import { motion } from "framer-motion";
import { Scissors, Sparkles, Droplets, Star } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Classic Haircut",
    description: "Precision cuts tailored to your face shape and style preferences.",
    price: "₹400",
  },
  {
    icon: Sparkles,
    title: "Beard Styling",
    description: "Expert beard trimming and shaping for a distinguished look.",
    price: "₹250",
  },
  {
    icon: Droplets,
    title: "Hot Towel Shave",
    description: "Traditional straight razor shave with hot towel treatment.",
    price: "₹350",
  },
  {
    icon: Star,
    title: "Premium Package",
    description: "Complete grooming experience with haircut, beard, and facial.",
    price: "₹800",
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
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="glass-card p-8 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {service.description}
              </p>
              <div className="text-2xl font-medium text-gradient-gold">
                {service.price}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
