'use client';

import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Bienvenue, {user?.username || user?.email} !
          </h2>
          
          <div className="text-white/80 space-y-2">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Nom d'utilisateur:</strong> {user?.username}</p>
            <p><strong>ID:</strong> {user?.id}</p>
            <p><strong>Confirmé:</strong> {user?.confirmed ? 'Oui' : 'Non'}</p>
            <p><strong>Bloqué:</strong> {user?.blocked ? 'Oui' : 'Non'}</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
