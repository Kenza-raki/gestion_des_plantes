import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="heart" to="/ferme">
        <Translate contentKey="global.menu.entities.ferme" />
      </MenuItem>
      <MenuItem icon="heart" to="/parcelle">
        <Translate contentKey="global.menu.entities.parcelle" />
      </MenuItem>
      <MenuItem icon="heart" to="/plante">
        <Translate contentKey="global.menu.entities.plante" />
      </MenuItem>
      <MenuItem icon="heart" to="/type-plante">
        <Translate contentKey="global.menu.entities.typePlante" />
      </MenuItem>
      <MenuItem icon="heart" to="/plantage">
        <Translate contentKey="global.menu.entities.plantage" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
