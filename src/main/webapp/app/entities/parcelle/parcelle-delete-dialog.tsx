import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './parcelle.reducer';

export const ParcelleDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const parcelleEntity = useAppSelector(state => state.parcelle.entity);
  const updateSuccess = useAppSelector(state => state.parcelle.updateSuccess);

  const handleClose = () => {
    navigate('/parcelle');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(parcelleEntity.id));
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
        <ModalHeader toggle={handleClose} data-cy="parcelleDeleteDialogHeading">
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="appFermeApp.parcelle.delete.question">
          <Translate contentKey="appFermeApp.parcelle.delete.question" interpolate={{ id: parcelleEntity.id }}>
            Are you sure you want to delete this Parcelle?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-parcelle" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default ParcelleDeleteDialog;
