import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './ferme.reducer';

const FermeDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const fermeEntity = useAppSelector(state => state.ferme.entity);

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
      <h2 data-cy="fermeDetailsHeading" style={fermeTitleStyle}>
        <Translate contentKey="appFermeApp.ferme.detail.title">Ferme</Translate>
      </h2>
      <Row>
        <Col md="6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {fermeEntity.photo && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={`data:${fermeEntity.photoContentType};base64,${fermeEntity.photo}`}
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
              <dd style={idValueStyle}>{fermeEntity.id}</dd>
              <dt style={idLabelStyle}>
                <span id="fermeLibelle">
                  <Translate contentKey="appFermeApp.ferme.fermeLibelle">Ferme Libelle</Translate>
                </span>
              </dt>
              <dd style={{ ...idValueStyle, marginBottom: '20px' }}>{fermeEntity.fermeLibelle}</dd>
            </dl>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button tag={Link} to="/ferme" replace color="warning" data-cy="entityDetailsBackButton" size="sm">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            <Button tag={Link} to={`/ferme/${fermeEntity.id}/edit`} replace color="primary" size="md">
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

export default FermeDetail;
