import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function BoxBreathing({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="relative bg-slate-900 p-8 rounded-lg text-white text-center">
        <button onClick={onClose} className="absolute top-4 right-4"><X /></button>
        <p className="mb-8 text-lg font-medium">Let's take a moment. Follow the animation.</p>
        <div className="w-40 h-40 border-2 border-blue-400 flex items-center justify-center">
          <motion.div 
            className="w-10 h-10 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
              duration: 8, // 4 seconds in, 4 seconds out
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </div>
        {/* You can add text prompts here that sync with the animation */}
      </div>
    </motion.div>
  );
}