// web_app/components/simulation/SandboxTeaser.tsx

import React from 'react';
import { Beaker } from 'lucide-react';

const SandboxTeaser = () => {
  return (
    <div className="text-center p-8 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl">
      <div className="flex justify-center items-center mb-4">
        <Beaker className="w-6 h-6 mr-3 text-purple-400" />
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-sky-400">
          Live Sandbox Integration
        </h2>
      </div>
      <p className="text-slate-400 max-w-3xl mx-auto mb-4">
        Ready to build your own scenarios? Soon, you'll be able to connect live Finnhub and Groq API keys to run custom, real-time simulations and test your own unique risk strategies.
      </p>
      <div className="inline-block bg-purple-500/10 text-purple-300 text-sm font-bold px-4 py-1 rounded-full">
        Coming Soon
      </div>
    </div>
  );
};

export default SandboxTeaser;