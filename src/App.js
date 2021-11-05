import './App.css';
import Main from './pages/Main/Main';
import Cadastrar from './pages/Cadastrar';
import Contatos from './pages/Contatos';
import useUser from './hooks/useUser';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

function RotasProtegida(props) {  
  return (
    <Route 
      render={() => props.token ? (props.children) : (<Redirect to="/" />)}
    />
  );
};

function App() {
  const {token} = useUser();

  return (
    <div className="App">
        <Router>
          <Switch>              
              <Route path="/cadastrar" exact component={Cadastrar} />
              <Route path="/" exact component={Main} />
              <RotasProtegida token={token}>
                <Route path="/contatos" component={Contatos} />
              </RotasProtegida>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
