import {BrowserRouter, Route} from 'react-router-dom';
import About from './pages/About';
import Landing from './pages/Landing';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/about" component={About}></Route>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
