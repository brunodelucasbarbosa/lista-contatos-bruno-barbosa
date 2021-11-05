import React from 'react';
import useUser from '../../hooks/useUser';
import iconCloseModal from '../../assets/icon-close-modal.svg';
import './style.css';

function Modal({contatoEditar}) {
  const {setModalExcluirOpen, handleExcluirContato} = useUser();


  return (
    <div className="modal-open">
      <div className="container-modal">
        <img className="icone-close-modal" src={iconCloseModal} alt="fechar-modal" onClick={() => setModalExcluirOpen(false)} />
        <h2 className="title-modal">Confirma a exclusão?</h2>

        <form>
          <span className="span-modal-excluir">Deseja excluir o contato, <span className="color-name">{contatoEditar.nome}</span>?</span>
          <button
          className="button-modal adicionar"
          onClick={e=>handleExcluirContato(e)}
          >EXCLUIR</button>

          <button
          className="button-modal limpar"
          onClick={() => setModalExcluirOpen(false)}
          >CANCELAR</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
