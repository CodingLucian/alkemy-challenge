import Home from './Components/Home/Home';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.smallCont}>
        <Home/>
      </div>
    </div>
  );
}

export default App;
 