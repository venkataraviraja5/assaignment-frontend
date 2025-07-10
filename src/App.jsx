import { BrowserRouter as Router, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <Router>
      <Routes>
        {PublicRoutes()}
        {PrivateRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
