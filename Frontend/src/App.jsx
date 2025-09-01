import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/login" replace />;
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="in"
    exit="out"
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Public Routes */}
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <Register />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <Profile />
                  </PageWrapper>
                </PrivateRoute>
              }
            />
            <Route
              path="/verify-email"
              element={
                <PrivateRoute>
                  <PageWrapper>
                    <VerifyEmail />
                  </PageWrapper>
                </PrivateRoute>
              }
            />

            {/* Default Redirect */}
            {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App;
