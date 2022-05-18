import { useEffect } from 'react';

const Auth = ({ match }) => {
  useEffect(() => {
    const { tokens } = match.params;
    const url = new URLSearchParams(tokens);
    const token = url.get('access_token');
    window.localStorage.setItem('token', token);
  }, [match]);
};

export default Auth;