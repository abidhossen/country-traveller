import './login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();


    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }

                setLoggedInUser(signedInUser);
            })
            .catch(err => {
                // console.log(err.message);
            })
    }
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then(res => {
                var credential = res.credential;
                var accessToken = credential.accessToken;
                const user = res.user;
                setUser(user);
                setLoggedInUser(user);
            })
            .catch((error) => {
                
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;

                console.log(error)
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false,
                }
                setUser(signedOutUser);
            })
            .catch(err => {

                // console.log(err);
                // console.log(err.message);
            })
    }
    const handleBlurField = (e) => {
        let isFieldValid = true;
        console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    console.log('sign in info', loggedInUser.displayName);

                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    console.log(error);
                });

        }
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name
        }).then(() => {
            console.log('user name updated successfully')
        }).catch(error => {
            console.log(error);
        });
    }
    return (
        <div className="form-container">
            <div className="account-area">
                {newUser ? <h2>Create an account</h2> : <h1>Log In</h1>}


                <form onSubmit={handleSubmit}>
                    <div className="account-input-field">
                        {newUser && <label htmlFor="name">Name:</label>}
                        {newUser && <input type="text" name="name" placeholder="Your Name" onBlur={handleBlurField} />}
                        <br />
                        <label htmlFor="name">Email:</label>
                        <input type="text" name="email" placeholder="Your Email Address" onBlur={handleBlurField} required />
                        <br />
                        <label htmlFor="name">Password:</label>
                        <input type="password" onBlur={handleBlurField} name="password" id="" placeholder="Password" required />
                    </div>
                    <br />
                    <input className="submit-button" type="submit" value={newUser ? "Create an account" : 'Log In'} />
                    <br />
                    {newUser ? "Already have an account?" : "Don't have an account?"}<a onClick={() => setNewUser(!newUser)} href="#">{newUser ? 'Log in' : 'Create an account'}</a>
                </form>
            </div>
            <div className="google-fb-signin">
                <p>Or</p>
                {
                    user.isSignedIn ? <button className="submit-button-google" onClick={handleSignOut}>Sign Out</button> : <button className="submit-button-google" onClick={handleGoogleSignIn}>Sign In Using Google</button>
                }
                <br />

                <button className="submit-button-fb" onClick={handleFbSignIn}>Sign In Using Facebook</button>
            </div>
            {
                user.isSignedIn &&
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <p style={{ color: 'red' }}> {user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>
            }
        </div>
    );
}

export default Login;
