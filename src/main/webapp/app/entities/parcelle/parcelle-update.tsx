import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities as getFermes } from 'app/entities/ferme/ferme.reducer';
import { getEntity, updateEntity, createEntity, reset } from './parcelle.reducer';

export const ParcelleUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const fermes = useAppSelector(state => state.ferme.entities);
  const parcelleEntity = useAppSelector(state => state.parcelle.entity);
  const loading = useAppSelector(state => state.parcelle.loading);
  const updating = useAppSelector(state => state.parcelle.updating);
  const updateSuccess = useAppSelector(state => state.parcelle.updateSuccess);

  const handleClose = () => {
    navigate('/parcelle');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getFermes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }

    const entity = {
      ...parcelleEntity,
      ...values,
      fermeLibelle: fermes.find(it => it.id.toString() === values.fermeLibelle.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...parcelleEntity,
          fermeLibelle: parcelleEntity?.fermeLibelle?.id,
        };

  return (
    <div
      style={{
        background: 'url("/content/images/b.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        overflowY: 'auto',
        height: '100vh',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(0, 128, 0, 0)',
          marginTop: 30,
        }}
      >
        <h2 id="appFermeApp.parcelle.home.createOrEditLabel" data-cy="ParcelleCreateUpdateHeading" style={{ color: 'green' }}>
          <Translate contentKey="appFermeApp.parcelle.home.createOrEditLabel">Create or edit a Parcelle</Translate>
        </h2>
      </div>
      <Row
        className="justify-content-center"
        style={{
          width: '50%',
        }}
      >
        <Col md="6" style={{ marginBottom: '10px', marginTop: '50px' }}>
          {parcelleEntity.photo && (
            <img
              src={`data:${parcelleEntity.photoContentType};base64,${parcelleEntity.photo}`}
              alt="Parcelle Photo"
              style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
            />
          )}
        </Col>
        <Col md="6">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="parcelle-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appFermeApp.parcelle.parcelleLibelle')}
                id="parcelle-parcelleLibelle"
                name="parcelleLibelle"
                data-cy="parcelleLibelle"
                type="text"
                style={{ fontSize: '0.8rem' }}
              />
              <ValidatedBlobField
                label={translate('appFermeApp.parcelle.photo')}
                id="parcelle-photo"
                name="photo"
                data-cy="photo"
                openActionLabel={translate('entity.action.open')}
              />

              {/* Move buttons under the image */}
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>

                <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/parcelle" replace color="warning">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </div>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ParcelleUpdate;
