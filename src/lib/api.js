import { VALIDATE } from 'lib/auth';
import { message } from 'antd';
import { get, isEmpty } from 'lodash';
import config from '../config/default';

const apiUrl = config.api.url;
const getToken = () => window.localStorage.getItem('token');
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});
const getHeaders = () => ({
  ...getAuthHeaders(),
  'Content-Type': 'application/json',
});
const handleApiErrors = jsonBody => {
  if (jsonBody && jsonBody.type === 'Error') {
    throw new Error(JSON.stringify(jsonBody));
  }
  return jsonBody;
};

export const setToken = value =>
  window.localStorage.setItem('token', value);

export const getListOfSurveys = () => {
  return {};
};

export const validateToken = () =>
  fetch(VALIDATE, {
    headers: getAuthHeaders(),
  })
    .then(body => body.json())
    .then(body => {
      const isValid =
        !isEmpty(get(body, '_id')) &&
        get(body, 'type') !== 'INVALID_TOKEN';
      return isValid;
    });

export const getSurveysList = () => {
  return fetch(`${apiUrl}/admin/survey`, {
    headers: getHeaders(),
  })
    .then(body => body.json())
    .then(body => {
      if (!Array.isArray(body)) {
        console.warn('Non-array returned', body);
        return [];
      }
      return body;
    })
    .then(handleApiErrors);
};
export const getUserData = () => {
  return fetch(`${apiUrl}/admin/me`, {
    headers: getHeaders(),
  })
    .then(body => body.json())
    .then(handleApiErrors);
};
export const cancelUserSubscription = ({ email }) => {
  return fetch(`${apiUrl}/admin/cancel`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  }).then(body => {
    message.success('Successfully cancelled the subscription.');
    return body.json();
  });
};
export const upgradeUserToPro = ({ email }) => {
  return fetch(`${apiUrl}/admin/upgrade`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  }).then(body => {
    message.success('Successfully upgraded to Pro.');
    return body.json();
  });
};

export const getSurvey = id => {
  return fetch(`${apiUrl}/admin/survey/${id}`, {
    headers: getHeaders(),
  })
    .then(body => body.json())
    .then(handleApiErrors);
};

export const getSurveyStatsPiechart = id => {
  return fetch(`${apiUrl}/admin/stat/${id}/piechart`, {
    headers: getHeaders(),
  })
    .then(body => body.json())
    .then(handleApiErrors);
};

export const getSurveyStatsAnswers = (
  id,
  { page, pageSize, noEmpty } = {}
) => {
  const url = new URL(`${apiUrl}/admin/stat/${id}/table`);
  const params = {
    ...(page !== undefined ? { page } : {}),
    ...(pageSize !== undefined ? { pageSize } : {}),
    ...(noEmpty !== undefined ? { noEmpty } : {}),
  };
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, params[key])
  );
  return fetch(url, {
    headers: getHeaders(),
  })
    .then(body => body.json())
    .then(handleApiErrors);
};

export const addSurvey = ({ title }) => {
  return fetch(`${apiUrl}/admin/survey`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  }).then(body => body.json());
};

export const addSurveyFromTemplate = ({ title, templateId }) => {
  return fetch(`${apiUrl}/admin/templates/clone/${templateId}`, {
    method: 'GET',
    headers: getHeaders(),
  }).then(body => body.json());
};

export const saveSurvey = ({ surveyId, payload }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ ...(payload || {}) }),
  }).then(body => {
    message.success('Successfully saved.');
    /* if (get(payload, 'title')) {
      message.success('Successfully changed title to "' + get(payload, 'title') + '".');
    } */
    // console.log('Survey saved to server', surveyId, title);
  });
};

export const deleteSurvey = ({ surveyId }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(body => {
    // console.log('Survey deleted from server', surveyId);
  });
};

export const addSurveyQuestion = ({ surveyId, text, imageSrc }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}/question`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ text, imageSrc }),
  })
    .then(body => body.json())
    .then(bodyJson => {
      const addedQuestionId = bodyJson._id;
      // console.log('Question added to server', surveyId, text, addedQuestionId);
      message.success('Successfully created a new question.');
      return { ...bodyJson, id: addedQuestionId };
    });
};

export const updateSurveyQuestion = ({
  surveyId,
  questionId,
  text,
  imageSrc,
}) => {
  return fetch(
    `${apiUrl}/admin/survey/${surveyId}/question/${questionId}`,
    {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ text, imageSrc }),
    }
  ).then(body => {
    // console.log('Question saved to server', surveyId, questionId, text);
    message.success('Successfully saved.');
    return body.json();
  });
};

export const deleteSurveyQuestion = ({ surveyId, questionId }) => {
  return fetch(
    `${apiUrl}/admin/survey/${surveyId}/question/${questionId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  ).then(body => {
    // console.log('Question deleted from server', questionId);
    return body.json();
  });
};
