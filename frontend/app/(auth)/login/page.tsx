"use client";

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState(''); // FastAPI OAuth2 expects 'username'
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
    login(formData);
  };

  return (
    <div>
      <h1>Login to Risk Mirror</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}