import { VALIDATE } from 'lib/auth';
import { message } from 'antd';
import { get, isEmpty } from 'lodash';

const apiUrl = 'https://api.getmetasurvey.com/api';
const getToken = () => window.localStorage.getItem('token');
const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});
const getHeaders = () => ({
  ...getAuthHeaders(),
  'Content-Type': 'application/json',
});

export const setToken = value =>
  window.localStorage.setItem('token', value);

export const getListOfSurveys = () => {
  return {};
};

export const validateToken = () => fetch(VALIDATE, {
    headers: getAuthHeaders(),
  })
    .then(body => body.json())
    .then(body => {
      const isValid = !isEmpty(get(body, '_id')) && get(body, 'type') !== 'INVALID_TOKEN';
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
    });
};

export const getSurvey = id => {
  return fetch(`${apiUrl}/admin/survey/${id}`, {
    headers: getHeaders(),
  }).then(body => body.json());
};

export const getSurveyStatsPiechart = id => {
  return fetch(`${apiUrl}/admin/stat/${id}/piechart`, {
    headers: getHeaders(),
  }).then(body => body.json());
};

export const getSurveyStatsAnswers = id => {
  return fetch(`${apiUrl}/admin/stat/${id}/table`, {
    headers: getHeaders(),
  }).then(body => body.json());
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

export const saveSurvey = ({ surveyId, title }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ title }),
  }).then(body => {
      message.success('Successfully changed title to "' + title + '".');
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

export const addSurveyQuestion = ({ surveyId, text }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}/question`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ text }),
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
}) => {
  return fetch(
    `${apiUrl}/admin/survey/${surveyId}/question/${questionId}`,
    {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ text }),
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
