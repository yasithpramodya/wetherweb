import { useState } from 'react';
import LoginModal from './LoginModal';

const ProtectedRoute = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);

  if (!isAuthenticated) {
    return (
      <>
        {children}
        <LoginModal 
          show={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          setIsAuthenticated={setIsAuthenticated}
        />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;