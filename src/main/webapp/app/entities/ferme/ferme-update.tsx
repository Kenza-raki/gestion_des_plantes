import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFerme } from 'app/shared/model/ferme.model';
import { getEntity, updateEntity, createEntity, reset } from './ferme.reducer';

const FermeUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;
  const fermeEntity = useAppSelector(state => state.ferme.entity);
  const loading = useAppSelector(state => state.ferme.loading);
  const updating = useAppSelector(state => state.ferme.updating);
  const updateSuccess = useAppSelector(state => state.ferme.updateSuccess);

  const handleClose = () => {
    navigate('/ferme');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
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
      ...fermeEntity,
      ...values,
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
          ...fermeEntity,
        };
  return (
    <div
      style={{
        background: 'url("/content/images/b.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
        }}
      >
        <h2 id="appFermeApp.ferme.home.createOrEditLabel" data-cy="FermeCreateUpdateHeading" style={{ color: 'green', marginTop: 30 }}>
          <Translate contentKey="appFermeApp.ferme.home.createOrEditLabel">Create or edit a Ferme</Translate>
        </h2>
      </div>
      <Row
        className="justify-content-center"
        style={{
          width: '40%',
        }}
      >
        <Col md="6" style={{ marginBottom: '10px', marginTop: '30px' }}>
          {fermeEntity.photo && (
            <img
              src={`data:${fermeEntity.photoContentType};base64,${fermeEntity.photo}`}
              alt="Ferme Photo"
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
                  id="ferme-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('appFermeApp.ferme.fermeLibelle')}
                id="ferme-fermeLibelle"
                name="fermeLibelle"
                data-cy="fermeLibelle"
                type="text"
              />
              <ValidatedBlobField
                label={translate('appFermeApp.ferme.photo')}
                id="ferme-photo"
                name="photo"
                data-cy="photo"
                openActionLabel={translate('entity.action.open')}
              />
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/ferme" replace color="warning">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </div>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FermeUpdate;
