
import { useState, useEffect } from 'react';
import { ThumbsUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface VoteCardProps {
  serverId: string;
  votes: number;
}

const VoteCard = ({ serverId, votes }: VoteCardProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [countdown, setCountdown] = useState(0);
  
  useEffect(() => {
    // Check if user already voted for this server
    const voteData = localStorage.getItem(`vote_${serverId}`);
    if (voteData) {
      const { timestamp } = JSON.parse(voteData);
      const now = Date.now();
      const timeDiff = now - timestamp;
      const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours
      
      if (timeDiff < cooldownPeriod) {
        setHasVoted(true);
        const remainingTime = cooldownPeriod - timeDiff;
        setCooldownTime(remainingTime);
        setCountdown(Math.floor(remainingTime / 1000));
      }
    }
  }, [serverId]);
  
  useEffect(() => {
    let intervalId: number;
    
    if (cooldownTime > 0) {
      intervalId = window.setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setHasVoted(false);
            setCooldownTime(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cooldownTime]);
  
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleVote = () => {
    if (hasVoted) return;
    
    // Simulate voting API call
    setTimeout(() => {
      // Save the vote timestamp to localStorage
      localStorage.setItem(
        `vote_${serverId}`,
        JSON.stringify({ timestamp: Date.now() })
      );
      
      setHasVoted(true);
      setCooldownTime(24 * 60 * 60 * 1000); // 24 hours
      setCountdown(24 * 60 * 60);
      
      toast.success("Thank you for voting for this server!");
    }, 500);
  };
  
  const progressValue = hasVoted ? ((24 * 60 * 60 - countdown) / (24 * 60 * 60)) * 100 : 0;
  
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-medium">Vote for Server</h3>
      </div>
      
      <div className="p-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-rust-500/10 flex items-center justify-center">
            <ThumbsUp className="h-8 w-8 text-rust-500" />
          </div>
        </div>
        
        <div className="text-2xl font-bold mb-1">{votes} votes</div>
        <p className="text-sm text-muted-foreground mb-6">Vote for this server to help it climb the rankings</p>
        
        {hasVoted ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Vote again in: {formatTime(countdown)}</span>
            </div>
            
            <Progress value={progressValue} className="h-2" />
            
            <Button className="w-full" disabled>
              Already Voted
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-rust-500 hover:bg-rust-600" 
            onClick={handleVote}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Vote Now
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoteCard;
