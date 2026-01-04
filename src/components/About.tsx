import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="text-primary uppercase tracking-widest text-sm mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Not Just Haircuts.
              <br />
              <span className="text-gradient-gold">Confidence.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              10 years in Indore. Two prime locations. 15+ trained barbers who actually 
              listen. We don't do rushed cuts. Every client gets the time and attention 
              they deserve.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Walk out looking sharp, feeling sharper. Whether it's a clean fade, 
              a classic cut, or a full grooming session, we deliver results, 
              not excuses.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "10+", label: "Years in Indore" },
              { number: "5000+", label: "Clients Served" },
              { number: "15+", label: "Trained Barbers" },
              { number: "2", label: "Prime Locations" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center"
              >
                <div className="text-4xl md:text-5xl font-medium text-gradient-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
