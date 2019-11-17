import React from 'react';
import { Button, Menu } from 'antd';
import styles from './styles.module.css';

const FooterContent = () => {
	return <>
		<div style={{float: 'left', height: 32}}>
			<span style={{ lineHeight: '32px' }}>Created by <a href={'/'}>MetaSurvey</a> Team 2019</span>
		</div>
		<div style={{float: 'right'}}>
			<Button
				type={'link'}
				href={'mailto:indiehackersspb@gmail.com'}
				className={styles.buttonHoverHack}
				style={{ color: '#6A6A6A' }}
				>Support</Button>
			<Button
				type={'link'}
				href={'mailto:indiehackersspb@gmail.com'}
				className={styles.buttonHoverHack}
				style={{ color: '#FF3399' }}
				>Report bug</Button>
		</div>
	</>
};

export default FooterContent;