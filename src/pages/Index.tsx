import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HistoryTimeline from "@/components/HistoryTimeline";
import MissionValues from "@/components/MissionValues";
import LeadershipSection from "@/components/LeadershipSection";
import MembershipSection from "@/components/MembershipSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <HistoryTimeline />
      <MissionValues />
      <LeadershipSection />
      <MembershipSection />
      <Footer />
    </div>
  );
};

export default Index;
