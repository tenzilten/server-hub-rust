
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark-400 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/rust-logo.png" alt="RustList Logo" className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-rust-500">RustList</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The best platform to find and promote your Rust game servers.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/servers" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Browse Servers
                </Link>
              </li>
              <li>
                <Link to="/add-server" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Add Your Server
                </Link>
              </li>
              <li>
                <Link to="/top-servers" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Top Voted
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-rust-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RustList. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
