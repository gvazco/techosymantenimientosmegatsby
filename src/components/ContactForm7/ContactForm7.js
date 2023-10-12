import React, { useEffect, useRef, useState } from "react";

export const ContactForm7 = ({ formId, formMarkup }) => {
  const formRef = useRef(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (formRef?.current) {
      const formElement = formRef.current.getElementsByTagName("form")?.[0];
      if (formElement) {
        const handleSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          fetch(
            `${process.env.GATSBY_WP_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
            {
              method: "POST",
              body: formData,
            }
          ).then(() => {
            setHasSubmitted(true);
          });
        };
        formElement.addEventListener("submit", handleSubmit);
        return () => {
          formElement.removeEventListener("submit", handleSubmit);
        };
      }
    }
  }, [formRef, formId]);

  return hasSubmitted ? (
    <div className="bg-emerald-900 p-4 text-white">
      <h3>Gracias por envíar su mensaje.</h3>
      <p>
        A la brevedad, un representante de nuestro equipo revisará su solicitud
        y se pondrá en contacto con usted.
      </p>
    </div>
  ) : (
    <fieldset ref={formRef} dangerouslySetInnerHTML={{ __html: formMarkup }} />
  );
};


















































































































