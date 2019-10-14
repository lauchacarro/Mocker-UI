import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Loading from './components/Loading'
import './App.css'
import { config } from './components/Api/config'
const Home = lazy(() => import('./pages/Home'));

const App = () => {
  fetch(config.Url + "api")
  
  return (
    <Suspense fallback={<Loading />}>
      <Router basename={process.env.PUBLIC_URL}>>
        <Route path="/" component={Home} />
      </Router>
    </Suspense>
  );
}

export default App;
