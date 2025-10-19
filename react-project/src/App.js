import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FirebaseProvider } from './contexts/FirebaseContext';
import './styles/globals.css';

// Import components and pages
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthRoute from './components/AuthRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [darkMode, setDarkMode] = useState(false); // Can be managed with a context/hook if more global control is needed

  React.useEffect(() => {
    // Check local storage or system preference for dark mode
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true');
      if (savedDarkMode === 'true') {
        document.documentElement.classList.add('dark');
      }
    } else if (prefersDarkMode) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <FirebaseProvider>
      <Router>
        <div className=\"relative min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300\">
          <Toaster position=\"top-center\" reverseOrder={false} />
          <Navbar />

          <main className=\"flex-grow\">
            <Routes>
              <Route path=\"/\" element={<HomePage />} />
              <Route path=\"/products\" element={<ProductsPage />} />
              <Route path=\"/auth\" element={<AuthPage />} />

              {/* Protected Route for Dashboard */}
              <Route element={<AuthRoute roles={['member', 'admin', 'owner']} />}>
                <Route path=\"/dashboard\" element={<DashboardPage />} />
              </Route>

              <Route path=\"*\" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </FirebaseProvider>
  );
}

export default App;
