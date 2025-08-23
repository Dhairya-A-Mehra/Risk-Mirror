// web_app/app/(main)/chatbot/page.tsx

import React from 'react';
import { ChatClient } from '@/components/chatbot/ChatClient';
import { Navbar } from '@/components/layout/Navbar';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-blue-900 via-blue-800 via-teal-700 via-teal-800 to-cyan-900 text-white flex flex-col">
      <Navbar user={null} />
      <main className="p-4 sm:p-6 lg:p-8 flex-1 flex flex-col items-center justify-start h-full">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">Risk Mirror Chatbot</h1>
          <div className="w-full h-[calc(70vh)]">
            <ChatClient />
          </div>
        </div>
      </main>
    </div>
  );
}