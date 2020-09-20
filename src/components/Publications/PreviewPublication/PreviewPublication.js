import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalPublication/";

import "./PreviewPublication.scss";

const PreviewPublication = ({ publication }) => {
  const { file } = publication;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="preview-publication" onClick={() => setShowModal(true)}>
        <Image className="preview-publication__image" src={file} />
      </div>
      <ModalPublication
        show={showModal}
        setShow={setShowModal}
        publication={publication}
      />
    </>
  );
};

export default PreviewPublication;
