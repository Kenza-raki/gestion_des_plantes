import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './ferme.reducer';

export const Ferme = () => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const fermeList = useAppSelector(state => state.ferme.entities);
  const loading = useAppSelector(state => state.ferme.loading);

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
    return sortFieldName !== fieldName ? faSort : order === ASC ? faSortUp : faSortDown;
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
      <h2 id="ferme-heading" data-cy="FermeHeading" style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>
        <Translate contentKey="appFermeApp.ferme.home.title">Fermes</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="warning" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appFermeApp.ferme.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/ferme/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appFermeApp.ferme.home.createLabel">Create new Ferme</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive" style={{ height: '80%', overflowY: 'auto', paddingRight: '17px' }}>
        {fermeList && fermeList.length > 0 ? (
          <Table responsive style={{ backgroundColor: 'transparent' }}>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="appFermeApp.ferme.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('fermeLibelle')}>
                  <Translate contentKey="appFermeApp.ferme.fermeLibelle">Ferme Libelle</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('fermeLibelle')} />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="appFermeApp.ferme.photo">Photo</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('photo')} />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fermeList.map((ferme, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <Button tag={Link} to={`/ferme/${ferme.id}`} color="link" size="sm">
                      {ferme.id}
                    </Button>
                  </td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>{ferme.fermeLibelle}</td>
                  <td style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    {ferme.photo ? (
                      <div>
                        {ferme.photoContentType ? (
                          <a onClick={openFile(ferme.photoContentType, ferme.photo)}>
                            <img
                              src={`data:${ferme.photoContentType};base64,${ferme.photo}`}
                              alt="Thumbnail"
                              style={{ width: '50px', height: '50px' }}
                            />
                          </a>
                        ) : (
                          <img src={`data:;base64,${ferme.photo}`} alt="Thumbnail" style={{ width: '50px', height: '50px' }} />
                        )}
                      </div>
                    ) : null}
                  </td>
                  <td className="text-end" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/ferme/${ferme.id}`} color="warning" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/ferme/${ferme.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/ferme/${ferme.id}/delete`)}
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
              <Translate contentKey="appFermeApp.ferme.home.notFound">No Fermes found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Ferme;
