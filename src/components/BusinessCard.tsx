import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import type { Business } from '../types/business';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  if (!business) return null; // Prevents errors if business is undefined

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl border border-[#E6B8B8]/20">
      {/* Image Section */}
      <div className="h-48 overflow-hidden">
        <img
          src={business.image_url || "/placeholder.jpg"} // Use a default image if none is provided
          alt={business.name || "Business image"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#722F37] mb-2">
          {business.name || "Unnamed Business"}
        </h3>

        {/* Phone Number */}
        {business.phone ? (
          <div className="flex items-center text-gray-700 mb-2">
            <Phone className="w-4 h-4 mr-2 text-[#722F37]" />
            <a href={`tel:${business.phone}`} className="hover:text-[#722F37] transition-colors">
              {business.phone}
            </a>
          </div>
        ) : (
          <p className="text-gray-500 mb-2">No phone available</p>
        )}

        {/* Location */}
        <div className="flex items-center text-gray-700 mb-4">
          <MapPin className="w-4 h-4 mr-2 text-[#722F37]" />
          <span>{business.location || "Location not provided"}</span>
        </div>

        {/* Bio / Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {business.bio || "No description available."}
        </p>

        {/* Contact Button */}
        <button className="w-full bg-[#722F37] text-white py-2 px-4 rounded-md hover:bg-[#8B3D47] transition-colors">
          Contact Business
        </button>
      </div>
    </div>
  );
}
