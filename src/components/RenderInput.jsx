import React, { Component } from 'react';

export default class RenderInput extends Component {
	constructor() {
		super();
		this.submitNewArticle = this.submitNewArticle.bind(this);
	}
	submitNewArticle(e) {
		e.preventDefault();
		const props = this.props;
		if (!props.submitting) {
			const newArticle = this.refs.newArticle;
			if (newArticle.value) {
				props.submitArticle(newArticle.value);
			}
			newArticle.value = '';
		}
	}
	render() {
		const props = this.props;
		if (props.validated) {
			return (
				<div>
					<form onSubmit={this.submitNewArticle}>
						<input ref="newArticle" placeholder="write something clever!" />
						<button type="submit" disabled={props.submittingNew}>
							{props.submittingNew ? 'Submitting...' : 'Submit'}
						</button>
					</form>
				</div>
			);
		}
		return <p>Log in to add a new article of your own!</p>;
	}
}

RenderInput.propTypes = {
	submitArticle: React.PropTypes.func.isRequired,
	validated: React.PropTypes.bool.isRequired,
	submittingNew: React.PropTypes.bool.isRequired,
	submitting: React.PropTypes.bool.isRequired,
};
