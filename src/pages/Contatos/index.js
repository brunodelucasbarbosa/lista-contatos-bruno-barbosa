import './style.css';
import useUser from '../../hooks/useUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header';
import iconEditar from '../../assets/icone-editar.svg'
import iconDelete from '../../assets/icone-delete.svg'
import { useEffect } from 'react';
import Modal from '../../components/Modal'
import ModalEditar from '../../components/ModalEditar'
import ModalExcluir from '../../components/ModalExcluir'



function Contatos() {
  const { contatos, listarContatos, carregando, modalOpen, setModalOpen, modalEditarOpen, setModalEditarOpen, contatoEditar, setContatoEditar, modalExcluirOpen, setModalExcluirOpen, handleAbrirModalEditar, useHistory } = useUser();

  useEffect(() => {
    listarContatos();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    listarContatos();
    // eslint-disable-next-line
  }, [modalOpen, modalEditarOpen, modalExcluirOpen]);

  function handleAbrirModalExcluir(e) {
    const contatoExcluir = contatos.find(contato => contato.id === Number(e.target.id));
    setContatoEditar(contatoExcluir);
    setModalExcluirOpen(true);
  }

  return (
    <main className="tela-contatos">
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
      <Header />
      <section className="section-contatos">
        <div className="div-botao">
          <button className="button-adicionar-contato" onClick={() => setModalOpen(true)} >Adicionar</button>
        </div>

        <div className="contatos">
          <div className="header-contatos">
            <span>Nome</span>
            <span>Email</span>
            <span>Telefone</span>
            <span></span>
          </div>

          <div className="lista-contatos">
            {!carregando && contatos.map((contato, index) => {
              return (
                <div className="elemento" key={index}>
                  <span className="span-nome">{contato.nome}</span>
                  <span className="span-email">{contato.email}</span>
                  <span className="span-telefone">{contato.telefone}</span>
                  <div className="icons-delete-editar">
                    <img
                    id={contato.id} 
                    src={iconEditar}
                    alt="icone editar"
                    style={{ cursor: 'pointer' }} 
                    onClick={e=>handleAbrirModalEditar(e)}
                    />

                    <img
                    src={iconDelete}
                    alt="icone deletar"
                    style={{ cursor: 'pointer' }}
                    id={contato.id}
                    onClick={e => handleAbrirModalExcluir(e)}
                    />
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </section>

      {modalOpen && <Modal />}
      {modalEditarOpen && <ModalEditar contatoEditar={contatoEditar} />}
      {modalExcluirOpen && <ModalExcluir contatoEditar={contatoEditar} />}

    </main>
  );
}

export default Contatos;
