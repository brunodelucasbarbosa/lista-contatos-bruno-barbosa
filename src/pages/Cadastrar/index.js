import './style.css';
import useUser from '../../hooks/useUser'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cadastrar() {
  const { email, senha, nome, setEmail, setSenha, setNome, Link, handleCadastrar } = useUser();


  return (
    <main className="tela-cadastro">
      <ToastContainer
        className="toast-error"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
      />

      <aside className="aside-direita">
        <h2 className="title-login">Cadastre-se</h2>
        <form>
          <input
            name="nome"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Nome" />
          <input
            name="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail" />
          <input
            name="senha"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button
            className="button-login"
            onClick={e => handleCadastrar(e)}>CADASTRAR</button>
          <button
            className="button-cancelar"
            onClick={() => { setEmail(''); setSenha('') }}>CANCELAR</button>
          <div className="rota-login">
            <span>Já tem Cadastro? <Link to="/" sx={{ color: '#5999C0' }}>
              Clique aqui!
            </Link></span>
          </div>
        </form>
      </aside>
      <aside className="aside-esquerda cadastrar">
      </aside>
    </main>
  );
}

export default Cadastrar;
