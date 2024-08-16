import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { user: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')) || null,
  });
  const [cookies, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  useEffect(() => {
    // if (state.user) {
    //   setCookie('access_token', state.user.access_token);
    // }
  }, [state.user, setCookie]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
