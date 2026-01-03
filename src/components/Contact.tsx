import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Book Your <span className="text-gradient-gold">Visit</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Ready to experience premium grooming? Call us or drop by the shop.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Phone,
              title: "Call Us",
              info: "9669932228",
              link: "tel:9669932228",
            },
            {
              icon: MapPin,
              title: "Location",
              info: "Shop 114, Premium Mall",
              link: "#",
            },
            {
              icon: Clock,
              title: "Hours",
              info: "10 AM - 9 PM",
              link: null,
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              {item.link ? (
                <a
                  href={item.link}
                  className="text-muted-foreground hover:text-primary transition-colors text-lg"
                >
                  {item.info}
                </a>
              ) : (
                <span className="text-muted-foreground text-lg">{item.info}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-medium mb-4">
            Ready for a fresh look?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Walk in or call ahead. We're here to make you look your absolute best.
          </p>
          <a
            href="tel:9669932228"
            className="btn-primary inline-flex items-center gap-3 text-lg"
          >
            <Phone className="w-5 h-5" />
            Call 9669932228
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
