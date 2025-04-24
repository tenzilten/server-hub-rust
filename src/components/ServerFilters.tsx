
import { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';

type FilterProps = {
  onFilterChange: (filters: any) => void;
};

const ServerFilters = ({ onFilterChange }: FilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    sort: 'votes',
    tags: [] as string[],
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Debounce could be added here
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    
    handleFilterChange('tags', newTags);
  };

  return (
    <div className="bg-card border-border border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or IP..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-9 bg-background"
          />
        </div>
        <div className="flex gap-2 flex-wrap md:flex-nowrap">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange('status', value)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
          
          <Select
            value={filters.sort}
            onValueChange={(value) => handleFilterChange('sort', value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="votes">Most Voted</SelectItem>
              <SelectItem value="players">Most Players</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          
          <Collapsible
            open={open}
            onOpenChange={setOpen}
            className="md:ml-2"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto flex items-center gap-1">
                <Filter className="h-4 w-4 mr-1" />
                Advanced Filters
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${open ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-background rounded-lg border border-border">
                <div>
                  <h3 className="text-sm font-medium mb-2">Game Type</h3>
                  <div className="space-y-2">
                    {['Vanilla', 'Modded', 'PvP', 'PvE'].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`tag-${tag}`}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, Boolean(checked))}
                        />
                        <label 
                          htmlFor={`tag-${tag}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Server Size</h3>
                  <div className="space-y-2">
                    {['Small', 'Medium', 'Large', 'Mega'].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`size-${tag}`}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, Boolean(checked))}
                        />
                        <label 
                          htmlFor={`size-${tag}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Features</h3>
                  <div className="space-y-2">
                    {['Clans', 'Economy', 'TP', 'Zombies', 'Kits'].map((tag) => (
                      <div key={tag} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`feature-${tag}`}
                          checked={filters.tags.includes(tag)}
                          onCheckedChange={(checked) => handleTagChange(tag, Boolean(checked))}
                        />
                        <label 
                          htmlFor={`feature-${tag}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tag}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default ServerFilters;
