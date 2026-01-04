import { motion } from "framer-motion";
import { Phone, Instagram, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-medium mb-2">
              THE BARBER <span className="text-gradient-gold">SHOP</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Premium Grooming Experience
            </p>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-6">
            <a
              href="tel:9669932228"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>9669932228</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} THE BARBER SHOP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
