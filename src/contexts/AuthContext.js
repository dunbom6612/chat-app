import React, { useContext, useEffect, useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubcribe;
  }, []);

  const loginWithGoogle = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const loginWithFacebook = () => {
    return auth.signInWithPopup(facebookProvider);
  };

  const value = {
    currentUser,
    loginWithGoogle,
    loginWithFacebook
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
