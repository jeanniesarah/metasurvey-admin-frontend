import React from 'react';
import { Button } from 'antd';
import logo from './metasurvey_logo-panel.png';
import logout from './logout.png';

const LinkDecorated = props => <a {...props} style={{ borderBottom: '1px dashed #00CCFF' }}>{props.children}</a>;

const HeaderContent = () => {
	return <>
		<div style={{ float: 'left' }}>
			<img src={logo} style={{ width: 182, marginRight: 12 }} />
			{/*<LinkDecorated href={'/'}>0.3.1</LinkDecorated>*/}
		</div>
		<div style={{ float: 'right' }}>
			{/*<LinkDecorated href={'/'}>Startup Name</LinkDecorated>*/}
			<Button
				default
				style={{
					backgroundColor: '#F5F6F8',
					marginLeft: 16,
				}}
				onClick={() => {
					window.localStorage.removeItem('token');
					window.location.reload();
				}}
			>Logout</Button>
		</div>
	</>;
};

export default HeaderContent;