import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';

import objectToFormData from 'helpers/objectToFormData';
import { openNotification } from 'helpers/openNotification';
import { REG_CONFIRM } from 'lib/auth';

const ConfirmEmail = props => {
  const [isConfirmed, setAccountStatus] = React.useState(false);
  const confirmEmail = () => {
    //    url example: "/rest-auth/registration/account-confirm-email/NTQ:1h9Bk6:FkmihG5Wl0ph6Vy4OBl5-LkmIPs/"
    //    key: "NTQ:1h9Bk6:FkmihG5Wl0ph6Vy4OBl5-LkmIPs"
    let key = window.location.pathname.split('/')[4];
    let valuesToServer = { key: key };

    message.loading('The email confirmation is in process...', 0);

    axios
      .post(REG_CONFIRM, objectToFormData(valuesToServer))
      // .then(response => {
      //   // handle success
      //   // We need to re-fetch user data because it became verified now and we need to update state.
      //   openNotification(
      //     'Success!',
      //     'Your email has been confirmed. Thanks and enjoy!',
      //     'Close',
      //     'success',
      //     5
      //   );
      // })

      .catch(error => {
        // handle error
        console.error(error);
        // openNotification(
        //   'Error occurred!',
        //   'Your email was not activated. Please contact us to activate your account. Really sorry for that 😐',
        //   'Close',
        //   'error',
        //   0
        // );
      })

      .then(response => {
        console.log(response);

        setAccountStatus(response === 200);
        // always executed
        // after we tried to confirm - we always redirect to the home dashboard URL.
        // this.props.emailConfirmationToggleServerResponded(true); // turn off loader status
        message.destroy();
      });
  };

  React.useEffect(() => confirmEmail());

  if (isConfirmed) {
    // TODO:
    return <Redirect to="/" />;
  }

  return <div></div>;
};
// ​
export default ConfirmEmail;
