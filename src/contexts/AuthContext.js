import firebase from 'firebase/app';
import React, { useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const loginWithGoogle = () => {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const loginWithFacebook = () => {
    return auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  };

  const logout = async () => {
    await auth.signOut();
    localStorage.removeItem('currentUser');
  };

  const value = {
    loginWithGoogle,
    loginWithFacebook,
    logout
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
