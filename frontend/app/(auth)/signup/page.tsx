"use client";

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ email, password });
  };

  return (
    <div>
      <h1>Sign Up for Risk Mirror</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}