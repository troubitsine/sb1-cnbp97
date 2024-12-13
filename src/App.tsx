import React from 'react';
import DonationChat from './components/DonationChat';

export default function App() {
  return (
    <div className="h-screen flex">
      <div className="relative hidden md:block flex-1">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80"
          alt="Food bank volunteers sorting donations"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Help fill families' tables for the holidays</h1>
            <p className="text-xl opacity-90">Donate to the Ottawa Food Bank Today</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 w-full md:w-[30%] min-w-[400px]">
        <DonationChat />
      </div>
    </div>
  );
}