import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { selectIsAuthenticated, logout } from '../features/auth/authSlice';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const isAuthenticated = useSelector(( state: RootState) => selectIsAuthenticated(state));
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#1D4ED8', 
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
          borderBottom: '1px solid #1E40AF', 
        }}
      >
        <Toolbar className="flex justify-between items-center py-3 px-6">
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              color: '#F1F5F9', 
              textDecoration: 'none', 
              fontWeight: 'bold' 
            }} 
            className="text-2xl hover:text-gray-200"
          >
            MyApp
          </Typography>
          <div className="flex gap-4">
            {!isAuthenticated ? (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login" 
                  sx={{ 
                    color: '#F1F5F9',
                    borderRadius: '8px', 
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#3B82F6', 
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/signup" 
                  sx={{ 
                    color: '#F1F5F9',  
                    borderRadius: '8px', 
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#3B82F6', 
                    }
                  }}
                >
                  SignUp
                </Button>
              </>
            ) : (
              <>
              <Button
                color='inherit'
                component={Link}
                to={`/profile/${userId}`}
              >
                Profile
              </Button>
              <Button
                color='inherit'
                onClick={handleLogout}
                sx={{
                  color: '#F1F5F9',
                  borderRadius: '8px',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#3B82F6',
                  }
                }}
              >
                Logout
              </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
