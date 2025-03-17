/*
  # Business Directory Schema

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `phone` (text, required)
      - `bio` (text, required)
      - `location` (text, required)
      - `image_url` (text, required)
      - `created_at` (timestamp)
      - `owner_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `businesses` table
    - Add policies for:
      - Anyone can read businesses
      - Authenticated users can create their own businesses
      - Users can only update/delete their own businesses
*/

CREATE TABLE IF NOT EXISTS businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  bio text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read businesses
CREATE POLICY "Anyone can view businesses"
  ON businesses
  FOR SELECT
  USING (true);

-- Allow authenticated users to insert their own businesses
CREATE POLICY "Users can create their own businesses"
  ON businesses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Allow users to update their own businesses
CREATE POLICY "Users can update their own businesses"
  ON businesses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Allow users to delete their own businesses
CREATE POLICY "Users can delete their own businesses"
  ON businesses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);