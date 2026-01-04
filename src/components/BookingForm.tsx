import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Calendar, Clock, User, Mail, Phone, MapPin } from "lucide-react";

const branches = [
  { id: "branch-54", name: "The Barber Shop 54", address: "DF 62, Scheme No 54, Vijay Nagar, Indore" },
  { id: "branch-114", name: "The Barber Shop 114", address: "Plot no 43, near Mahindra Showroom, Scheme No 114, Indore" },
];

// Available time slots: 12:00 PM to 8:00 PM
const timeSlots = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

const BUSINESS_EMAIL = "thebarbershop114@gmail.com";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  branch: string;
  date: string;
  timeSlot: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  branch?: string;
  date?: string;
  timeSlot?: string;
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    date: "",
    timeSlot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canSelectTimeSlot = formData.branch && formData.date;

  // Check if a date is a weekday (Monday to Friday)
  const isWeekday = (dateString: string): boolean => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday = 1, Friday = 5
  };

  // Check if the selected date is today
  const isToday = (dateString: string): boolean => {
    const today = new Date();
    const selected = new Date(dateString);
    return (
      today.getFullYear() === selected.getFullYear() &&
      today.getMonth() === selected.getMonth() &&
      today.getDate() === selected.getDate()
    );
  };

  // Convert time slot string to hours (24h format)
  const getSlotHour = (slot: string): number => {
    const [time, period] = slot.split(" ");
    let [hours] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours;
  };

  // Filter out past time slots if selected date is today
  const getAvailableSlots = (): string[] => {
    if (!formData.date || !isToday(formData.date)) {
      return timeSlots;
    }

    const now = new Date();
    const currentHour = now.getHours();

    return timeSlots.filter((slot) => {
      const slotHour = getSlotHour(slot);
      return slotHour > currentHour;
    });
  };

  // Simulate loading time slots when branch and date are selected
  useEffect(() => {
    if (formData.branch && formData.date) {
      // Check if selected date is a weekday
      if (!isWeekday(formData.date)) {
        setErrors((prev) => ({ ...prev, date: "We're open Monday to Friday only" }));
        setAvailableSlots([]);
        return;
      }

      setIsLoadingSlots(true);
      setFormData((prev) => ({ ...prev, timeSlot: "" }));
      
      // Simulate API call
      const timer = setTimeout(() => {
        // Get available slots (filtering past times for today)
        const slots = getAvailableSlots();
        
        if (slots.length === 0 && isToday(formData.date)) {
          setErrors((prev) => ({ ...prev, date: "No more slots available today. Please select another date." }));
        }
        
        setAvailableSlots(slots);
        setIsLoadingSlots(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.branch, formData.date]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.branch) {
      newErrors.branch = "Please select a branch";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = "Please select a time slot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      branch: "",
      date: "",
      timeSlot: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0];

  if (isSuccess) {
    return (
      <section id="booking" className="section-padding bg-black">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-white mx-auto mb-6 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-black" />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-medium text-white mb-4"
            >
              Appointment Booked!
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/60 mb-8"
            >
              We've sent a confirmation to {formData.email}. For any queries, contact us at {BUSINESS_EMAIL}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-2xl p-6 mb-8 text-left space-y-3"
            >
              <div className="flex items-center gap-3 text-white/80">
                <Calendar className="w-4 h-4" />
                <span>{new Date(formData.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Clock className="w-4 h-4" />
                <span>{formData.timeSlot}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>{branches.find(b => b.id === formData.branch)?.name}</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={resetForm}
              className="text-white/60 hover:text-white transition-colors text-sm tracking-wide"
            >
              Book Another Appointment
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-white/60 uppercase tracking-widest text-sm mb-4 block">
            Reserve Your Spot
          </span>
          <h2 className="text-4xl md:text-5xl font-medium text-white">
            Book an Appointment
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full bg-white/5 border ${
                    errors.fullName ? "border-white/40" : "border-white/10"
                  } rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all duration-200`}
                />
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.fullName}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full bg-white/5 border ${
                    errors.email ? "border-white/40" : "border-white/10"
                  } rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all duration-200`}
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className={`w-full bg-white/5 border ${
                    errors.phone ? "border-white/40" : "border-white/10"
                  } rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all duration-200`}
                />
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Branch
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className={`w-full bg-white/5 border ${
                    errors.branch ? "border-white/40" : "border-white/10"
                  } rounded-xl py-4 pl-12 pr-4 text-white appearance-none cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all duration-200 ${!formData.branch && "text-white/30"}`}
                >
                  <option value="" disabled className="bg-[#0a0a0a]">
                    Select a branch
                  </option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id} className="bg-[#0a0a0a] text-white">
                      {branch.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <AnimatePresence>
                {errors.branch && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.branch}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`w-full bg-white/5 border ${
                    errors.date ? "border-white/40" : "border-white/10"
                  } rounded-xl py-4 pl-12 pr-4 text-white cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all duration-200 [color-scheme:dark] ${!formData.date && "text-white/30"}`}
                />
              </div>
              <AnimatePresence>
                {errors.date && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.date}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Time Slot */}
            <div className="space-y-2">
              <label className="block text-white/80 text-sm tracking-wide">
                Time Slot
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                {isLoadingSlots ? (
                  <div className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 flex items-center gap-3">
                    <Loader2 className="w-5 h-5 text-white/50 animate-spin" />
                    <span className="text-white/50">Loading available slots...</span>
                  </div>
                ) : (
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    disabled={!canSelectTimeSlot}
                    className={`w-full bg-white/5 border ${
                      errors.timeSlot ? "border-white/40" : "border-white/10"
                    } rounded-xl py-4 pl-12 pr-4 text-white appearance-none
                    focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                    transition-all duration-200 
                    ${!canSelectTimeSlot ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${!formData.timeSlot && "text-white/30"}`}
                  >
                    <option value="" disabled className="bg-[#0a0a0a]">
                      {canSelectTimeSlot ? "Select a time slot" : "Select branch & date first"}
                    </option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot} className="bg-[#0a0a0a] text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                )}
                {!isLoadingSlots && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
              <AnimatePresence>
                {errors.timeSlot && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-white/50 text-sm"
                  >
                    {errors.timeSlot}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white text-black font-medium py-4 rounded-full 
                     transition-all duration-200 mt-8 flex items-center justify-center gap-2
                     disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Booking...</span>
              </>
            ) : (
              <span>Book Appointment</span>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default BookingForm;
