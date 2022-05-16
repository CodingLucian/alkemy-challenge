import logo from './logo.svg';
import './App.css';
import NewOperation from './Components/NewOperation/NewOperation';
import ViewMovements from './Components/ViewMovements/ViewMovements';

function App() {
  return (
    <div className="App">
      <NewOperation/>
      <ViewMovements/>
    </div>
  );
}

export default App;
