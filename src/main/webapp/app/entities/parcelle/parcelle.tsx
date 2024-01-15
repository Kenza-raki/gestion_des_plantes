import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './parcelle.reducer';

const Parcelle = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const parcelleList = useAppSelector(state => state.parcelle.entities);
  const loading = useAppSelector(state => state.parcelle.loading);

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

  const parcellePageStyle = {
    background: 'url("/content/images/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Set to full viewport height
    overflow: 'hidden', // Hide overflow to prevent scrolling of the background
  } as React.CSSProperties;

  return (
    <div style={parcellePageStyle}>
      <h2 id="parcelle-heading" data-cy="ParcelleHeading" style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
        <Translate contentKey="appFermeApp.parcelle.home.title">Parcelles</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="warning" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appFermeApp.parcelle.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/parcelle/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appFermeApp.parcelle.home.createLabel">Create new Parcelle</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {parcelleList && parcelleList.length > 0 ? (
          <Table responsive style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="appFermeApp.parcelle.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('parcelleLibelle')}>
                  <Translate contentKey="appFermeApp.parcelle.parcelleLibelle">Parcelle Libelle</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('parcelleLibelle')} />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="appFermeApp.parcelle.photo">Photo</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('photo')} />
                </th>
                <th>
                  <Translate contentKey="appFermeApp.parcelle.fermeLibelle">Ferme Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {parcelleList.map((parcelle, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Button tag={Link} to={`/parcelle/${parcelle.id}`} color="link" size="sm">
                      {parcelle.id}
                    </Button>
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>{parcelle.parcelleLibelle}</td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {parcelle.photo ? (
                      <div>
                        {parcelle.photoContentType ? (
                          <a onClick={openFile(parcelle.photoContentType, parcelle.photo)}>
                            <img
                              src={`data:${parcelle.photoContentType};base64,${parcelle.photo}`}
                              alt="Thumbnail"
                              style={{ width: '50px', height: '50px' }}
                            />
                          </a>
                        ) : (
                          <img src={`data:;base64,${parcelle.photo}`} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                        )}
                      </div>
                    ) : null}
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {parcelle.fermeLibelle ? <Link to={`/ferme/${parcelle.fermeLibelle.id}`}>{parcelle.fermeLibelle.id}</Link> : ''}
                  </td>
                  <td className="text-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/parcelle/${parcelle.id}`} color="warning" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/parcelle/${parcelle.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/parcelle/${parcelle.id}/delete`)}
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
              <Translate contentKey="appFermeApp.parcelle.home.notFound">No Parcelles found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Parcelle;
