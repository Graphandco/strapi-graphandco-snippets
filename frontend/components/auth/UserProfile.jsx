'use client';

import { useAuth } from '../../contexts/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.username || user.email}
        </span>
      </div>
      
      <button
        onClick={logout}
        className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50"
      >
        Déconnexion
      </button>
    </div>
  );
}
