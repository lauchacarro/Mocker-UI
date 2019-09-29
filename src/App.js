import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Loading from './components/Loading'
import './App.css'
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <Router basename={process.env.PUBLIC_URL}>>
        <Route path="/" component={Home} />
      </Router>
    </Suspense>
  );
}

export default App;
