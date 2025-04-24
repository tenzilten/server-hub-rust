
import { useState, useEffect } from 'react';
import ServerCard, { ServerCardProps } from '@/components/ServerCard';
import ServerFilters from '@/components/ServerFilters';
import { Button } from '@/components/ui/button';
import { mockServers } from '@/data/mock-data';

const ServersPage = () => {
  const [servers, setServers] = useState<ServerCardProps[]>([]);
  const [filteredServers, setFilteredServers] = useState<ServerCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const serversPerPage = 9;
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setServers(mockServers);
      setFilteredServers(mockServers);
      setLoading(false);
    }, 500);
  }, []);
  
  const handleFilterChange = (filters: any) => {
    let filtered = [...servers];
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(server => 
        server.name.toLowerCase().includes(searchLower) || 
        `${server.ip}:${server.port}`.includes(searchLower)
      );
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(server => server.status === filters.status);
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(server => 
        filters.tags.some((tag: string) => server.tags.includes(tag))
      );
    }
    
    // Sort servers
    switch (filters.sort) {
      case 'votes':
        filtered = filtered.sort((a, b) => b.votes - a.votes);
        break;
      case 'players':
        filtered = filtered.sort((a, b) => b.players.current - a.players.current);
        break;
      case 'newest':
        // For this demo, we'll just reverse the order
        filtered = filtered.sort((a, b) => a.id < b.id ? 1 : -1);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    setFilteredServers(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Pagination logic
  const indexOfLastServer = currentPage * serversPerPage;
  const indexOfFirstServer = indexOfLastServer - serversPerPage;
  const currentServers = filteredServers.slice(indexOfFirstServer, indexOfLastServer);
  const totalPages = Math.ceil(filteredServers.length / serversPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <>
      <div className="bg-dark-300 border-b border-border py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-bold text-3xl md:text-4xl mb-4">Browse Rust Servers</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover and vote for the best Rust gaming servers. Use filters to narrow down your search based on your preferences.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <ServerFilters onFilterChange={handleFilterChange} />
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rust-card">
                <div className="aspect-[21/9] bg-secondary animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-secondary rounded animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded animate-pulse"></div>
                  <div className="h-4 bg-secondary rounded w-4/5 animate-pulse"></div>
                  <div className="flex gap-2 mt-2">
                    <div className="h-6 w-16 bg-secondary rounded animate-pulse"></div>
                    <div className="h-6 w-16 bg-secondary rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredServers.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No servers found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters to find more servers</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {indexOfFirstServer + 1}-{Math.min(indexOfLastServer, filteredServers.length)} of {filteredServers.length} servers
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentServers.map(server => (
                    <ServerCard key={server.id} server={server} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        size="icon"
                      >
                        &lt;
                      </Button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          className={currentPage === i + 1 ? "bg-rust-500 hover:bg-rust-600" : ""}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        size="icon"
                      >
                        &gt;
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ServersPage;
