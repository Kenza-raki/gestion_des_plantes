import './home.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { useAppSelector } from 'app/config/store';

const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <video autoPlay muted loop>
        <source src="/content/images/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Link to="/login" style={{ position: 'fixed', bottom: '100px', right: '190px', fontSize: '20px', color: '#fff' }}>
        <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
      </Link>

      {account?.login ? <div className="transparent-container">{}</div> : null}
    </>
  );
};

export default Home;
