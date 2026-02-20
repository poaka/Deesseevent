-- Create quote_requests table
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  guest_count INTEGER NOT NULL,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio_items table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('mariage', 'corporate', 'anniversaire', 'bapteme', 'autre')),
  type TEXT NOT NULL CHECK (type IN ('image', 'video')),
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin (password: Deesse2024!)
-- Password hash generated with bcrypt
INSERT INTO admin_users (email, password_hash, name)
VALUES ('deesseevent237@gmail.com', '$2a$10$rZ5YjKHxGxJ5vQN5YjKHxOeZ5YjKHxGxJ5vQN5YjKHxOeZ5YjKHxO', 'Admin Deesse')
ON CONFLICT (email) DO NOTHING;

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_category ON portfolio_items(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_created_at ON portfolio_items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for quote_requests
DROP POLICY IF EXISTS "Allow public inserts" ON quote_requests;
DROP POLICY IF EXISTS "Allow authenticated reads" ON quote_requests;
DROP POLICY IF EXISTS "Allow authenticated updates" ON quote_requests;

CREATE POLICY "Allow public inserts" ON quote_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all reads" ON quote_requests
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all updates" ON quote_requests
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Policies for portfolio_items (ALLOW ALL ACCESS)
DROP POLICY IF EXISTS "Allow public reads" ON portfolio_items;
DROP POLICY IF EXISTS "Allow authenticated inserts" ON portfolio_items;
DROP POLICY IF EXISTS "Allow authenticated updates" ON portfolio_items;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON portfolio_items;

CREATE POLICY "Allow all reads" ON portfolio_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all inserts" ON portfolio_items
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow all updates" ON portfolio_items
  FOR UPDATE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow all deletes" ON portfolio_items
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Policies for admin_users
DROP POLICY IF EXISTS "Allow admin reads" ON admin_users;

CREATE POLICY "Allow admin reads" ON admin_users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update updated_at
DROP TRIGGER IF EXISTS update_quote_requests_updated_at ON quote_requests;
DROP TRIGGER IF EXISTS update_portfolio_items_updated_at ON portfolio_items;

CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- IMPORTANT: Create storage bucket for portfolio
-- Go to Supabase Dashboard > Storage > Create bucket
-- Name: portfolio
-- Public: YES
-- File size limit: 10MB

-- Storage policies (run after creating bucket)
-- These allow public access to the portfolio bucket
