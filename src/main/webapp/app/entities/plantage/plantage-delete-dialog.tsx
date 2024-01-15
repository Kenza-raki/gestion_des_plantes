import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntity, deleteEntity } from './plantage.reducer';

export const PlantageDeleteDialog = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();

  const [loadModal, setLoadModal] = useState(false);

  useEffect(() => {
    dispatch(getEntity(id));
    setLoadModal(true);
  }, []);

  const plantageEntity = useAppSelector(state => state.plantage.entity);
  const updateSuccess = useAppSelector(state => state.plantage.updateSuccess);

  const handleClose = () => {
    navigate('/plantage');
  };

  useEffect(() => {
    if (updateSuccess && loadModal) {
      handleClose();
      setLoadModal(false);
    }
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(plantageEntity.id));
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
        <ModalHeader toggle={handleClose} data-cy="plantageDeleteDialogHeading">
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="appFermeApp.plantage.delete.question">
          <Translate contentKey="appFermeApp.plantage.delete.question" interpolate={{ id: plantageEntity.id }}>
            Are you sure you want to delete this Plantage?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-plantage" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default PlantageDeleteDialog;
