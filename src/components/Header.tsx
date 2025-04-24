
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dark-400 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/rust-logo.png" alt="RustList Logo" className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-rust-500">RustList</span>
          </Link>

          <nav className="hidden md:flex ml-10 space-x-6">
            <Link to="/servers" className="text-foreground/80 hover:text-rust-500 transition-colors">
              Servers
            </Link>
            <Link to="/add-server" className="text-foreground/80 hover:text-rust-500 transition-colors">
              Add Server
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-rust-500 transition-colors">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <form className="hidden md:flex relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search servers..."
              className="pl-8 h-9 py-2 text-sm bg-secondary border-0 rounded-md focus:ring-1 focus:ring-rust-500 focus-visible:ring-1 focus-visible:ring-rust-500 focus-visible:outline-none"
            />
          </form>

          <div className="hidden md:flex space-x-2">
            <Button variant="outline" className="border-border hover:text-rust-500 hover:border-rust-500" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-rust-500 hover:bg-rust-600 text-white" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-400 border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form className="relative mb-4">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search servers..."
                className="w-full pl-8 h-9 py-2 text-sm bg-secondary border-0 rounded-md focus:ring-1 focus:ring-rust-500"
              />
            </form>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/servers" 
                className="text-foreground/80 hover:text-rust-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Servers
              </Link>
              <Link 
                to="/add-server" 
                className="text-foreground/80 hover:text-rust-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Add Server
              </Link>
              <Link 
                to="/about" 
                className="text-foreground/80 hover:text-rust-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            <div className="flex space-x-2 pt-2 border-t border-border">
              <Button variant="outline" className="flex-1 border-border hover:text-rust-500 hover:border-rust-500" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="flex-1 bg-rust-500 hover:bg-rust-600 text-white" asChild>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
