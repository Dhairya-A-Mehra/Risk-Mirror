// frontend/components/DetailView.tsx
"use client";

import { motion } from "framer-motion";
// Import the type SectionData if it exists, otherwise define it here
// Define SectionData type locally if not exported from "@/app/page"
type SectionData = {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  theme: {
    bg: string;
    text: string;
    accent: string;
  };
  details: {
    panelOneTitle: string;
    panelOneContent: string;
    panelTwoTitle: string;
    panelTwoContent: string;
  };
};
import { XMarkIcon } from '@heroicons/react/24/solid';


interface DetailViewProps {
  section: SectionData;
  setSelectedId: (id: string | null) => void;
}

export function DetailView({ section, setSelectedId }: DetailViewProps) {
  return (
    // Backdrop
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center"
      onClick={() => setSelectedId(null)}
    >
      {/* Main card container to keep layout context */}
      <motion.div
        layoutId={section.id}
        className={`${section.theme.bg} ${section.theme.text} w-11/12 md:w-2/3 lg:w-1/2 h-auto md:h-2/3 max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col p-8 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
      >
        <div className="flex justify-between items-start">
            <div>
              <section.icon className="h-10 w-10 mb-4" />
              <h2 className="text-4xl font-bold">{section.title}</h2>
            </div>
            <motion.button
                onClick={() => setSelectedId(null)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <XMarkIcon className="h-8 w-8" />
            </motion.button>
        </div>
        
        <div className={`w-16 h-1.5 ${section.theme.accent} rounded-full my-6`}></div>

        {/* Diagonal Info Panels Container */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Panel 1 (Top-Left) */}
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, x: -50, y: -50 }}
              animate={{ opacity: 1, x: 0, y: 0, transition: { delay: 0.2, duration: 0.5 } }}
            >
              <h3 className="text-xl font-bold mb-2">{section.details.panelOneTitle}</h3>
              <p className="opacity-90 leading-relaxed">{section.details.panelOneContent}</p>
            </motion.div>

            {/* Panel 2 (Bottom-Right) */}
            <motion.div 
              className="bg-white/10 p-6 rounded-lg"
              initial={{ opacity: 0, x: 50, y: 50 }}
              animate={{ opacity: 1, x: 0, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
            >
              <h3 className="text-xl font-bold mb-2">{section.details.panelTwoTitle}</h3>
              <p className="opacity-90 leading-relaxed">{section.details.panelTwoContent}</p>
            </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}