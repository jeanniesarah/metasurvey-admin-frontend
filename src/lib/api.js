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

export const saveSurvey = ({ title }) => {
	console.log('Survey saved to server', title);
};

export const addSurveyQuestion = ({ text }) => {
	console.log('Question added to server', text);
};

export const updateSurveyQuestion = ({ id, text }) => {
	console.log('Question saved to server', id, text);
};