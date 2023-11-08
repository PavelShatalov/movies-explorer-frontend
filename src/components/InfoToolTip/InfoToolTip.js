import React, { useEffect } from "react";
import "./InfoToolTip.css";

const InfoTooltip = ({ onClose, isOpen, infoTitle, infoImage }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} onClick={onClose}>
      <div className="popup__container-infoTooltip" role="dialog" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="popup__close" onClick={onClose} tabIndex={0} />
        <img src={infoImage} alt={infoTitle} className="popup__infoimage" />
        <h2 className="popup__title popup__title_infoTooltip">{infoTitle}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;
