import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { auth } from "auth/FirebaseAuth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentuser(user);
      setLoading(false);
    });
    const combinedData = {
      unsubscribe,
    };
    return () => [{ combinedData }];
  }, []);

  const value = {
    currentUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
