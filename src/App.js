import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import './App.css';
import Ticker from "./Components/Ticker";
import OrderBook from './Components/OrderBook';

function App() {
  return (
    <>
      <Router>
        <span class="nav-link"><Link to="/OrderBook">OrderBook</Link></span>
        <span class="nav-link"><Link to="/Ticker">Ticker</Link></span>
        <Switch>
          <Route exact path="/Ticker">
            <Ticker></Ticker>
          </Route>
          <Route exact path="/OrderBook">
            <OrderBook></OrderBook>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
