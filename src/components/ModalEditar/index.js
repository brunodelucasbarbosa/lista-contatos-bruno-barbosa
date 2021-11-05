import React from 'react';
import useUser from '../../hooks/useUser';
import iconCloseModal from '../../assets/icon-close-modal.svg';
import './style.css'

function Modal({contatoEditar}) {
  const {telefoneModal,
    setTelefoneModal,
    nomeModal,
    setNomeModal,
    emailModal,
    setEmailModal, setModalEditarOpen, useEffect, token, handleEditarContato} = useUser();

    useEffect(() => {
      const {nome, email, telefone} = contatoEditar;
      setTelefoneModal(telefone);
      setNomeModal(nome);
      setEmailModal(email);
    }, [])  


  return (
    <div className="modal-open">
      <div className="container-modal">
        <img className="icone-close-modal" src={iconCloseModal} alt="fechar-modal" onClick={() => setModalEditarOpen(false)} />
        <h2 className="title-modal">Editar Contato</h2>
        <form>
          <input
            className="input-modal"
            type="text"
            placeholder="Nome"
            name="nome"
            value={nomeModal}
            onChange={(e) => setNomeModal(e.target.value)} />
          <input
            className="input-modal"
            type="email"
            placeholder="E-Mail"
            name="email"
            value={emailModal}
            onChange={(e) => setEmailModal(e.target.value)} />
          <input
            className="input-modal"
            type="tel"
            placeholder="Telefone"
            name="telefone"
            value={telefoneModal}
            onChange={(e) => setTelefoneModal(e.target.value)} />

          <button
          className="button-modal adicionar"
          onClick={e=>handleEditarContato(e)}>SALVAR</button>

          <button
          className="button-modal limpar"
          onClick={() => setModalEditarOpen(false)}
          >CANCELAR</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
