
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Plus, Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-dark-300 border-b border-border py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/rust-pattern.png')] opacity-10 bg-repeat"></div>
      
      {/* Gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight">
            Find and Showcase the Best <span className="text-rust-500">Rust Servers</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover top Rust gaming servers, vote for your favorites, and promote your own servers to thousands of players worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-rust-500 hover:bg-rust-600 h-12 px-6">
              <Link to="/servers">
                <Search className="mr-2 h-5 w-5" />
                Browse Servers
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              asChild 
              className="border-rust-500 text-rust-500 hover:bg-rust-500/10 h-12 px-6"
            >
              <Link to="/add-server">
                <Plus className="mr-2 h-5 w-5" />
                Add Your Server
              </Link>
            </Button>
          </div>
          
          <div className="mt-10 flex items-center justify-center space-x-5 text-sm">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-rust-500">500+</span>
              <span className="text-muted-foreground">Active Servers</span>
            </div>
            
            <div className="h-8 w-px bg-border"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-rust-500">10k+</span>
              <span className="text-muted-foreground">Monthly Votes</span>
            </div>
            
            <div className="h-8 w-px bg-border"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-rust-500">50k+</span>
              <span className="text-muted-foreground">Monthly Players</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center animate-bounce">
        <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
      </div>
    </div>
  );
};

export default HeroSection;
