const apiUrl = 'https://meta-survey-app.herokuapp.com/api';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4MDQxNjQyNDUsImlkIjoiNWRiNDllZDg4ZTY0MmIxZDk1OWUxY2MyIiwiaWF0IjoxNTcyMTgwMjQ1fQ.GBa09_h-Uf5GIq288b5PfVdBqWPFUN-b2_aBT16LTkQ';

export const getListOfSurveys = () => {
	return {};
};

export const getSurvey = (id) => {
	return fetch(`${apiUrl}/admin/survey/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
		.then(body => body.json());

};

export const saveSurvey = ({ surveyId, title }) => {
	return fetch(`${apiUrl}/admin/survey/${surveyId}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title })
	})
		.then(body => {
			// console.log('Survey saved to server', surveyId, title);
		});
};

export const addSurveyQuestion = ({ surveyId, text }) => {
	return fetch(`${apiUrl}/admin/survey/${surveyId}/question`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text })
	})
		.then(body => body.json())
		.then(bodyJson => {
			const addedQuestionId = bodyJson._id;
			// console.log('Question added to server', surveyId, text, addedQuestionId);
			return { ...bodyJson, id: addedQuestionId };
		});
};

export const updateSurveyQuestion = ({ surveyId, questionId, text }) => {
	return fetch(`${apiUrl}/admin/survey/${surveyId}/question/${questionId}`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ text })
	})
		.then(body => {
			// console.log('Question saved to server', surveyId, questionId, text);
			return body.json()
		});
};

export const deleteSurveyQuestion = ({ surveyId, questionId }) => {
	return fetch(`${apiUrl}/admin/survey/${surveyId}/question/${questionId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`
		},
	})
		.then(body => {
			// console.log('Question deleted from server', questionId);
			return body.json()
		});
};