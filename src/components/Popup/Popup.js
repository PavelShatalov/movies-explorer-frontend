import "./Popup.css";

const InfoTooltip = ({ onClose, isOpen, errorMessage }) => {
  return (
    <div className={`popup ${isOpen && " popup_opened "}`} onClick={onClose}>
      <div className="popup__container">
        <h1 className="popup__title ">{ errorMessage}</h1>
        <button type="button" className="popup__close" onClick={onClose}>Закрыть</ button>
      </div>
    </div>
  );
};

export default InfoTooltip;