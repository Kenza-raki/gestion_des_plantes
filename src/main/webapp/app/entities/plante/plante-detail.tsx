import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './plante.reducer';

export const PlanteDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const planteEntity = useAppSelector(state => state.plante.entity);

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
    marginTop: 20,
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
      <h2 data-cy="planteDetailsHeading" style={fermeTitleStyle}>
        <Translate contentKey="appFermeApp.plante.detail.title">Plante</Translate>
      </h2>
      <Row>
        <Col md="6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 50 }}>
          {planteEntity.photo && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={`data:${planteEntity.photoContentType};base64,${planteEntity.photo}`}
                alt="Ferme Photo"
                style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
              />
            </div>
          )}
        </Col>
        <Col md="6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <dl className="jh-entity-details" style={{ textAlign: 'left' }}>
              <dt style={idLabelStyle}>
                <span id="id">
                  <Translate contentKey="global.field.id">ID</Translate>
                </span>
              </dt>
              <dd style={idValueStyle}>{planteEntity.id}</dd>
              <dt style={idLabelStyle}>
                <span id="planteLibelle">
                  <Translate contentKey="appFermeApp.plante.planteLibelle">Plante Libelle</Translate>
                </span>
              </dt>
              <dd style={{ ...idValueStyle, marginBottom: '20px' }}>{planteEntity.planteLibelle}</dd>
              <dt style={idLabelStyle}>
                <span id="racine">
                  <Translate contentKey="appFermeApp.plante.racine">Racine</Translate>
                </span>
              </dt>
              <dd style={idValueStyle}>{planteEntity.racine}</dd>
              <dt style={idLabelStyle}>
                <Translate contentKey="appFermeApp.plante.nom">Nom</Translate>
              </dt>
              <dd style={idValueStyle}>{planteEntity.nom ? planteEntity.nom.id : ''}</dd>
            </dl>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button tag={Link} to="/plante" replace color="warning" data-cy="entityDetailsBackButton">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/plante/${planteEntity.id}/edit`} replace color="primary">
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

export default PlanteDetail;
