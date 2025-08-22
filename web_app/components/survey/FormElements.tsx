import React from 'react';

export const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-sm font-medium text-slate-300 mb-2">{children}</label>
);

export const FormInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
  />
);

export const FormSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        {...props}
        className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
    />
);

export const FormField = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-4">{children}</div>
);