import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { BusinessCard } from './components/BusinessCard';
import { Building } from 'lucide-react';
import type { Business } from './types/business';

function App() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setBusinesses(data || []);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-[#722F37] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-[#E6B8B8] mr-3" />
            <h1 className="text-3xl font-bold">Business Directory</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#722F37]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;