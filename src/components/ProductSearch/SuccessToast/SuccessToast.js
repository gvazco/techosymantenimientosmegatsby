import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

export default function SuccessToast({ message, onClose, timeout = 10000 }) {
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
        show ? "scale-100 opacity-100" : "scale-90 opacity-0"
      } alignfull fixed top-2/4 left-2/4 z-50 flex h-screen -translate-x-2/4 -translate-y-2/4 transform items-center justify-center p-6 text-white transition-all duration-300 md:h-3/4 md:w-3/4`}
    >
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-white p-6 shadow-md md:h-3/4 md:w-3/4">
        <StaticImage
          src="../../../../static/success.svg"
          height={100}
          width={100}
          alt="success"
        />
        <p className="text-base font-medium text-gray-600">{message}</p>
        <div className="flex w-full flex-row items-center justify-around align-middle ">
          <button
            className="btn mr-3 w-full bg-slate-700 text-gray-600 hover:bg-slate-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            Volver
          </button>
          <Link
            to="/budget"
            className="btn  ml-3 w-full text-gray-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            Mi Lista
          </Link>
        </div>
      </div>
    </div>
  );
}

SuccessToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};
