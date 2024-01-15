import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './ferme.reducer';

export const FermeDeleteDialog = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const fermeEntity = useAppSelector(state => state.ferme.entity);
  const updateSuccess = useAppSelector(state => state.ferme.updateSuccess);

  const handleClose = () => {
    navigate('/ferme');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(fermeEntity.id));
  };

  const modalStyle = {
    position: 'relative',
  } as React.CSSProperties;

  const transparentStyle = {
    backgroundColor: 'transparent',
    border: 'none',
  } as React.CSSProperties;

  return (
    <Modal isOpen toggle={handleClose} style={modalStyle}>
      <div
        style={{
          position: 'relative',
          backgroundImage: "url('/content/images/b.jpg')", // Replace with your plant image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '10px',
        }}
      >
        <ModalHeader toggle={handleClose} data-cy="fermeDeleteDialogHeading" style={transparentStyle}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="appFermeApp.ferme.delete.question" style={transparentStyle}>
          <Translate contentKey="appFermeApp.ferme.delete.question" interpolate={{ id: fermeEntity.id }}>
            Are you sure you want to delete this Ferme?
          </Translate>
        </ModalBody>
        <ModalFooter style={transparentStyle}>
          <Button color="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-ferme" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default FermeDeleteDialog;
