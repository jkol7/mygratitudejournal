import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBook} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {axiosPrivate} from '../api/axiosPrivate';
import AuthContext from '../context/AuthProvider';

export default function Nav() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const currentPath = useLocation().pathname;

  async function handleLogout() {
    await axiosPrivate({
      url: '/api/users/logout',
      method: 'GET',
      headers: {'Content-Type': 'multipart/form-data'},
    });
    try {
      auth.accessToken = '';
      setLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  }

  const {auth} = React.useContext(AuthContext);

  React.useEffect(
    () =>
      setLoggedIn((prev) =>
        auth.accessToken ? (prev = true) : (prev = false)
      ),
    [auth.accessToken]
  );

  return (
    <div className="bg-div">
      <nav className={currentPath !== '/' ? 'nav-wrap' : 'full-nav'}>
        <div
          className={
            currentPath !== '/' ? 'title-container' : 'full-title-container'
          }
        >
          <FontAwesomeIcon icon={faBook} className="faBook" size="lg" beat />
          <Link to="/dashboard" style={{textDecoration: 'none'}}>
            <h1>my gratitude journal</h1>
          </Link>
        </div>
        <div className={currentPath !== '/' ? 'nav-info' : 'full-nav-info'}>
          <ul>
            {loggedIn && (
              <li className="logged-out-link">
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!loggedIn && (
              <li>
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
