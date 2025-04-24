
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ThumbsUp, ExternalLink, Copy, Globe, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';

export interface ServerCardProps {
  id: string;
  name: string;
  banner?: string;
  logo?: string;
  description: string;
  ip: string;
  port: number;
  country: string;
  countryCode: string;
  players: {
    current: number;
    max: number;
  };
  votes: number;
  tags: string[];
  status: 'online' | 'offline';
  featured?: boolean;
}

const ServerCard = ({ server }: { server: ServerCardProps }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${server.ip}:${server.port}`);
    setCopied(true);
    toast.success('Server address copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={`rust-card relative ${server.featured ? 'border-rust-500' : ''}`}>
      {server.featured && (
        <div className="absolute top-0 right-0 bg-rust-500 text-white text-xs font-medium px-2 py-1 rounded-bl-md">
          Featured
        </div>
      )}
      
      <div className="aspect-[21/9] overflow-hidden relative">
        <Link to={`/servers/${server.id}`}>
          {server.banner ? (
            <img 
              src={server.banner} 
              alt={`${server.name} banner`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <span className="text-muted-foreground">No banner image</span>
            </div>
          )}
        </Link>
      </div>
      
      <div className="p-4 flex flex-col h-[calc(100%-9rem)]">
        <div className="flex items-center gap-3 mb-3">
          {server.logo && (
            <img 
              src={server.logo} 
              alt={`${server.name} logo`} 
              className="w-10 h-10 rounded-md object-cover"
            />
          )}
          <div>
            <Link to={`/servers/${server.id}`} className="font-semibold text-lg hover:text-rust-500 transition-colors">
              {server.name}
            </Link>
            <div className="flex items-center text-xs text-muted-foreground gap-3">
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <img 
                  src={`https://flagcdn.com/16x12/${server.countryCode.toLowerCase()}.png`} 
                  alt={server.country} 
                  className="inline mr-1 h-3" 
                />
                {server.country}
              </div>
              <div className="flex items-center gap-1">
                <Wifi className={`h-3 w-3 ${server.status === 'online' ? 'text-green-500' : 'text-red-500'}`} />
                {server.status === 'online' ? 'Online' : 'Offline'}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {server.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {server.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{server.players.current}/{server.players.max}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              <span>{server.votes}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? 'Copied!' : 'Copy IP'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Link to={`/servers/${server.id}`}>
              <Button 
                size="sm" 
                className="bg-rust-500 hover:bg-rust-600 h-8"
              >
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
