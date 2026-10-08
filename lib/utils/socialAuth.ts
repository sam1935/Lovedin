// Social OAuth handler utilities for Google, Facebook, and Apple

export const handleGoogleLogin = async () => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiBase}/api/auth/google`);
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      // Handle error (show message)
      throw new Error("Google auth URL not received");
    }
  } catch (err) {
    // Handle error (show message)
    throw err;
  }
};

export const handleFacebookLogin = async () => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiBase}/api/auth/facebook`);
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      // Handle error (show message)
      throw new Error("Facebook auth URL not received");
    }
  } catch (err) {
    // Handle error (show message)
    throw err;
  }
};

export const handleAppleLogin = async () => {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiBase}/api/auth/apple`);
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      // Handle error (show message)
      throw new Error("Apple auth URL not received");
    }
  } catch (err) {
    // Handle error (show message)
    throw err;
  }
};
