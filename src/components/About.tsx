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
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
              Craftsmanship
              <br />
              <span className="text-gradient-gold">Since Day One</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At THE BARBER SHOP 114, we believe every haircut tells a story. 
              Our skilled barbers combine time-honored techniques with contemporary 
              styles to create looks that define you.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Step into our shop and experience the perfect blend of classic 
              barbershop tradition and modern luxury. From precision fades to 
              hot towel shaves, we've got you covered.
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
              { number: "114", label: "Years of Trust" },
              { number: "5K+", label: "Happy Clients" },
              { number: "15+", label: "Expert Barbers" },
              { number: "100%", label: "Satisfaction" },
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
