import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { RootState } from '../../store';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md relative">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/dashboard" 
            className="flex items-center flex-shrink-0"
          >
            <span className="text-xl font-bold text-primary">Task Manager</span>
          </Link>

          {/* Mobile menu button */}
          {isAuthenticated && (
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 
                hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 
                focus:ring-inset focus:ring-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          )}

          {/* Desktop navigation */}
          {isAuthenticated ? (
            <div className="hidden sm:flex sm:items-center sm:gap-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 
                  focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex sm:items-center sm:gap-4">
              <Link
                to="/login"
                className="text-primary hover:text-primary-dark transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark 
                  transition-colors focus:outline-none focus:ring-2 focus:ring-primary 
                  focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile navigation */}
        {isAuthenticated && (
          <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} 
            animate-slideDown absolute top-16 left-0 right-0 bg-white shadow-lg z-50`}
          >
            <div className="px-4 py-3 space-y-3 border-t">
              <div className="text-gray-600 font-medium">
                Welcome, {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md 
                  hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 
                  focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
