
import { useContext } from 'react';
import { AuthContext } from './context';

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
