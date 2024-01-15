import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './plante.reducer';

export const Plante = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const planteList = useAppSelector(state => state.plante.entities);
  const loading = useAppSelector(state => state.plante.loading);

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

  const getSortIconByFieldName = fieldName => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    return sortFieldName !== fieldName ? faSort : order === ASC ? faSortUp : faSortDown;
  };

  const fermePageStyle = {
    background: 'url("/content/images/bg.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    overflow: 'hidden',
  } as React.CSSProperties;

  return (
    <div className="ferme-page" style={fermePageStyle}>
      <h2 id="plante-heading" data-cy="PlanteHeading" style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
        <Translate contentKey="appFermeApp.plante.home.title">Plantes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="warning" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appFermeApp.plante.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/plante/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appFermeApp.plante.home.createLabel">Create new Plante</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive" style={{ height: '80%', overflowY: 'auto', paddingRight: '17px' }}>
        {planteList && planteList.length > 0 ? (
          <Table responsive style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="appFermeApp.plante.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('planteLibelle')}>
                  <Translate contentKey="appFermeApp.plante.planteLibelle">Plante Libelle</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('planteLibelle')} />
                </th>
                <th className="hand" onClick={sort('racine')}>
                  <Translate contentKey="appFermeApp.plante.racine">Racine</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('racine')} />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="appFermeApp.plante.photo">Photo</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('photo')} />
                </th>
                <th>
                  <Translate contentKey="appFermeApp.plante.nom">Plante Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {planteList.map((plante, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Button tag={Link} to={`/plante/${plante.id}`} color="link" size="sm">
                      {plante.id}
                    </Button>
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>{plante.planteLibelle}</td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>{plante.racine}</td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {plante.photo ? (
                      <div>
                        {plante.photoContentType ? (
                          <a onClick={openFile(plante.photoContentType, plante.photo)}>
                            <img
                              src={`data:${plante.photoContentType};base64,${plante.photo}`}
                              alt="Thumbnail"
                              style={{ width: '50px', height: '50px' }}
                            />
                          </a>
                        ) : (
                          <img src={`data:;base64,${plante.photo}`} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                        )}
                      </div>
                    ) : null}
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {plante.nom ? <Link to={`/type-plante/${plante.nom.id}`}>{plante.nom.id}</Link> : ''}
                  </td>
                  <td className="text-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/plante/${plante.id}`} color="warning" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/plante/${plante.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (location.href = `/plante/${plante.id}/delete`)}
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
              <Translate contentKey="appFermeApp.plante.home.notFound">No Plantes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Plante;
