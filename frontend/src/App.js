import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Bookings from './components/Bookings';
import Landing from './components/Landing.jsx';
import Update from './components/Update';
import Book from './components/Book';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/book" exact>
            <Book />
          </Route>
          <Route path="/update" exact>
            <Update />
          </Route>
          <Route path="/bookings" exact>
            <Bookings />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
