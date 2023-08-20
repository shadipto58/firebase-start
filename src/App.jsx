/* eslint-disable no-unused-vars */

import './App.css'

import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [userLog, setUserLog] = useState({})

  const handellogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUserLog(user)
        console.log(user);
      })
      .catch(error => {
        console.log('eroor', error);
      })
  }
  const handelGitlogin = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUserLog(user)
        console.log(user);
      })
      .catch(error => {
        console.log('Github eroor', error);
      })
  }
  const handelSignout = () => {
    signOut(auth).then(() => {
      setUserLog({})
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <div className='mt-[300px] text-center'>
      <h2 className='text-center pb-5'>Ready to launch</h2>
      <h3>{userLog?.displayName}</h3>
      <img className='m-auto mb-8' src={userLog?.photoURL
      } alt="" />
      {
        userLog?.uid ? <button onClick={handelSignout}>Sign Out</button> : <>
          <button className="btn btn-outline" onClick={handellogin}>Login with google</button>
          <button className="btn btn-outline" onClick={handelGitlogin}>Login with Github</button>
        </>
      }
    </div>
  )
}

export default App
