import { useState, useEffect } from 'react';
import { useLocalStorage } from 'react-use';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'

function useUserProvider() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [contatos, setContatos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [logado, setLogado] = useState(false); // CONSERTAR
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEditarOpen, setModalEditarOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [contatoEditar, setContatoEditar] = useState('');

  const [telefoneModal, setTelefoneModal] = useState('');
  const [nomeModal, setNomeModal] = useState('');
  const [emailModal, setEmailModal] = useState('');

  const [token, setToken, removeToken] = useLocalStorage('token', '');


  async function listarContatos() {
    try {
      setCarregando(true);
      await fetch('https://cubos-api-contacts.herokuapp.com/contatos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`,
        },
      }).then(promise => promise.json()).then(data => {
        setContatos(data);
      })
      setCarregando(false);
    } catch (err) {
      console.log(err.message);
    };
  }; // FIM FUNCAO

  async function handleLogin() {
    try {
      if (!email || !senha) {
        toast.warn(`E-mail e senha necessários!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      const dados = {
        email,
        senha
      };
      const promise = await fetch('https://cubos-api-contacts.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })

      if (promise.status !== 200) {
        toast.error('Usuário não encontrado!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }
      toast.success('Login realizado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      const { token } = await promise.json()
      setToken(token);
      return true;

    } catch (err) {
      toast.error('Erro ao conectar-se com o serviddor!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
  }; // FIM FUNCAO


  /*---------------------------------------------------*/
  async function handleCriarContato(e) {
    e.preventDefault();
    if (!nomeModal || !telefoneModal || !emailModal) {
      toast.warn(`Todos os campos são necessários!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const dados = {
        nome: nomeModal,
        telefone: telefoneModal,
        email: emailModal
      };
      const promise = await fetch('https://cubos-api-contacts.herokuapp.com/contatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
        body: JSON.stringify(dados)
      });
      if (promise.status !== 200) {
        toast.warn(`Erro ao cadastrar contato!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      toast.success('Novo contato cadastrado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setModalOpen(false);
    } catch (err) {
      console.log(err.message)
    }
  };

  function deslogar() {
    removeToken('token', '');
    setLogado(false);
  }

  function handleAbrirModalEditar(e) {
    const contatoEditar = contatos.find(contato => contato.id === Number(e.target.id));
    setContatoEditar(contatoEditar)
    setModalEditarOpen(true);
  };

  async function handleEditarContato(e) {
    e.preventDefault();
    if (!nomeModal || !telefoneModal || !emailModal) {
      toast.warn(`Todos os campos são necessários!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const { id } = contatoEditar;
    try {
      const dados = {
        nome: nomeModal,
        telefone: telefoneModal,
        email: emailModal
      };
      const response = await fetch(`https://cubos-api-contacts.herokuapp.com/contatos/${ id }`, {
        method: 'PUT',
        body: JSON.stringify(dados),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        },
      });

      if (response.status !== 200) {
        toast.warn(`Erro ao atualizar contato!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      toast.success('Contato editado com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setModalEditarOpen(false);
    } catch (err) {
      console.log(err.message)
    }
  }

  async function handleCadastrar(e) {
    e.preventDefault();
    if (!email || !senha) {
      toast.warn(`E-mail e senha necessários!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const dados = {
      nome,
      email,
      senha
    };
    const promise = await fetch('https://cubos-api-contacts.herokuapp.com/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    })
    if (promise.status !== 200) {
      toast.warn(`Usuário já cadastrado!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    toast.success('Usuário cadastrado com sucesso!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }; // FIM FUNCAO

  async function handleExcluirContato(e) {
    e.preventDefault();
    const { id } = contatoEditar;
    try {
      const promise = await fetch(`https://cubos-api-contacts.herokuapp.com/contatos/${ id }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ token }`
        }
      });
      if (promise.status !== 200) {
        toast.warn(`Erro ao excluir contato!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      toast.success('Contato excluido com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setModalExcluirOpen(false);
    } catch (err) {
      console.log(err.message)
    }
  }


  return {
    email,
    setEmail,
    senha,
    setSenha,
    nome,
    setNome,
    token,
    setToken,
    removeToken,
    contatos,
    setContatos,
    listarContatos,
    carregando,
    setCarregando,
    ToastContainer,
    toast,
    handleLogin,
    Router,
    Route,
    Switch,
    Redirect,
    useEffect,
    Link,
    logado,
    setLogado,
    deslogar,
    handleCriarContato,
    modalOpen,
    setModalOpen,
    telefoneModal,
    setTelefoneModal,
    nomeModal,
    setNomeModal,
    emailModal,
    setEmailModal,
    modalEditarOpen,
    setModalEditarOpen,
    modalExcluirOpen,
    setModalExcluirOpen,
    contatoEditar,
    setContatoEditar,
    handleAbrirModalEditar,
    handleEditarContato,
    handleCadastrar,
    handleExcluirContato

  }
}

export default useUserProvider;

