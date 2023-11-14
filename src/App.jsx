import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import MovieList from "./component/MovieList";
import DetailMovie from "./component/DetailMovie";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
        </div>
        <div className="mt-4 container mx-auto px-8">
          <Route path="/" exact component={MovieList} />
          <Route path="/detail/:imdbID" component={DetailMovie} />
        </div>
      </Router>
    </div>
  );
}

export default App;
