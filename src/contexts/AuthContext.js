import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, googleProvider, facebookProvider } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'));
  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      console.log('onAuthStateChanged, user', user);
      setCurrentUser(user);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
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
