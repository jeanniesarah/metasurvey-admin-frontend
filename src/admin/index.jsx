import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import HeaderContent from './components/HeaderContent';
import FooterContent from './components/FooterContent';

// Pages below
import SurveysList from './components/SurveysList';
import SurveyEdit from './components/SurveyEdit';
import styles from './styles.module.css';

const { Header, Content, Footer } = Layout;

function Admin() {
	return <Layout>
		<Header className={styles.header}>
			<HeaderContent/>
		</Header>
		<Content className={styles.content}>
			<Route path="/admin/surveys">
				<SurveysList />
			</Route>
			<Route path="/admin/survey/:id">
				<SurveyEdit />
			</Route>
		</Content>
		<Footer className={styles.footer}>
			<FooterContent/>
		</Footer>
	</Layout>
}

export default Admin;
