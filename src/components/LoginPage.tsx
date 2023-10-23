import './/LoginPage.scss';
import { useState, useContext } from 'react'
import { MainContext } from './MainContext';

export const LoginPage: React.FC = () => {
  const { setIsLoggedIn } = useContext(MainContext);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [goodUserName, setGoodUserName] = useState(true);
  const [goodPassword, setGoodPassword] = useState(true);

  const handleLogin = () => {
    if (userName !== 'testuser') {
      return setGoodUserName(false);
    }

    if (password !== 'testpassword123') {
      return setGoodPassword(false);
    }

    if (goodUserName && goodPassword) {
      setIsLoggedIn(true);
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
                setGoodUserName(true);
                setUserName(event.target.value)
              }}
            >
            </input>
          </div>

          {!goodUserName && (
            <p className="help is-danger">This username is invalid</p>
          )}
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
                setGoodPassword(true)
                setPassword(event.target.value)
              }}
            >
            </input>
          </div>

          {!goodPassword && (
            <p className="help is-danger">This password is invalid</p>
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