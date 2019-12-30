import React from 'react';
import {Input, Button, message, Icon, Form} from 'antd';
import styles from './styles.module.css';

const Question = ({ question, style, onUpdate, saveQuestion, onDelete, index, form }) => {
	const { id: questionId } = question;
	const { getFieldDecorator } = form;
	const { Search } = Input;

	const [imageSrc, setImageSrc] = React.useState(question.imageSrc);

	let handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				// console.log('Received values of form: ', values);
				setImageSrc(values.imageSrc);
				saveQuestion({ questionId, text: values.text, imageSrc: values.imageSrc })
			}
		});
	};


	return (
		<div className={styles.question}>
			<div className={styles.question__input}>
				<span className={styles.question__index}>#{index + 1}</span>
				{imageSrc && <img src={imageSrc} className={styles.question__image} alt=""/>}

				<div>
					<Form layout="vertical" onSubmit={handleSubmit}>
						<Form.Item style={{marginBottom: 20}}>
							{getFieldDecorator('text', {
								initialValue: question.text
							})(
								<Input
									prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Question text"
									name="text"
								/>
							)}
						</Form.Item>
						<Form.Item style={{marginBottom: 0}}>
							{getFieldDecorator('imageSrc', {
								initialValue: question.imageSrc
							})(
								<Input
									prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="Image URL (optional)"
									name="imageSrc"
								/>
							)}
						</Form.Item>
						<Form.Item style={{marginBottom: 0}}>
							<Button type="primary" htmlType="submit" className={styles.question__save_button}>
								Save
							</Button>
						</Form.Item>
					</Form>

					{/*<Input*/}
						{/*placeholder="Question text"*/}
						{/*enterButton="Save"*/}
						{/*value={question.text}*/}
						{/*onChange={e => onUpdate({ questionId, text: e.target.value })}*/}
						{/*onSearch={value => saveQuestion({ questionId, text: value })}*/}
						{/*style={!questionId ? { marginRight: 56 } : {}}*/}
					{/*/>*/}

				</div>

			</div>
			{questionId &&
			<Button
				className={styles.question__delete}
				type="danger"
				onClick={() => {
					onDelete({questionId});
					message.success('Successfully removed the question.');
				}}><Icon type="delete" />Delete question</Button>
			}
		</div>
	);
};

export default Form.create({} )(Question);
