import Home from './Components/Home/Home';
import styles from './App.module.css';
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register';
import { /* Redirect, */ Route } from 'react-router-dom';


export default function App() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.smallCont}>
        <Route exact path={'/'} component={Login}/>
        <Route path={'/register'} component={Register}/>
        <Route path={'/home'} component={Home}/>
      </div>
    </div>
  );
}
