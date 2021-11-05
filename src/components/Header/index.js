import React from 'react';
import './style.css';
import IconSair from '../../assets/sair.svg'
import useUser from '../../hooks/useUser';
import {useHistory} from 'react-router-dom';


function Header() {
  const history = useHistory();
  const { deslogar, removeToken } = useUser();

  function handleDeslogarSubmit(e) {
    e.preventDefault();
    deslogar();
    history.push('/')
  }

  return (
    <header>
      <h1>KONTACTS</h1>
      <img src={IconSair} alt="icone sair" onClick={e => handleDeslogarSubmit(e)} />
    </header>
  );
}

export default Header;
