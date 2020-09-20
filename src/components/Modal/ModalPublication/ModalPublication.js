import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm/CommentForm";
import Comments from "./Comments";
import "./ModalPublication.scss";

const ModalPublication = ({ show, setShow, publication }) => {
  const { file, id } = publication;
  const onClose = () => setShow(false);
  return (
    <Modal open={show} onClose={onClose} className="modal-publication">
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url(${file})` }}
        />
        <Grid.Column className="modal-publication__right" width={6}>
          <Comments publication={publication} />
          <div>Acciones</div>
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default ModalPublication;