import { motion, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  Code, 
  Layout, 
  Monitor, 
  Rocket, 
  Smartphone, 
  Star, 
  CheckCircle2, 
  Mail,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock
} from "lucide-react";
import { useState, useRef } from "react";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 50));
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-primary/80 backdrop-blur-lg border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none">M</span>
          </div>
          <span className="text-xl font-bold tracking-tighter">MATHEFAEL</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#work" className="hover:text-white transition-colors">Our Work</a>
          <a href="#why-us" className="hover:text-white transition-colors">Why Us</a>
          <a href="#contact" className="hover:text-white transition-colors underline underline-offset-4 decoration-accent">Let's Talk</a>
        </div>
        
        <button className="md:hidden">
          <Layout className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest text-white/60 mb-6 uppercase">
            <Zap className="w-3 h-3 text-accent" /> Premium Design & Development
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8">
            We Build Websites That <span className="text-accent underline decoration-white/20 underline-offset-8">Convert</span>.
          </h1>
          <p className="text-xl text-white/60 max-w-lg mb-10 leading-relaxed">
            Fast, reliable, and high-quality digital solutions for businesses that demand excellence. We turn your vision into a high-performance machine.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#work" className="btn-outline">
              View Our Work
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-zinc-800 flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="client" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-yellow-500 text-yellow-500" />)}
              </div>
              <p className="text-white/40"><span className="text-white font-semibold">150+</span> Happy Clients Worldwide</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative lg:block hidden"
        >
          <div className="aspect-square glass-card relative flex items-center justify-center group overflow-hidden">
             {/* Mockup visualization */}
             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
             <div className="relative w-full aspect-video bg-zinc-900 border border-white/20 rounded-xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-700">
                <div className="h-6 bg-zinc-800 border-b border-white/10 flex items-center px-4 gap-1.5 underline-offset-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="p-4 space-y-4">
                  <div className="w-2/3 h-4 bg-white/10 rounded" />
                  <div className="w-full h-32 bg-white/5 rounded" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-10 bg-white/5 rounded" />
                    <div className="h-10 bg-white/5 rounded" />
                    <div className="h-10 bg-white/5 rounded" />
                  </div>
                </div>
             </div>
             <motion.div 
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 p-6 glass-card border border-white/20 shadow-2xl"
             >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Zap className="text-green-500 w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 font-medium">Performance Score</p>
                    <p className="text-xl font-bold">100/100</p>
                  </div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const items = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Website Development",
      description: "High-performance websites built with the latest technologies. Fast, secure, and fully scalable for your growing business.",
      result: "Professional digital presence"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Portfolio Websites",
      description: "Showcase your work in a way that commands attention. Tailored designs that reflect your unique creative brand.",
      result: "High-value client inquiries"
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Landing Pages",
      description: "Conversion-optimized pages designed to turn traffic into revenue. Every pixel is calculated to trigger action.",
      result: "Higher ROI on ad spend"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Custom Business Sites",
      description: "Complex business requirements simplified into elegant web solutions. Automate processes and scale with ease.",
      result: "Streamlined operations"
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Our Expertise</h2>
          <p className="text-lg text-white/60">We don't just build websites; we build business tools that drive results. Our process is focused on quality and performance.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-default group"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/50 text-sm mb-6 leading-relaxed">{item.description}</p>
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> {item.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProject = () => {
  return (
    <section id="work" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-bold mb-6">CASE STUDY</div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 italic">Breane Pizza Website</h2>
            <div className="space-y-8 mb-10">
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">The Goal</p>
                <p className="text-lg text-white/80">Create a modern, attractive website for an artisanal pizza business that looks as good as the food tastes.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">The Focus</p>
                <p className="text-lg text-white/80">Visual appeal, menu presentation, and a seamless user experience that drives orders.</p>
              </div>
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-2">The Result</p>
                <p className="text-lg text-white/80">Engaging design that attracts customers and improves online presence, leading to a 40% increase in digital engagement.</p>
              </div>
            </div>
            <a 
              href="https://breane-pizza.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 w-fit group"
            >
              Live Demo <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] group relative">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200" 
                alt="Breane Pizza Mockup" 
                className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                 <div>
                   <p className="text-white/60 mb-2">Artisanal Pizza Business</p>
                   <h3 className="text-2xl font-bold">Premium Order Experience</h3>
                 </div>
              </div>
              {/* Floating tech stack */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                {['React', 'Tailwind', 'Motion'].map(tech => (
                  <span key={tech} className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{tech}</span>
                ))}
              </div>
            </div>
            
            {/* Conversion card pop-up */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 glass-card border border-white/20 p-6 shadow-2xl hidden md:block"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Star className="text-white w-6 h-6 fill-white" />
                </div>
                <div>
                  <p className="text-lg font-bold">"Exceptional!"</p>
                  <p className="text-xs text-white/50">Breane Pizza Owner</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const benefits = [
    { title: "Fast Delivery", text: "We respect your timelines. Projects are delivered on time, every time.", icon: <Clock /> },
    { title: "High-End Design", text: "Visual excellence that positions you as a leader in your industry.", icon: <Layout /> },
    { title: "Conversion Focus", text: "Every design decision is made to improve user action and ROI.", icon: <Zap /> },
    { title: "Scalable Code", text: "Clean, professional code that grows with your business.", icon: <Code /> }
  ];

  return (
    <section id="why-us" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-5xl font-bold mb-8 italic">Built for results, not just for show.</h2>
          <p className="text-lg text-white/50 mb-12">We don't settle for "good enough". Our agency is chosen by companies that want to dominate their niche with superior digital tools.</p>
          
          <div className="space-y-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-12 aspect-square flex flex-col justify-center">
             <div className="space-y-6">
               <div className="glass-card">
                  <div>
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Project Performance</p>
                    <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded">Active</span>
                 </div>
                 <div className="w-full h-2 bg-white/5 rounded-full mb-4 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-accent" 
                    />
                 </div>
                 <p className="text-sm font-semibold">95% Efficiency Rate</p>
               </div>
               
               <div className="glass-card transform translate-x-12">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <ShieldCheck className="text-accent w-6 h-6" />
                   </div>
                   <div>
                     <p className="text-sm font-bold">Secure Deployment</p>
                     <p className="text-xs text-white/40">Verified SSL & Security Standards</p>
                   </div>
                 </div>
               </div>
             </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px]" />
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const steps = [
    { num: "01", title: "Brief & Strategy", desc: "We define your goals and map out a precise plan for success." },
    { num: "02", title: "Design & Prototype", desc: "Crafting a visual identity that aligns with your brand values." },
    { num: "03", title: "Development", desc: "Turning designs into fast, functional, and responsive code." },
    { num: "04", title: "Launch", desc: "Quality assurance and deployment for full public release." }
  ];

  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 italic">Simple, Reassuring Process</h2>
          <p className="text-white/50 max-w-xl mx-auto">We follow a rigorous workflow to ensure every project meets our premium quality standards.</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-bold text-white/5 mb-6">{step.num}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
              {i < 3 && <div className="hidden md:block absolute top-[21%] left-full w-full h-[1px] bg-white/10 z-0 translate-x-4" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const FinalCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent -z-10" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-8xl font-bold mb-10 text-white leading-tight">Ready to turn your idea into a <br className="hidden md:block" /> <span className="text-white">high-performing</span> website?</h2>
          <a href="#contact" className="px-12 py-6 bg-white text-black font-black text-xl rounded-full hover:bg-black hover:text-white transition-all scale-105 inline-block shadow-2xl">
            Let's Build Yours Today
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-bold mb-8 italic">Let’s Start <br />Something Great.</h2>
            <p className="text-lg text-white/50 mb-12">Whether you have a specific project in mind or just want to explore possibilities, we're here to help you lead.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Contact Us</p>
                  <p className="text-xl font-bold">mathefael@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-widest">Your Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-widest">Project Type</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent appearance-none">
                  <option className="bg-zinc-900 border-none">Select Type</option>
                  <option className="bg-zinc-900">Website Development</option>
                  <option className="bg-zinc-900">Landing Page</option>
                  <option className="bg-zinc-900">Portfolio Site</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-white/40 uppercase mb-2 block tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="Tell us about your project..."></textarea>
              </div>
              <button className="w-full btn-primary py-5">
                Send Project Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded flex items-center justify-center">
              <span className="text-white font-black text-xs">M</span>
            </div>
            <span className="text-lg font-bold tracking-tighter">MATHEFAEL</span>
          </div>
          
          <p className="text-xs text-white/20 font-medium">© 2026 Mathefael Digital Studio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-primary min-h-screen text-white font-sans">
      <Navbar />
      <Hero />
      <Services />
      <FeaturedProject />
      <WhyUs />
      <Process />
      <FinalCTA />
      <Contact />
      <Footer />
    </div>
  );
}
