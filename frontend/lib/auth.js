'use server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

// Fonction utilitaire pour les appels API
async function strapiRequest(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    console.error('Erreur API Strapi:', error);
    throw error;
  }
}

// Inscription
export async function register(userData) {
  try {
    const data = await strapiRequest('/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password,
      }),
    });

    return {
      success: true,
      user: data.user,
      jwt: data.jwt,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Connexion
export async function login(identifier, password) {
  try {
    const data = await strapiRequest('/auth/local', {
      method: 'POST',
      body: JSON.stringify({
        identifier, // email ou username
        password,
      }),
    });

    return {
      success: true,
      user: data.user,
      jwt: data.jwt,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Récupérer l'utilisateur actuel
export async function getMe(jwt) {
  try {
    const data = await strapiRequest('/users/me', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return {
      success: true,
      user: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Déconnexion (côté client uniquement)
export async function logout() {
  return {
    success: true,
    message: 'Déconnexion réussie',
  };
}

// Mot de passe oublié
export async function forgotPassword(email) {
  try {
    await strapiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    });

    return {
      success: true,
      message: 'Email de réinitialisation envoyé',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// Réinitialiser le mot de passe
export async function resetPassword(code, password, passwordConfirmation) {
  try {
    const data = await strapiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });

    return {
      success: true,
      user: data.user,
      jwt: data.jwt,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
