import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faInstagram,
  faGooglePlusG,
} from '@fortawesome/free-brands-svg-icons'
import { faPhoneAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'
import '../styles/Footer.css'

Modal.setAppElement('#root')

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#f4f4f4',
      border: 'none',
      borderRadius: '20px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  return (
    <div className="footer">
      <div className="social-media-icons">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://plus.google.com" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGooglePlusG} />
        </a>
      </div>
      <button className="host-button" onClick={openModal}>
        <FontAwesomeIcon icon={faPhoneAlt} />
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <button className="modal-close-button" onClick={closeModal}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-header">Renginiu organizatoriai</div>
        <div className="modal-hosts">
          <p>Gytis Juozėnas</p>
          <p>Lukas Vaicekauskas</p>
        </div>
      </Modal>
    </div>
  )
}

export default Footer
