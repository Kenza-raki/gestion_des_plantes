import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './plantage.reducer';

export const PlantageDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const plantageEntity = useAppSelector(state => state.plantage.entity);
  const detailContainerStyle: React.CSSProperties = {
    background: 'url("/content/images/b.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    margin: 0,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0.8,
  };

  const fermeTitleStyle = {
    color: 'limegreen',
    fontSize: '2.9em',
    margin: '10px 0 30px', // Updated margin
    textAlign: 'center' as 'center',
  };

  const typePlanteTitleStyle = {
    color: 'limegreen',
    fontSize: '2.9em',
    margin: '10px 0 30px', // Updated margin
    textAlign: 'center' as 'center',
  };
  const idLabelStyle = {
    color: 'darkgreen',
    marginBottom: '5px',
    fontSize: '1.2em',
  };

  const idValueStyle = {
    color: 'black',
    marginBottom: '15px',
    fontSize: '1.2em',
  };
  return (
    <div style={detailContainerStyle}>
      <h2 data-cy="plantageDetailsHeading" style={typePlanteTitleStyle}>
        <Translate contentKey="appFermeApp.plantage.detail.title">Plantage</Translate>
      </h2>

      <Row>
        <Col md="6" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            <dl className="jh-entity-details" style={{ textAlign: 'left' }}>
              <dt style={idLabelStyle}>
                <span id="id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </span>
              </dt>
              <dd style={idValueStyle}>{plantageEntity.id}</dd>
              <dt style={idLabelStyle}>
                <span id="date">
                  <Translate contentKey="appFermeApp.plantage.date">Date</Translate>
                </span>
              </dt>
              <dd style={idValueStyle}>
                {plantageEntity.date ? <TextFormat value={plantageEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
              </dd>
              <dt style={idLabelStyle}>
                <span id="nombre">
                  <Translate contentKey="appFermeApp.plantage.nombre">Nombre</Translate>
                </span>
              </dt>
              <dd style={idValueStyle}>{plantageEntity.nombre}</dd>
              <dt style={idLabelStyle}>
                <Translate contentKey="appFermeApp.plantage.planteLibelle">Plante Libelle</Translate>
              </dt>
              <dd style={idValueStyle}>{plantageEntity.planteLibelle ? plantageEntity.planteLibelle.id : ''}</dd>
              <dt style={idLabelStyle}>
                <Translate contentKey="appFermeApp.plantage.parcelleLibelle">Parcelle Libelle</Translate>
              </dt>
              <dd style={idValueStyle}>{plantageEntity.parcelleLibelle ? plantageEntity.parcelleLibelle.id : ''}</dd>
            </dl>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button tag={Link} to="/plantage" replace color="warning" data-cy="entityDetailsBackButton">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/plantage/${plantageEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PlantageDetail;
