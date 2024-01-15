import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './type-plante.reducer';

const TypePlanteDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const typePlanteEntity = useAppSelector(state => state.typePlante.entity);

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
      <h2 data-cy="typePlanteDetailsHeading" style={typePlanteTitleStyle}>
        <Translate contentKey="appFermeApp.typePlante.detail.title">TypePlante</Translate>
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
              <dd style={idValueStyle}>{typePlanteEntity.id}</dd>
              <dt style={idLabelStyle}>
                <span id="nom">
                  <Translate contentKey="appFermeApp.typePlante.nom">Nom</Translate>
                </span>
              </dt>
              <dd style={{ ...idValueStyle, marginBottom: '20px' }}>{typePlanteEntity.nom}</dd>
              {/* Add the humidityMax, humidityMin, and temperature attributes */}
              <dt style={idLabelStyle}>
                <span id="humiditeMax">Humidity Max</span>
              </dt>
              <dd style={idValueStyle}>{typePlanteEntity.humiditeMax}</dd>
              <dt style={idLabelStyle}>
                <span id="humiditeMin">Humidity Min</span>
              </dt>
              <dd style={idValueStyle}>{typePlanteEntity.humiditeMin}</dd>
              <dt style={idLabelStyle}>
                <span id="temperature">Temperature</span>
              </dt>
              <dd style={idValueStyle}>{typePlanteEntity.temperature}</dd>
            </dl>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <Button tag={Link} to="/type-plante" replace color="warning" data-cy="entityDetailsBackButton">
              <FontAwesomeIcon icon="arrow-left" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
            &nbsp;
            <Button tag={Link} to={`/type-plante/${typePlanteEntity.id}/edit`} replace color="primary">
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

export default TypePlanteDetail;
