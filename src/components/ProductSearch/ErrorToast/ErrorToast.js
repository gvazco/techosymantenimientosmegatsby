import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function ErrorToast({ message, onClose, timeout = 5000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, timeout]);

  function handleClose() {
    setShow(false);
    onClose();
  }

  return (
    <div
      className={`${
        show ? "scale-100 opacity-100" : "scale-100 opacity-0"
      } fixed top-6 right-6 z-50 transform bg-teal-500 text-white transition-all duration-300`}
    >
      <div className="flex w-full max-w-sm items-center justify-between rounded-lg bg-white px-4 py-2 shadow-md">
        <p className="text-sm font-medium text-gray-600">{message}</p>
        <button
          className="text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

ErrorToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};
