import './/LoginPage.scss';
import { useState, useContext } from 'react'
import { MainContext } from './MainContext';
import { checkLogin } from '../api';

export const LoginPage: React.FC = () => {
  const { setIsLoggedIn } = useContext(MainContext);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [goodCredentials, setGoodCredentials] = useState(true);

  const handleLogin = async () => {
    try {
      const result = await checkLogin({username: userName, password});
      if (result) {
        setIsLoggedIn(true);
      }
    }
    catch(e) {
      setGoodCredentials(false);
    }
  }

  return (
    <div className="container">
      <form className="box">
        <div className="field">
          <label className="label">Username</label>

          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="testuser"
              required
              onChange={event => {
                setUserName(event.target.value)
              }}
            >
            </input>
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>

          <div className="control">
            <input
              className="input"
              type="password"
              placeholder="testpassword123"
              required
              onChange={event => {
                setGoodCredentials(true);
                setPassword(event.target.value)
              }}
            >
            </input>
          </div>

          {!goodCredentials && (
            <p className="help is-danger">Invalid credentials.</p>
          )}
        </div>

        <button
          className="button is-primary"
          onClick={event => {
            event.preventDefault();
            handleLogin();
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}