
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ServerCard, { ServerCardProps } from './ServerCard';
import { mockServers } from '@/data/mock-data';

const TopVotedServers = () => {
  const [topServers, setTopServers] = useState<ServerCardProps[]>([]);
  
  // In a real app, this would be an API call
  useEffect(() => {
    const sorted = [...mockServers].sort((a, b) => b.votes - a.votes).slice(0, 6);
    setTopServers(sorted);
  }, []);
  
  return (
    <section className="py-12 md:py-16 bg-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Top Voted Servers</h2>
            <p className="text-muted-foreground mt-2">
              The community's favorite Rust servers based on votes
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex" size="sm">
            <Link to="/servers" className="text-rust-500 hover:text-rust-600">
              View All 
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topServers.map(server => (
            <ServerCard key={server.id} server={server} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/servers">
              View All Servers
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopVotedServers;
