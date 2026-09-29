import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DashboardPreview from "../components/DashboardPreview";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs";
import AIChatBot from "../components/AIChatBot";

export default function LandingPage() {
  return (
    <div className="bg-[#FAF8F4] overflow-hidden">
      <Navbar />
      <Hero />
      <DashboardPreview />
      <Features />
      <Pricing />
      <ContactUs />
      <Footer />
      <AIChatBot />
    </div>
  );
}