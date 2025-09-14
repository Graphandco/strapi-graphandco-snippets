# 📊 Structure des données Strapi

## 🔍 Format des données

Votre API Strapi retourne les données dans un format direct, sans la structure `attributes` habituelle de Strapi v4.

### ✅ Structure actuelle (utilisée)

```json
{
   "id": 1,
   "title": "Mon snippet JavaScript",
   "code": "console.log('Hello World');",
   "language": "javascript",
   "description": "Un simple Hello World",
   "createdAt": "2024-01-15T10:30:00.000Z",
   "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### ❌ Structure Strapi v4 classique (non utilisée)

```json
{
   "id": 1,
   "attributes": {
      "title": "Mon snippet JavaScript",
      "code": "console.log('Hello World');",
      "language": "javascript",
      "description": "Un simple Hello World",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
   }
}
```

## 🎯 Utilisation dans les composants

### SnippetCard.jsx

```jsx
export default function SnippetCard({ snippet }) {
   return (
      <div>
         <h3>{snippet.title}</h3> {/* ✅ Direct */}
         <p>
            Créé le {new Date(snippet.createdAt).toLocaleDateString("fr-FR")}
         </p>
         {/* ❌ Pas snippet.attributes.title */}
      </div>
   );
}
```

### SnippetForm.jsx

```jsx
// Les données envoyées à Strapi
const snippetData = {
   title: formData.get("title"),
   code: formData.get("code"),
   language: formData.get("language"),
   description: formData.get("description"),
};
```

## 🔧 Configuration possible

Cette structure directe peut être due à :

1. **Transformation côté serveur** : Middleware Strapi qui transforme la réponse
2. **Configuration API** : Paramètres dans les controllers/services
3. **Version Strapi** : Configuration spécifique ou version personnalisée
4. **Serializer custom** : Transformation des données de sortie

## 📋 Schéma Strapi correspondant

```json
{
   "kind": "collectionType",
   "collectionName": "snippets",
   "info": {
      "singularName": "snippet",
      "pluralName": "snippets",
      "displayName": "snippets"
   },
   "options": {
      "draftAndPublish": true
   },
   "attributes": {
      "title": {
         "type": "string",
         "required": true
      },
      "code": {
         "type": "text"
      },
      "language": {
         "type": "string"
      },
      "description": {
         "type": "text"
      }
   }
}
```

## ✅ Avantages de cette structure

-  **🚀 Plus simple** : Accès direct aux propriétés
-  **📦 Moins verbeux** : Pas de `.attributes` partout
-  **🔄 Plus lisible** : Code plus propre
-  **⚡ Performance** : Moins de nesting

## 🎉 Résultat

Tous les composants utilisent maintenant la structure directe :

-  ✅ `snippet.title` au lieu de `snippet.attributes.title`
-  ✅ `snippet.createdAt` au lieu de `snippet.attributes.createdAt`
-  ✅ `snippet.code`, `snippet.language`, `snippet.description`

Cette approche est parfaitement valide et plus simple à utiliser ! 🚀
