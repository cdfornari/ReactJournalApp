import { getAuth, onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    //Route,
    Redirect
} from "react-router-dom";
import { login } from '../actions/auth';
import { startLoadingNotes } from '../actions/notes';
import { JournalScreen } from '../components/journal/JournalScreen';
import { LoadingScreen } from '../components/LoadingScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {

            if (user?.uid){
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))
            }else{
                setIsLoggedIn(false)
            }

            setChecking(false)
            
        })

    }, [dispatch])


    if(checking){
        return(
            <LoadingScreen />
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={ JournalScreen }
                    />

                    {/* {
                        isLoggedIn
                        ?
                            <Route
                                exact
                                path="/"
                                component={JournalScreen}
                            />
                        :
                            <Route
                                path="/auth"
                                component={AuthRouter}
                            />
                    } */}
 
                    <Redirect to={isLoggedIn?'/':'/auth/login'} />
                </Switch>
            </div>
        </Router>
    )
}
