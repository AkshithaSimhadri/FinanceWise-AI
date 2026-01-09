"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useUser as useFirebaseUser } from '@/firebase';

type User = {
  name: string;
  email: string;
};

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user: firebaseUser } = useFirebaseUser();
  const [user, setUser] = useState<User>({
    name: 'Alex Doe', // Default value
    email: 'alex@example.com', // Default value
  });

  useEffect(() => {
    if (firebaseUser) {
      setUser({
        name: firebaseUser.displayName || firebaseUser.email || 'User',
        email: firebaseUser.email || 'No email provided'
      });
    }
  }, [firebaseUser]);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

    