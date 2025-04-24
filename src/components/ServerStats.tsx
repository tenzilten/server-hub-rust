
import { useState } from 'react';
import { Users, Clock, Server as ServerIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ServerCardProps } from './ServerCard';

interface ServerStatsProps {
  server: ServerCardProps;
}

const ServerStats = ({ server }: ServerStatsProps) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const playerPercentage = (server.players.current / server.players.max) * 100;
  
  const mockDetails = {
    wiped: '2 days ago',
    uptime: '99.8%',
    ping: '32ms',
    averagePlayers: {
      daily: 78,
      weekly: 65,
    },
    connection: {
      average: '18min',
      peak: '2.3h',
    },
  };
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">Server Statistics</h3>
      </div>
      
      <div className="p-4 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Players Online</span>
            </div>
            <span className="font-medium">{server.players.current}/{server.players.max}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Progress value={playerPercentage} className="h-2" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{playerPercentage.toFixed(1)}% Full</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>Last Wiped</span>
            </div>
            <div className="font-medium">{mockDetails.wiped}</div>
          </div>
          
          <div className="bg-secondary rounded-lg p-3">
            <div className="flex items-center text-sm text-muted-foreground mb-1">
              <ServerIcon className="h-4 w-4 mr-1" />
              <span>Uptime</span>
            </div>
            <div className="font-medium">{mockDetails.uptime}</div>
          </div>
        </div>
        
        {showFullDetails && (
          <div className="space-y-4 pt-2">
            <div>
              <h4 className="text-sm font-medium mb-2">Average Players</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-secondary rounded-md">
                  <div className="text-xs text-muted-foreground">Daily</div>
                  <div className="font-medium">{mockDetails.averagePlayers.daily}</div>
                </div>
                <div className="text-center p-2 bg-secondary rounded-md">
                  <div className="text-xs text-muted-foreground">Weekly</div>
                  <div className="font-medium">{mockDetails.averagePlayers.weekly}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Connection Time</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-secondary rounded-md">
                  <div className="text-xs text-muted-foreground">Average</div>
                  <div className="font-medium">{mockDetails.connection.average}</div>
                </div>
                <div className="text-center p-2 bg-secondary rounded-md">
                  <div className="text-xs text-muted-foreground">Peak</div>
                  <div className="font-medium">{mockDetails.connection.peak}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <button 
          className="text-sm text-rust-500 hover:underline w-full text-center"
          onClick={() => setShowFullDetails(!showFullDetails)}
        >
          {showFullDetails ? 'Show Less' : 'Show More Stats'}
        </button>
      </div>
    </div>
  );
};

export default ServerStats;
