import React from 'react';
import { useParams } from 'react-router-dom';

const SurveyEdit = () => {
	let { id } = useParams();

	return <>
		<h2>Survey Edit</h2>
		<div>{ id }</div>
	</>;
};

export default SurveyEdit;