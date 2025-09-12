# Système d'authentification Next.js + Strapi

## Configuration

1. **Variables d'environnement** : Assurez-vous d'avoir `NEXT_PUBLIC_STRAPI_URL` dans votre `.env.local`

2. **Strapi Backend** : Vérifiez que votre backend Strapi est configuré avec le plugin `users-permissions`

## Utilisation

### 1. Contexte d'authentification

```jsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  
  if (isLoading) return <div>Chargement...</div>;
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Bonjour {user.username} !</p>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </div>
  );
}
```

### 2. Protection de routes

```jsx
import ProtectedRoute from '@/components/auth/ProtectedRoute';

function ProtectedPage() {
  return (
    <ProtectedRoute>
      <h1>Contenu protégé</h1>
    </ProtectedRoute>
  );
}
```

### 3. Server Actions

```jsx
import { login, register, getMe } from '@/lib/auth';

// Dans un composant
const handleLogin = async (email, password) => {
  const result = await login(email, password);
  if (result.success) {
    // Utilisateur connecté
  }
};
```

## Fonctionnalités

- ✅ Inscription/Connexion
- ✅ Gestion des sessions (localStorage)
- ✅ Protection de routes
- ✅ Contexte React global
- ✅ Server Actions (pas d'API routes)
- ✅ Interface utilisateur complète
- ✅ Gestion des erreurs
- ✅ Validation côté client

## Composants disponibles

- `LoginForm` : Formulaire de connexion
- `RegisterForm` : Formulaire d'inscription
- `AuthModal` : Modal d'authentification
- `UserProfile` : Profil utilisateur
- `ProtectedRoute` : Protection de route

## Configuration Strapi

Assurez-vous que dans votre backend Strapi :

1. Le plugin `users-permissions` est activé
2. Les permissions sont configurées
3. L'URL est accessible depuis le frontend
