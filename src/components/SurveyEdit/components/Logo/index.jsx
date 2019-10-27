import React from 'react';
import { Button } from 'antd';
import logoSrc from './metasurvey.jpg';

const Logo = () => {
  return (
    <div>
      <img
        src={logoSrc}
        style={{ width: 100, height: 100, marginRight: 10 }}
        alt={'Logo'}
      />
      <Button icon="upload" disabled></Button>
    </div>
  );
};

export default Logo;
