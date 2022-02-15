import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import Swal from 'sweetalert2'
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { notesLogoutCleaning } from "./notes";
import { finishLoading, startLoading } from "./ui";



export const startLogin = (email,password)=>{
    return (dispatch) => {
        
        dispatch(startLoading())

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                Swal.fire('Error',e.message, 'error')
            })
            .finally(()=>{
                dispatch(finishLoading())
            })
    }
}

export const startRegister = (email,password,name) =>{
    return (dispatch) =>{

        dispatch(startLoading())

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email,password)
            .then(async({user}) =>{
                await updateProfile(auth.currentUser,{displayName: name})

                dispatch(login(user.uid, user.displayName))
            })
            .catch(e =>{
                Swal.fire('Error',e.message, 'error')
            })
            .finally(()=>{
                dispatch(finishLoading())
            })
    }
}

export const startGoogleLogin = ()=>{
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
});

export const startLogout = () => {
    return async(dispatch) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        dispatch(notesLogoutCleaning())
    }
}

export const logout = () => ({
    type: types.logout,
});