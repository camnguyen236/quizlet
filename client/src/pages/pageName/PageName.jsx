import React, {useState} from 'react';
import axios from "axios";
function PageName(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password,
                email,
                birthday
            }).catch((error) => {
                setError(true);
            });
            if(res.status === 200) {
                window.location.replace("/latest");
            }
    }

    const handleChangeUsername = async (event) => {
        setErrorUsername(false);
        setUsername(event.target.value);
        const url = "http://localhost:5000/api/auth/user/username/?username=" + event.target.value;
        await axios.get(url)
            .then((res) => {
                if(res.data) setErrorUsername(true);
            })
            .catch((err) => {
            console.log(err);
        });
    }

    const handleChangeEmail = async (event) => {
        setErrorEmail(false);
        setEmail(event.target.value);
        const url = "http://localhost:5000/api/auth/user/email/?email=" + event.target.value;
        await axios.get(url)
            .then((res) => {
                if(res.data) setErrorEmail(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errorUsername && <span>Username already exists</span>}
                <input placeholder="username" type="text" name="username" onChange={handleChangeUsername}/>
                {errorEmail && <span>Email already exists</span>}
                <input placeholder="email" type="text" name="email" onChange={handleChangeEmail}/>
                <input placeholder="pass" type="password" name="password" onChange={(event) => {
                    setPassword(event.target.value);
                }}/>
                <input placeholder="birthday" type="text" name="birthday" onChange={(event) => {
                    setBirthday(event.target.value);
                }}/>
                {error && <span>There's something wrong</span>}
                <button type="submit">Register</button>
                <button>Register with google</button>
            </form>
        </div>
    );
}

export default PageName;