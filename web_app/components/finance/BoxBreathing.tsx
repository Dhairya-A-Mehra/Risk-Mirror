import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function BoxBreathing({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900/80 via-teal-800/70 to-cyan-900/80">
      <div className="bg-gray-800/90 backdrop-blur-lg border border-blue-400/30 rounded-2xl shadow-2xl p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-white bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Box Breathing</h2>
        <p className="mb-6 text-gray-300">Follow the animation to calm your mind.</p>
        <div className="w-32 h-32 border-4 border-blue-400 rounded-lg animate-breathing mb-6" />
        <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded font-bold" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}