import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITypePlante } from 'app/shared/model/type-plante.model';
import { getEntity, updateEntity, createEntity, reset } from './type-plante.reducer';

export const TypePlanteUpdate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const typePlanteEntity = useAppSelector(state => state.typePlante.entity);
  const loading = useAppSelector(state => state.typePlante.loading);
  const updating = useAppSelector(state => state.typePlante.updating);
  const updateSuccess = useAppSelector(state => state.typePlante.updateSuccess);

  const handleClose = () => {
    navigate('/type-plante');
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

  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.humiditeMax !== undefined && typeof values.humiditeMax !== 'number') {
      values.humiditeMax = Number(values.humiditeMax);
    }
    if (values.humiditeMin !== undefined && typeof values.humiditeMin !== 'number') {
      values.humiditeMin = Number(values.humiditeMin);
    }
    if (values.temperature !== undefined && typeof values.temperature !== 'number') {
      values.temperature = Number(values.temperature);
    }

    const entity = {
      ...typePlanteEntity,
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
          ...typePlanteEntity,
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
        <h2 id="appFermeApp.typePlante.home.createOrEditLabel" data-cy="TypePlanteCreateUpdateHeading" style={{ color: 'green' }}>
          <Translate contentKey="appFermeApp.typePlante.home.createOrEditLabel">Create or edit a TypePlante</Translate>
        </h2>
      </div>
      <Row
        className="justify-content-center"
        style={{
          width: '80%',
        }}
      >
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="type-plante-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                  style={{ marginBottom: '10px' }}
                />
              ) : null}
              <ValidatedField
                label={translate('appFermeApp.typePlante.nom')}
                id="type-plante-nom"
                name="nom"
                data-cy="nom"
                type="text"
                style={{ marginBottom: '10px' }}
              />
              <ValidatedField
                label={translate('appFermeApp.typePlante.humiditeMax')}
                id="type-plante-humiditeMax"
                name="humiditeMax"
                data-cy="humiditeMax"
                type="text"
                style={{ marginBottom: '10px' }}
              />
              <ValidatedField
                label={translate('appFermeApp.typePlante.humiditeMin')}
                id="type-plante-humiditeMin"
                name="humiditeMin"
                data-cy="humiditeMin"
                type="text"
                style={{ marginBottom: '10px' }}
              />
              <ValidatedField
                label={translate('appFermeApp.typePlante.temperature')}
                id="type-plante-temperature"
                name="temperature"
                data-cy="temperature"
                type="text"
                style={{ marginBottom: '10px' }}
              />
              <Row className="justify-content-center">
                <Col md="8" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/type-plante" replace color="warning">
                    <FontAwesomeIcon icon="arrow-left" />
                    &nbsp;
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.back">Back</Translate>
                    </span>
                  </Button>
                  <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                    <FontAwesomeIcon icon="save" />
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                </Col>
              </Row>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default TypePlanteUpdate;
