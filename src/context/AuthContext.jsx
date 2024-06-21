import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut, onAuthStateChanged, updateCurrentUser } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext()
export function AuthContextProvider({children}) {
    const [user, setuser] = useState({}) 

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setuser(currentUser)
      })
    
      return () => {
        unsubscribe()
      }
    }, [])
    

    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, "users", email), {
          favShows:[]
        })
    }

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    return <AuthContext.Provider value={{user, signUp, logIn, logOut}}>
        {children}
        </AuthContext.Provider>
}

export function UserAuth() {
    return useContext(AuthContext)
}