
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Globe, ExternalLink, Share2, Flag, Users, ThumbsUp, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServerStats from '@/components/ServerStats';
import VoteCard from '@/components/VoteCard';
import { toast } from 'sonner';
import { ServerCardProps } from '@/components/ServerCard';
import { mockServers } from '@/data/mock-data';

const ServerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [server, setServer] = useState<ServerCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundServer = mockServers.find(s => s.id === id) || null;
      setServer(foundServer);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const copyToClipboard = () => {
    if (!server) return;
    
    navigator.clipboard.writeText(`${server.ip}:${server.port}`);
    toast.success('Server address copied to clipboard');
  };
  
  const shareServer = () => {
    if (navigator.share) {
      navigator.share({
        title: server?.name,
        text: `Check out this Rust server: ${server?.name}`,
        url: window.location.href,
      });
    } else {
      copyToClipboard();
      toast.success('Link copied, share it with your friends!');
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="w-full aspect-[3/1] bg-secondary animate-pulse rounded-lg mb-8"></div>
        <div className="h-8 w-1/3 bg-secondary animate-pulse rounded mb-4"></div>
        <div className="h-4 w-2/3 bg-secondary animate-pulse rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="h-64 bg-secondary animate-pulse rounded-lg"></div>
          </div>
          <div className="h-64 bg-secondary animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }
  
  if (!server) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Server Not Found</h2>
        <p className="text-muted-foreground mb-6">This server doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/servers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Servers
          </Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-dark-300 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/servers" className="flex items-center text-sm text-muted-foreground hover:text-rust-500 transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to servers
          </Link>
        </div>
      </div>
      
      {/* Server banner */}
      <div className="relative w-full max-h-[400px] overflow-hidden border-b border-border bg-dark-400">
        {server.banner ? (
          <img 
            src={server.banner} 
            alt={`${server.name} banner`} 
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="w-full h-[300px] bg-dark-300 flex items-center justify-center">
            <span className="text-muted-foreground">No banner image</span>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Server header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            {server.logo && (
              <img 
                src={server.logo} 
                alt={`${server.name} logo`} 
                className="hidden md:block w-16 h-16 rounded-lg object-cover border border-border"
              />
            )}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{server.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <img 
                    src={`https://flagcdn.com/16x12/${server.countryCode.toLowerCase()}.png`} 
                    alt={server.country} 
                    className="inline mr-1" 
                  />
                  {server.country}
                </div>
                <div className={`flex items-center gap-1 ${server.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                  <span className={`inline-block w-2 h-2 rounded-full ${server.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {server.status === 'online' ? 'Online' : 'Offline'}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {server.players.current}/{server.players.max} players
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              <code>{server.ip}:{server.port}</code>
            </Button>
            <Button onClick={shareServer} variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="destructive" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Server tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {server.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Server content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6 bg-secondary">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="wiping">Wiping Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <div className="prose prose-invert max-w-none">
                  <h2>About {server.name}</h2>
                  <p className="text-muted-foreground">{server.description}</p>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vulputate felis in eros rhoncus, at cursus orci ultricies. Donec nec velit turpis. Nulla facilisi. Nunc nec mi ac nulla tincidunt aliquam vel in enim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                  </p>
                  
                  <h3>Features</h3>
                  <ul className="text-muted-foreground">
                    <li>Custom plugins for enhanced gameplay</li>
                    <li>Active admin team to assist players</li>
                    <li>Regular events with rewards</li>
                    <li>Balanced economy system</li>
                    <li>Anti-cheat protection</li>
                  </ul>
                </div>
                {server.featured && (
                  <div className="mt-8">
                    <Separator className="my-6" />
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-2">Connect to Server</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Use these quick links to connect directly to our server from your browser.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-rust-500 hover:bg-rust-600">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Connect via Steam
                        </Button>
                        <Button variant="outline">
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rules">
                <div className="prose prose-invert max-w-none">
                  <h2>Server Rules</h2>
                  <p className="text-muted-foreground">
                    Please follow these rules to ensure a fair and enjoyable experience for all players.
                  </p>
                  
                  <ol className="text-muted-foreground">
                    <li>No cheating, hacking, or exploiting bugs</li>
                    <li>Respect all players and staff</li>
                    <li>No racist, sexist, or offensive language</li>
                    <li>No advertising other servers</li>
                    <li>No base camping or spawn killing</li>
                    <li>No teaming in solo/duo modes</li>
                    <li>Report bugs to admins</li>
                  </ol>
                  
                  <p className="text-muted-foreground">Failure to follow these rules may result in a temporary or permanent ban.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="wiping">
                <div className="prose prose-invert max-w-none">
                  <h2>Wiping Schedule</h2>
                  <p className="text-muted-foreground">Our server follows a regular wiping schedule to keep the gameplay fresh.</p>
                  
                  <h3>Wipe Types</h3>
                  <ul className="text-muted-foreground">
                    <li><strong>Map Wipe:</strong> Every Thursday at 3 PM EST</li>
                    <li><strong>BP Wipe:</strong> First Thursday of each month</li>
                  </ul>
                  
                  <h3>Next Wipes</h3>
                  <ul className="text-muted-foreground">
                    <li><strong>Next Map Wipe:</strong> Thursday, May 4th, 2023</li>
                    <li><strong>Next BP Wipe:</strong> Thursday, June 1st, 2023</li>
                  </ul>
                  
                  <p className="text-muted-foreground">We may occasionally adjust the wipe schedule for special events. Follow our Discord for announcements.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <VoteCard serverId={server.id} votes={server.votes} />
            <ServerStats server={server} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerDetailPage;
