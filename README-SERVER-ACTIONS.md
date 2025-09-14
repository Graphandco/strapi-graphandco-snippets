# 🚀 Migration vers les Server Actions Next.js

## 📋 Vue d'ensemble

Cette application a été refactorisée pour utiliser les **Server Actions** de Next.js 14+ au lieu des Context API et des appels API côté client. Cette approche moderne offre de meilleures performances, sécurité et expérience développeur.

## 🏗️ Architecture

### Avant (Client-side)

```
- lib/auth.js (client API calls)
- lib/snippets.js (client API calls)
- contexts/AuthContext.js (React Context)
- contexts/SnippetsContext.js (React Context)
- JWT stocké dans localStorage
```

### Après (Server Actions)

```
- app/actions/auth.js (Server Actions)
- app/actions/snippets.js (Server Actions)
- JWT stocké dans cookies httpOnly sécurisés
- SSR natif avec React Server Components
```

## 🔐 Authentification

### Server Actions disponibles

-  `loginAction(prevState, formData)` - Connexion utilisateur
-  `registerAction(prevState, formData)` - Inscription utilisateur
-  `logoutAction()` - Déconnexion utilisateur
-  `getCurrentUser()` - Récupérer l'utilisateur actuel
-  `getAuthToken()` - Récupérer le token JWT

### Sécurité améliorée

-  ✅ JWT stocké dans cookies `httpOnly` sécurisés
-  ✅ Protection CSRF native
-  ✅ Pas d'exposition des tokens côté client
-  ✅ Validation automatique des tokens

### Utilisation

```jsx
// Composant Server
import { getCurrentUser } from '@/app/actions/auth';

export default async function MyPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Veuillez vous connecter</div>;
  }

  return <div>Bonjour {user.username}</div>;
}

// Composant Client avec formulaire
'use client';
import { useFormState } from 'react-dom';
import { loginAction } from '@/app/actions/auth';

export default function LoginForm() {
  const [state, formAction] = useFormState(loginAction, { success: false });

  return (
    <form action={formAction}>
      <input name="identifier" type="text" required />
      <input name="password" type="password" required />
      <button type="submit">Se connecter</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
```

## 📝 Snippets CRUD

### Server Actions disponibles

-  `getSnippetsAction()` - Récupérer tous les snippets
-  `getSnippetAction(id)` - Récupérer un snippet par ID
-  `createSnippetAction(prevState, formData)` - Créer un snippet
-  `updateSnippetAction(id, prevState, formData)` - Mettre à jour un snippet
-  `deleteSnippetAction(id)` - Supprimer un snippet

### Fonctionnalités

-  ✅ Authentification automatique via cookies
-  ✅ Revalidation automatique du cache
-  ✅ Redirection automatique si non authentifié
-  ✅ Gestion d'erreurs intégrée

### Utilisation

```jsx
// Page Server Component
import { getSnippetsAction } from '@/app/actions/snippets';

export default async function SnippetsPage() {
  const result = await getSnippetsAction();

  if (!result.success) {
    return <div>Erreur: {result.error}</div>;
  }

  return (
    <div>
      {result.data.map(snippet => (
        <div key={snippet.id}>{snippet.attributes.title}</div>
      ))}
    </div>
  );
}

// Formulaire Client
'use client';
import { useFormState } from 'react-dom';
import { createSnippetAction } from '@/app/actions/snippets';

export default function SnippetForm() {
  const [state, formAction] = useFormState(createSnippetAction, {});

  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="code" />
      <select name="language">
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <textarea name="description" />
      <button type="submit">Créer</button>
      {state.error && <p>{state.error}</p>}
    </form>
  );
}
```

## 🎨 Composants

### Structure des composants

```
components/
├── auth/
│   ├── LoginForm.jsx (useFormState)
│   ├── RegisterForm.jsx (useFormState)
│   ├── LogoutButton.jsx (Server Action)
│   ├── AuthModal.jsx (Client wrapper)
│   └── UserProfile.jsx (Server props)
└── snippets/
    ├── SnippetsList.jsx (Server Component)
    ├── SnippetCard.jsx (Client interactions)
    └── SnippetForm.jsx (useFormState)
```

### Composants Server vs Client

-  **Server Components** : Récupération de données, rendu initial
-  **Client Components** : Interactions utilisateur, état local

## 📊 Schéma Strapi mis à jour

```json
{
   "attributes": {
      "title": { "type": "string", "required": true },
      "code": { "type": "text" },
      "language": { "type": "string" },
      "description": { "type": "text" }
   }
}
```

## 🚀 Avantages de cette approche

### Performance

-  ✅ Server-Side Rendering natif
-  ✅ Moins de JavaScript côté client
-  ✅ Meilleur SEO
-  ✅ Temps de chargement initial plus rapide

### Sécurité

-  ✅ Cookies httpOnly sécurisés
-  ✅ Pas d'exposition des credentials côté client
-  ✅ Protection CSRF automatique
-  ✅ Validation côté serveur

### Développement

-  ✅ Code plus simple et lisible
-  ✅ Moins de boilerplate
-  ✅ Gestion d'état native avec `revalidatePath()`
-  ✅ Progressive enhancement

### Maintenance

-  ✅ Moins de code à maintenir
-  ✅ Architecture plus cohérente
-  ✅ Meilleure séparation des responsabilités

## 🔄 Migration des composants existants

1. **Remplacer** les hooks `useContext` par des props serveur
2. **Convertir** les appels API en Server Actions
3. **Utiliser** `useFormState` pour les formulaires
4. **Simplifier** la gestion d'état avec `revalidatePath()`

## 📝 Prochaines étapes

-  [ ] Ajouter la pagination pour les snippets
-  [ ] Implémenter la recherche et le filtrage
-  [ ] Ajouter la coloration syntaxique
-  [ ] Créer un système de tags/catégories
-  [ ] Ajouter l'export/import de snippets

## 🧪 Tests

Pour tester l'application :

1. **Démarrer Strapi** : `cd backend && npm run develop`
2. **Démarrer Next.js** : `cd frontend && npm run dev`
3. **Créer un compte** via le formulaire d'inscription
4. **Créer des snippets** via le formulaire
5. **Tester** les fonctionnalités CRUD

## 📚 Ressources

-  [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
-  [React useFormState](https://react.dev/reference/react-dom/hooks/useFormState)
-  [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)

Cette architecture moderne offre une base solide, performante et sécurisée pour votre application de gestion de snippets ! 🎉
