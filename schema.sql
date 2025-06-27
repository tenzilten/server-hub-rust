-- SQL schema for storing Rust server information
-- Import this file in cPanel's phpMyAdmin to set up the database

CREATE TABLE IF NOT EXISTS servers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  ip VARCHAR(45) NOT NULL,
  port INT UNSIGNED NOT NULL,
  website VARCHAR(255),
  description TEXT NOT NULL,
  country VARCHAR(50) NOT NULL,
  banner VARCHAR(255),
  logo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_servers_ip_port ON servers(ip, port);
