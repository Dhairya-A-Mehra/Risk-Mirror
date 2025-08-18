"use client";

import { useAuth } from '../../../context/AuthContext';

export default function DashboardPage() {
  const { token, logout } = useAuth();

  if (!token) {
    // This is a simple protection, a real app would use a middleware or HOC
    return <div>Loading or not authenticated...</div>;
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <p>You are successfully logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}