import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Spin } from 'antd';
import { saveSurvey, getSurvey } from '../../lib/api';

const SurveyEdit = () => {
	let { id } = useParams();

	const [title, setTitle] = useState('');
	const [survey, setSurvey] = useState(undefined);

	if (!survey) {
		getSurvey(id)
			.then(survey => {
				setSurvey(survey);
				setTitle(survey.title);
			});

		return <Spin size="large" />
	}


	return <>
		<h2>Survey Edit</h2>

		<Input size="large"
			   placeholder="Title"
			   value={title}
			   onChange={(e) => setTitle(e.target.value)}
			   onBlur={() => saveSurvey({ id, title })}
		/>
	</>;
};

export default SurveyEdit;