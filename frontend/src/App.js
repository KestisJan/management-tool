import './App.css';
import { Button, Typography } from '@mui/material';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100 flex items-center justify-center">
    <header className="App-header text-center p-6 bg-white shadow-md rounded-lg">
      <Typography variant="h4" component="h1" className="mb-4">
        Welcome to React with Tailwind CSS and Material UI!
      </Typography>
      <Button variant="contained" color="primary">
        Material UI Button
      </Button>
    </header>
  </div>
  );
}

export default App;
