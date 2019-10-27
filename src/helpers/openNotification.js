import { Button, notification } from 'antd';
import React from 'react';

//https://ant.design/components/notification/

export const openNotification = (
  title,
  description,
  buttonText = 'close',
  type = 'info',
  duration = 30,
  icon
) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button
      type="primary"
      size="small"
      onClick={() => notification.close(key)}
    >
      {buttonText}
    </Button>
  );

  let config: any = {
    message: title,
    description: description,
    key,
    placement: 'bottomRight',
    duration: duration,
    btn,
  };

  if (icon !== undefined) {
    config['icon'] = icon;
  }

  const currentNotification = notification[type];
  currentNotification(config);
};
