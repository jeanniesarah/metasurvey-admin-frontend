import React from 'react';
import {Button, Icon, Modal, Popconfirm} from 'antd';
import logo from './metasurvey_logo-panel.png';
import logout from './logout.png';
import styles from './styles.module.css';
import {cancelUserSubscription, getUserData, upgradeUserToPro} from "../../../lib/api";

const LinkDecorated = props => <a {...props} style={{ borderBottom: '1px dashed #00CCFF' }}>{props.children}</a>;

const HeaderContent = () => {
	const [user, setUserData] = React.useState(undefined);
	const [upgradeModalVisible, setUpgradeModalVisible] = React.useState(false);


	if(!user){
		getUserData()
			.then(setUserData)
			.catch(() => console.log('Error to load user data.'));
	}

	function confirmCancelPlan(e) {
		if(user && user.email){
			cancelUserSubscription(user)
		}
	}

	function upgrade() {
		window.Paddle.Checkout.open({
			product: 578186,
			successCallback: function (data) {
				upgradeUserToPro(user);
				setUpgradeModalVisible(false);
				setTimeout(() => {
					window.location.reload(false);
				}, 3000);
			},
			coupon: 'PHPRO50',
			email: user.email
		});
	}

	return <>
		<div style={{ float: 'left' }}>
			<a href="/admin/surveys"><img src={logo} style={{ width: 182, marginRight: 12 }} /></a>
			{/*<LinkDecorated href={'/'}>0.3.1</LinkDecorated>*/}
		</div>
		<div style={{ float: 'right' }}>
			{/*<LinkDecorated href={'/'}>Startup Name</LinkDecorated>*/}
			{/*{true && <Button*/}
			{user && user.isPro === false && <Button
				onClick={() => {
					setUpgradeModalVisible(true)
				}
				}
				type="primary">Upgrade</Button>}

			{user && user.isPro &&
			<Popconfirm
				title="Are you sure you want to cancel your subscription? Your extra surveys will become frozen."
				onConfirm={confirmCancelPlan}
				okText="Cancel"
				cancelText="Stay"
			>
				<Button
					onClick={() => {

					}
					}
					type="default">Cancel plan</Button>
			</Popconfirm>}

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
			<Modal
				title="Upgrade your plan"
				visible={upgradeModalVisible}
				width={800}
				footer={null}
				onCancel={() => {
					setUpgradeModalVisible(false)}
				}
			>
				<div className={styles.plans}>
					<div className={styles.plan}>
						<div className={styles.plan__card}>
							<h2>Free</h2>
							<span className={styles.plan__card_info}>Good for testing.</span>
							<div className={styles.plan__price_wrapper}>
								<div className={styles.plan__price_box}>
									<div className={styles.plan__currency}>$</div>
									<div className={styles.plan__price}>
										0
									</div>
									<div className={styles.plan__period}>/month</div>
								</div>
							</div>
							<span className={styles.plan__card_text}>Fine to try the tool an basic projects.</span>
							<div className={styles.plan__cta_box}>
								<div className={styles.plan__current}>Current Plan</div>

							</div>
						</div>
						<ul className={styles.plan__features_list}>
							{/*<li className={styles.plan__feature}>*/}
							{/*<Icon theme="filled" className={styles.plan__feature_icon} type="check-circle" style={{color: "green"}} /> */}
							{/*</li>*/}
							<li className={styles.plan__feature}>
								<Icon theme="filled" className={styles.plan__feature_icon} type="close-circle" style={{color: "red"}} /> MetaSurvey Branding
							</li>
							<li className={styles.plan__feature}>
								<Icon theme="filled" className={styles.plan__feature_icon} type="close-circle" style={{color: "red"}} /> 1 survey
							</li>
						</ul>
					</div>
					<div className={styles.plan}>
						<div className={styles.plan__card_focus}>
							<h2>Pro</h2>
							<span className={styles.plan__card_info}>Professional plan.</span>
							<div className={styles.plan__price_wrapper}>
								<div className={styles.plan__price_box}>
									<div className={styles.plan__currency}>$</div>
						            <span>
			                            <span className={styles.plan__price_striked}>8</span>
			                            <span className={styles.plan__price_actual}>4</span>
			                        </span>
									<div className={styles.plan__period}>/month</div>
								</div>
							</div>
							<span className={styles.plan__card_text}>For founders, marketeers and designers.</span>
							<div className={styles.plan__cta_box}>
								<Button onClick={() => {
									upgrade();
								}
								} type="primary">Upgrade</Button>
							</div>
						</div>
						<ul className={styles.plan__features_list}>
							<li className={styles.plan__feature}>
								<Icon theme="filled" className={styles.plan__feature_icon} type="check-circle" style={{color: "green"}} /> White label
							</li>
							<li className={styles.plan__feature}>
								<Icon theme="filled" className={styles.plan__feature_icon} type="check-circle" style={{color: "green"}} /> Unlimited surveys
							</li>
						</ul>
					</div>
				</div>
			</Modal>
		</div>
	</>;
};

export default HeaderContent;