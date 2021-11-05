import React from 'react';
import useUser from '../../hooks/useUser';
import iconCloseModal from '../../assets/icon-close-modal.svg';

function Modal() {
  const {telefoneModal,
    setTelefoneModal,
    nomeModal,
    setNomeModal,
    emailModal,
    setEmailModal, handleCriarContato, setModalOpen, useEffect} = useUser();

    useEffect(() => {
      setTelefoneModal('');
      setNomeModal('');
      setEmailModal('')
    }, []);

    function handleLimparModal(e) {
      e.preventDefault();
      setTelefoneModal('');
      setNomeModal('');
      setEmailModal('')
    }

  return (
    <div className="modal-open">
      <div className="container-modal">
        <img className="icone-close-modal" src={iconCloseModal} alt="fechar-modal" onClick={() => setModalOpen(false)} />
        <h2 className="title-modal">Novo Contato</h2>
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
          onClick={e=>handleCriarContato(e)}>ADICIONAR</button>

          <button
          className="button-modal limpar"
          onClick={e => handleLimparModal(e)}
          >LIMPAR</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
