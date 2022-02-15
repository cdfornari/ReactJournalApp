import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import validator from 'validator';
import { startRegister } from '../../actions/auth';
import { RemoveError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const dispatch = useDispatch()

    const {loading} = useSelector(state => state.ui)

    const { msgError } = useSelector(state => state.ui)

    const [formValues,handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    const {name, email, password, confirm} = formValues;

    const handleRegister = e =>{
        e.preventDefault();
        
        if ( isFormValid() ){

            dispatch(startRegister(email,password,name))

        }
    }

    const isFormValid = () =>{

        if (name.trim().length === 0){

            dispatch(setError('Name is required'))
            return false;
        
        }else if (!validator.isEmail(email)){

            dispatch(setError('Email is not valid'))
            return false;

        }else if (password !== confirm || password.length < 6){

            dispatch(setError('Password should be at least 6 characters and match with the confirmation'))
            return false
            
        }

        dispatch(RemoveError())
        return true

    }

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>

            <form 
                onSubmit= { handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    value={email}
                    onChange={handleInputChange}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm"
                    className="auth__input"
                    value={confirm}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    disabled={loading}
                >
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already registered?
                </Link>

            </form>
        </>
    )
}
