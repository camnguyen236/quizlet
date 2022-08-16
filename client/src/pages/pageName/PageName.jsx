import React, { useState } from 'react';
import axios from 'axios';

function PageName(props) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');
   const [errorUsername, setErrorUsername] = useState(false);
   const [errorEmail, setErrorEmail] = useState(false);
   const [error, setError] = useState(false);

   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios
         .post('http://localhost:5000/auth/register', {
            username,
            password,
            email,
            birthday
         })
         .then(() => {
            window.location.replace('/latest');
         })
         .catch((error) => {
            console.log(error);
            setError(true);
         });
   };

   const handleChangeUsername = async (event) => {
      setErrorUsername(false);
      setUsername(event.target.value);
      const url =
         'http://localhost:5000/auth/user/username/?username=' +
         event.target.value;
      await axios
         .get(url)
         .then((res) => {
            if (res.data) setErrorUsername(true);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleChangeEmail = async (event) => {
      setErrorEmail(false);
      setEmail(event.target.value);
      const url =
         'http://localhost:5000/auth/user/email/?email=' + event.target.value;
      await axios
         .get(url)
         .then((res) => {
            if (res.data) setErrorEmail(true);
         })
         .catch((err) => {
            console.log(err);
         });
   };

   const handleGoogleRegister = () => {
      const url = 'http://localhost:5000/auth/google/';
      window.open(url);
   };

   const handleFacebookRegister = () => {
      const url = 'http://localhost:5000/auth/facebook/';
      window.open(url);
   };

   return (
      <div>
         <form>
            {errorUsername && <span>Username already exists</span>}
            <input
               placeholder="username"
               type="text"
               name="username"
               onChange={handleChangeUsername}
            />
            {errorEmail && <span>Email already exists</span>}
            <input
               placeholder="email"
               type="text"
               name="email"
               onChange={handleChangeEmail}
            />
            <input
               placeholder="pass"
               type="password"
               name="password"
               onChange={(event) => {
                  setPassword(event.target.value);
               }}
            />
            <input
               placeholder="birthday"
               type="text"
               name="birthday"
               onChange={(event) => {
                  setBirthday(event.target.value);
               }}
            />
            {error && <span>There's something wrong</span>}
            <button type="submit" onClick={handleSubmit}>
               Register
            </button>
            <button onClick={handleGoogleRegister}>Register with google</button>
            <button onClick={handleFacebookRegister}>
               Register with facebook
            </button>
         </form>
      </div>
   );
}

export default PageName;
