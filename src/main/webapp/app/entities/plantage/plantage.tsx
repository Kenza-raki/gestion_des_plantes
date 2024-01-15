import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './plantage.reducer';

export const Plantage = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const plantageList = useAppSelector(state => state.plantage.entities);
  const loading = useAppSelector(state => state.plantage.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };
  const fermePageStyle = {
    background: 'url("/content/images/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Set to full viewport height
    overflow: 'hidden', // Hide overflow to prevent scrolling of the background
  } as React.CSSProperties;

  return (
    <div className="ferme-page" style={fermePageStyle}>
      <h2 id="plantage-heading" data-cy="PlantageHeading" style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
        <Translate contentKey="appFermeApp.plantage.home.title">Plantages</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="warning" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appFermeApp.plantage.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/plantage/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appFermeApp.plantage.home.createLabel">Create new Plantage</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive" style={{ height: '80%', overflowY: 'auto', paddingRight: '17px' }}>
        {plantageList && plantageList.length > 0 ? (
          <Table responsive style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="appFermeApp.plantage.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="appFermeApp.plantage.date">Date</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                </th>
                <th className="hand" onClick={sort('nombre')}>
                  <Translate contentKey="appFermeApp.plantage.nombre">Nombre</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nombre')} />
                </th>
                <th>
                  <Translate contentKey="appFermeApp.plantage.planteLibelle">Plante Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="appFermeApp.plantage.parcelleLibelle">Parcelle Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {plantageList.map((plantage, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Button tag={Link} to={`/plantage/${plantage.id}`} color="link" size="sm">
                      {plantage.id}
                    </Button>
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {plantage.date ? <TextFormat type="date" value={plantage.date} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>{plantage.nombre}</td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {plantage.planteLibelle ? <Link to={`/plante/${plantage.planteLibelle.id}`}>{plantage.planteLibelle.id}</Link> : ''}
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {plantage.parcelleLibelle ? (
                      <Link to={`/parcelle/${plantage.parcelleLibelle.id}`}>{plantage.parcelleLibelle.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/plantage/${plantage.id}`} color="warning" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/plantage/${plantage.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/plantage/${plantage.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appFermeApp.plantage.home.notFound">No Plantages found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Plantage;
