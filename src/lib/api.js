export const getListOfSurveys = () => {
	return {};
};

export const getSurvey = (id) => {
	return Promise.resolve({
		title: 'Dear user, why did you leaved us?',
		showTextarea: true,
		questions: [
			{
				id: 'some_id1',
				text: 'Your UI is shit'
			},
			{
				id: 'some_id_2',
				text: 'Don\'t work for me at all',
			}
		]
	});
};

export const saveSurvey = ({ surveyId, title }) => {
	console.log('Survey saved to server', surveyId, title);
	return Promise.resolve();
};

export const addSurveyQuestion = ({ surveyId, questionId, text }) => {
	console.log('Question added to server', surveyId, questionId, text);
	return Promise.resolve({ id: 'new_id', text });
};

export const updateSurveyQuestion = ({ surveyId, questionId, text }) => {
	console.log('Question saved to server', surveyId, questionId, text);
	return Promise.resolve();
};

export const deleteSurveyQuestion = ({ questionId }) => {
	console.log('Question deleted from server', questionId);
	return Promise.resolve();
};