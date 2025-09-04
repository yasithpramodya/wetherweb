import { useState } from 'react';

const AuthModal = ({ show, mode, onClose, setIsAuthenticated, switchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login' || mode === 'signup') {
      // Basic validation
      if (!formData.email || !formData.password) return;
      if (mode === 'signup' && formData.password !== formData.confirmPassword) return;
      
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      onClose();
    }
    // For forgot password, just close the modal
    if (mode === 'forgot') onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === 'login' && 'Login'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode !== 'forgot' && (
            <>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          )}

          {mode === 'forgot' && (
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll send you a link to reset your password
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white py-2 rounded"
            >
              {mode === 'login' && 'Login'}
              {mode === 'signup' && 'Sign Up'}
              {mode === 'forgot' && 'Send Reset Link'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-center">
          {mode === 'login' && (
            <>
              <button 
                onClick={() => switchMode('forgot')}
                className="text-sky-600 hover:text-sky-500"
              >
                Forgot password?
              </button>
              <span className="mx-2">•</span>
              <button 
                onClick={() => switchMode('signup')}
                className="text-sky-600 hover:text-sky-500"
              >
                Create account
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button 
              onClick={() => switchMode('login')}
              className="text-sky-600 hover:text-sky-500"
            >
              Already have an account? Login
            </button>
          )}
          {mode === 'forgot' && (
            <button 
              onClick={() => switchMode('login')}
              className="text-sky-600 hover:text-sky-500"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;