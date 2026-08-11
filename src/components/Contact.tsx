import { useForm } from "react-hook-form";
import { portfolioData } from "../data/portfolio";
import { Send, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API or client-side feedback
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Contact payload structured:", data);

    // Construct local mailto fallback trigger
    const mailtoLink = `mailto:${portfolioData.personalInfo.email}?subject=Portfolio Contact from ${encodeURIComponent(data.name)}&body=${encodeURIComponent(data.message + "\n\nReply to: " + data.email)}`;
    window.location.href = mailtoLink;

    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-black border-t border-stroke/30 overflow-hidden"
    >
      {/* Background ambient circular glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#4E85BF] opacity-[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-16">

        {/* Contact Header */}
        <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-wider text-accent-blue uppercase font-mono">
            [ SECURE CONNECTION PROTOCOL ]
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text leading-tight font-sans">
            Let's <span className="font-serif-italic text-accent-blue font-medium">connect</span>
          </h2>
          <p className="text-sm md:text-base text-muted/90 leading-relaxed mt-2">
            I am open to internships, working-student positions, and practical projects related to data analysis, BI, data engineering, and AI. Feel free to reach out for opportunities in Germany or remote collaborations.
          </p>
        </div>

        {/* Contact Form & CTA Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Quick Mail Info Column */}
          <div className="md:col-span-4 flex flex-col gap-6 p-6 rounded-2xl bg-surface border border-stroke/40">
            <h3 className="text-xs font-bold text-text font-mono uppercase tracking-widest">Direct channels</h3>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-muted">PRIMARY EMAIL</span>
              <a
                href={`mailto:${portfolioData.personalInfo.email}`}
                className="text-sm font-semibold text-accent-blue hover:text-text transition-colors break-all"
              >
                {portfolioData.personalInfo.email}
              </a>
            </div>
            <div className="flex flex-col gap-1.5 pt-4 border-t border-stroke/20">
              <span className="text-xs text-muted">LOCATION</span>
              <span className="text-xs text-text font-medium">
                {portfolioData.personalInfo.location}
              </span>
            </div>
            <div className="flex flex-col gap-1.5 pt-4 border-t border-stroke/20">
              <span className="text-xs text-muted">WORK AUTHORISATION</span>
              <span className="text-xs text-text font-medium">
                {portfolioData.personalInfo.note}
              </span>
            </div>
          </div>

          {/* Fully Functional Contact Form */}
          <div className="md:col-span-8 p-6 md:p-8 rounded-2xl bg-surface border border-stroke/40 relative">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

              {/* Row: Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono text-muted uppercase">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  {...register("name", { required: "Name is required" })}
                  className="px-4 py-3 rounded-xl border border-stroke bg-black/40 text-sm text-text focus:outline-none focus:border-accent-blue/60 transition-colors w-full"
                />
                {errors.name && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Row: Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono text-muted uppercase">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email structure"
                    }
                  })}
                  className="px-4 py-3 rounded-xl border border-stroke bg-black/40 text-sm text-text focus:outline-none focus:border-accent-blue/60 transition-colors w-full"
                />
                {errors.email && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Row: Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono text-muted uppercase">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your internship program or project needs..."
                  {...register("message", { required: "Message is required" })}
                  className="px-4 py-3 rounded-xl border border-stroke bg-black/40 text-sm text-text focus:outline-none focus:border-accent-blue/60 transition-colors w-full resize-none"
                />
                {errors.message && (
                  <span className="text-xs text-rose-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Success Feedback Overlay */}
              {isSubmitted && (
                <div className="flex items-center gap-2 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 text-xs text-emerald-400 font-mono">
                  <CheckCircle className="w-4 h-4" />
                  <span>Message draft compiled successfully! Redirecting to mailto client.</span>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
                >
                  <span>{isSubmitting ? "Drafting..." : "Get in touch"}</span>
                  <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
