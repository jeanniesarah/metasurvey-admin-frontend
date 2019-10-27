import { VALIDATE } from 'lib/auth';

const apiUrl = 'https://meta-survey-app.herokuapp.com/api';
const getToken = () => window.localStorage.getItem('token');

export const setToken = value =>
  window.localStorage.setItem('token', value);

export const getListOfSurveys = () => {
  return {};
};

export const validateToken = () => {
  return fetch(VALIDATE, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }).then(body => body.json());
};

export const getSurvey = id => {
  return fetch(`${apiUrl}/admin/survey/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }).then(body => body.json());
};

export const getSurveyStatsPiechart = id => {
  return fetch(`${apiUrl}/admin/stat/${id}/piechart`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }).then(body => body.json());
};

export const getSurveyStatsAnswers = id => {
  return fetch(`${apiUrl}/admin/stat/${id}/table`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }).then(body => body.json());
};

export const saveSurvey = ({ surveyId, title }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }).then(body => {
    // console.log('Survey saved to server', surveyId, title);
  });
};

export const deleteSurvey = ({ surveyId }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  }).then(body => {
    // console.log('Survey deleted from server', surveyId);
  });
};

export const addSurveyQuestion = ({ surveyId, text }) => {
  return fetch(`${apiUrl}/admin/survey/${surveyId}/question`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  })
    .then(body => body.json())
    .then(bodyJson => {
      const addedQuestionId = bodyJson._id;
      // console.log('Question added to server', surveyId, text, addedQuestionId);
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
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    }
  ).then(body => {
    // console.log('Question saved to server', surveyId, questionId, text);
    return body.json();
  });
};

export const deleteSurveyQuestion = ({ surveyId, questionId }) => {
  return fetch(
    `${apiUrl}/admin/survey/${surveyId}/question/${questionId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  ).then(body => {
    // console.log('Question deleted from server', questionId);
    return body.json();
  });
};
