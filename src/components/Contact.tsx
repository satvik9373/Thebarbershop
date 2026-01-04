import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Calendar } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
            Find Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
            Two <span className="text-gradient-gold">Locations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Vijay Nagar or Scheme 114. Pick what's closer. Same quality at both.
          </p>
        </motion.div>

        {/* Branch Locations */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              name: "The Barber Shop 114",
              address: "Plot no 43, near Mahindra Showroom, Part I, Scheme No 114, Indore, Madhya Pradesh 452010",
              phone: "9669932228",
            },
            {
              name: "The Barber Shop 54",
              address: "DF 62, Scheme No 54, Vijay Nagar, Indore, Madhya Pradesh 452010",
              phone: "9669932228",
            },
          ].map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 group"
            >
              <h3 className="text-lg font-medium mb-3">{branch.name}</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                  <a href={`tel:${branch.phone}`} className="hover:text-primary transition-colors">
                    {branch.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hours & Contact */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium mb-1">Business Hours</h3>
              <p className="text-muted-foreground text-sm">Mon - Fri: 10 AM - 10 PM</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-card p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-base font-medium mb-1">Call Us</h3>
              <a href="tel:9669932228" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                9669932228
              </a>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass-card p-6 md:p-8 text-center"
        >
          <h3 className="text-xl md:text-2xl font-medium mb-3">
            Stop scrolling. Start booking.
          </h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Walk-ins welcome. But if you want a guaranteed slot, book now. Takes 30 seconds.
          </p>
          <a
            href="#booking"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
