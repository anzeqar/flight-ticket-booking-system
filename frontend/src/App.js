import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Bookings from "./components/Bookings";
import Landing from "./components/Landing.jsx";
import Update from "./components/Update";
import Book from "./components/Book";
import Edit from "./components/Edit";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/book" exact>
            <Navbar />
            <Book />
            <Footer />
          </Route>
          <Route path="/update" exact>
            <Navbar />
            <Update />
            <Footer />
          </Route>
          <Route path="/edit" exact>
            <Navbar />
            <Edit />
            <Footer />
          </Route>
          <Route path="/bookings" exact>
            <Navbar />
            <Bookings />
            <Footer />
          </Route>
          <Route path="/">
            <Redirect to={"/"} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
