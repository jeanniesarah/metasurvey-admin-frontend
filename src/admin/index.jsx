import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import SurveysList from './components/SurveysList';
import SurveyEdit from './components/SurveyEdit';

function Admin() {
	return <>
		<Route path="/admin/surveys">
			<SurveysList />
		</Route>
		<Route path="/admin/survey/:id">
			<SurveyEdit />
		</Route>
	</>
}

export default Admin;
