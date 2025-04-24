
import HeroSection from '@/components/HeroSection';
import FeaturedServers from '@/components/FeaturedServers';
import TopVotedServers from '@/components/TopVotedServers';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturedServers />
      <TopVotedServers />
      
      {/* How it works section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              RustList makes it easy to find and promote Rust servers in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rust-card p-6 text-center">
              <div className="w-16 h-16 bg-rust-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rust-500">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Register Your Server</h3>
              <p className="text-muted-foreground mb-4">
                Create an account and submit your Rust server details including name, IP, description, and tags.
              </p>
              <Button asChild variant="outline">
                <Link to="/add-server">Add Your Server</Link>
              </Button>
            </div>
            
            <div className="rust-card p-6 text-center">
              <div className="w-16 h-16 bg-rust-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rust-500">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Get Votes</h3>
              <p className="text-muted-foreground mb-4">
                Encourage your players to vote for your server daily to climb the rankings and increase visibility.
              </p>
              <Button asChild variant="outline">
                <Link to="/servers">Browse Servers</Link>
              </Button>
            </div>
            
            <div className="rust-card p-6 text-center">
              <div className="w-16 h-16 bg-rust-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rust-500">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Grow Your Community</h3>
              <p className="text-muted-foreground mb-4">
                Watch your player base grow as your server gains visibility in our rankings and server listings.
              </p>
              <Button asChild variant="outline">
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-12 md:py-16 bg-rust-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/rust-pattern.png')] opacity-10 bg-repeat mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to showcase your Rust server?</h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of server owners who've boosted their player count through RustList
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/add-server">Add Server</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
