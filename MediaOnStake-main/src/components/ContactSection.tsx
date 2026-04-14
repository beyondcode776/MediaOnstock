import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSteps = [
  {
    title: "What do you need?",
    options: [
      "Website Design & Development",
      "Performance Marketing",
      "SEO & Content",
      "Social Media Management",
      "Complete Digital Transformation",
    ],
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionSelect = (value: string) => {
    if (currentStep === 0) {
      setFormData({ ...formData, service: value });
    }
    setCurrentStep(currentStep + 1);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = () => {
    const phoneNumber = "917379340224"; // Your WhatsApp number
    const message = `
*New Contact Form Submission*

*Service:* ${formData.service}
*Name:* ${formData.name}
*Email:* ${formData.email}
*Company:* ${formData.company}
*Project Details:* ${formData.message}

*Submitted via Website Contact Form*
    `.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we're still in multi-step selection
    if (currentStep < 1) {
      setCurrentStep(1); // Move to final form
      return;
    }
    
    // Validate required fields
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name and Email)",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Redirect to WhatsApp instead of simulating submission
    setTimeout(() => {
      sendToWhatsApp();
      
      toast({
        title: "Redirecting to WhatsApp",
        description: "You'll be redirected to WhatsApp to send your message",
      });
      
      setIsSubmitting(false);
      setCurrentStep(2); // Show success state
    }, 1000);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderFormStep = () => {
    // Success state
    if (currentStep === 2) {
      return (
        <div className="glass-card p-8 text-center">
          <div className="w-16 h-16 bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-display font-bold text-2xl text-foreground mb-3">
            Message Ready!
          </h3>
          <p className="text-muted-foreground mb-6">
            Your message has been prepared and WhatsApp should have opened. If not, 
            click the button below to open WhatsApp manually.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={sendToWhatsApp}
              className="btn-primary flex items-center gap-2 justify-center"
            >
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp Again
            </button>
            <button
              onClick={() => {
                setCurrentStep(0);
                setFormData({
                  service: "",
                  name: "",
                  email: "",
                  company: "",
                  message: "",
                });
              }}
              className="px-6 py-3 border border-border hover:bg-muted transition-colors"
            >
              Send New Message
            </button>
          </div>
        </div>
      );
    }

    // Step selection (first step)
    if (currentStep < 1) {
      const step = formSteps[currentStep];
      return (
        <div className="glass-card p-8">
          {currentStep > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-opacity"
              type="button"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </button>
          )}
          
          <h3 className="font-display font-bold text-2xl text-foreground mb-6">
            {step.title}
          </h3>
          <div className="space-y-3">
            {step.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="w-full p-4 border border-border hover:border-primary/50 hover:bg-primary/5 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                type="button"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{option}</span>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // Final form step
    return (
      <form onSubmit={handleSubmit} className="glass-card p-8">
        <div className="mb-8">
          <h3 className="font-display font-bold text-2xl text-foreground mb-2">
            Almost done! Just a few details
          </h3>
          <p className="text-muted-foreground">
            We'll use this information to prepare for our call
          </p>
        </div>

        <div className="space-y-6">
          {/* Service Summary */}
          <div>
            <div className="p-4 bg-primary/5 border border-primary/10">
              <span className="text-sm text-muted-foreground">Service</span>
              <p className="font-medium text-foreground">{formData.service}</p>
            </div>
          </div>

          {/* Contact Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Work Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Your Company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              placeholder="Tell us about your project, goals, timeline..."
            />
          </div>

          <div className="pt-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 mb-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-blue-800 dark:text-blue-300 font-medium text-sm">
                    WhatsApp Submission
                  </p>
                  <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                    After clicking "Send via WhatsApp", you'll be redirected to WhatsApp with your message pre-filled. Just hit send!
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 border border-border hover:bg-muted transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-2 bg-green-600 hover:bg-green-700 border-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                    Preparing WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send via WhatsApp
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Get Started
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Build Something
            <br />
            <span className="neon-text-gradient">Extraordinary Together</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Book a free 15-minute strategy call and discover how we can
            accelerate your growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {renderFormStep()}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Quick Contact */}
            <div className="glass-card p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-4">
                Prefer to talk directly?
              </h4>
              <div className="space-y-4">
                <a
                  href="tel:+917379340224"
                  className="flex items-center gap-4 p-4 bg-muted hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">
                    +91 82529 87378
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Call us anytime
                    </span>
                  </div>
                </a>
                <a
                  href="https://wa.me/917379340224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-muted hover:bg-green-500/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-500/10 flex items-center justify-center border border-green-500/30">
                    <MessageCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">
                      WhatsApp Us Directly
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Quick response guaranteed
                    </span>
                  </div>
                </a>
                <a
                  href="mailto:hello@mediaonstake.agency"
                  className="flex items-center gap-4 p-4 bg-muted hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-foreground font-medium block">
                      hello@mediaonstake.com
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Email us anytime
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Office Info */}
            <div className="glass-card p-6">
              <h4 className="font-display font-bold text-lg text-foreground mb-4">
                Our Office 
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <span className="text-foreground block">
                      Co-working MVD Valley GLA University Mathura
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Chaumuha Mathura India 
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <span className="text-foreground block">Business Hours</span>
                    <span className="text-muted-foreground text-sm">
                      Mon - Fri: 9:00 AM - 6:00 PM (PST)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="glass-card p-2 h-48 overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28285.45547104033!2d77.5554084777832!3d27.60338901688987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39736d007228da85%3A0xd2e7e3dd8c274dc4!2sMVD%20RESTAURANT%20%26%20CAFE!5e0!3m2!1sen!2sin!4v1765089022309!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;