import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Refreshed User', user);
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  useEffect(() => {
  }, [state]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
