import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.context';

const useAuth = () => {
  const context = useContext(AuthContext);
  try {
    if (!context) {
      throw new Error('Auth context is not available');
    }

    return context;
  } catch (error) {
    throw error;
  }
};

export default useAuth;
