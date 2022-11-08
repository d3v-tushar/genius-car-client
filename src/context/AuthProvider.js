import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    //Login With Google
    const googleSignIn = () =>{
        return signInWithPopup(auth, googleProvider);
    };

    //Craete New User
    const craeteUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    };

    //Login Existing User
    const login = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    //LogOut
    const logOut = () =>{
        return signOut(auth)
    };

    //Update User Profile
    const updateUserProfile = (name) =>{
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    //Get Logged in User
    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe();
    }, []);

    const authinfo = {user, craeteUser, googleSignIn, updateUserProfile, login, logOut, loading};
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;