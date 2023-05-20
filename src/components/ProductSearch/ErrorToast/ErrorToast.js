import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

export default function ErrorToast({ message, onClose, timeout = 10000 }) {
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
      } fixed top-2/4 left-2/4 z-50 flex h-screen w-screen md:h-3/4 md:w-3/4 -translate-x-2/4 -translate-y-2/4 transform items-center justify-center p-6 text-white transition-all duration-300`}
    >
      <div className="flex h-screen w-screen md:h-3/4 md:w-3/4 flex-col items-center justify-center bg-white p-6 shadow-md">
        <StaticImage
          src="../../../../static/error.svg"
          height={100}
          width={100}
          alt="error"
        />
        <p className="text-base font-medium text-gray-600">{message}</p>
        <div className="flex w-full flex-row items-center justify-around align-middle ">
          <Link
            to="/store/all-products"
            className="btn mr-3 w-full bg-slate-700 text-gray-600 hover:bg-slate-600 hover:text-gray-800 focus:text-gray-800 focus:outline-none"
            onClick={handleClose}
          >
            Volver
          </Link>
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

ErrorToast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  timeout: PropTypes.number,
};
