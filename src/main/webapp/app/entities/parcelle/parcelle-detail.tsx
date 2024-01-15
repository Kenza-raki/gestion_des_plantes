import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './parcelle.reducer';

const ParcelleDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const parcelleEntity = useAppSelector(state => state.parcelle.entity);

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
      <h2 data-cy="parcelleDetailsHeading" style={fermeTitleStyle}>
        <Translate contentKey="appFermeApp.parcelle.detail.title">Parcelle</Translate>
      </h2>
      <Row>
        <Col md="6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {parcelleEntity.photo && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={`data:${parcelleEntity.photoContentType};base64,${parcelleEntity.photo}`}
                alt="Parcelle Photo"
                style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', marginTop: '30px' }}
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
              <dd style={idValueStyle}>{parcelleEntity.id}</dd>
              <dt style={idLabelStyle}>
                <span id="parcelleLibelle">
                  <Translate contentKey="appFermeApp.parcelle.parcelleLibelle">Parcelle Libelle</Translate>
                </span>
              </dt>
              <dd style={{ ...idValueStyle, marginBottom: '20px' }}>{parcelleEntity.parcelleLibelle}</dd>
            </dl>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button tag={Link} to="/parcelle" replace color="warning" data-cy="entityDetailsBackButton" size="sm">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            <Button tag={Link} to={`/parcelle/${parcelleEntity.id}/edit`} replace color="primary" size="md">
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

export default ParcelleDetail;
