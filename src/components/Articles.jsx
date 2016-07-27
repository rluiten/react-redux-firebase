import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle
} from '../actions/articles';
import Article from './Article';

class Articles extends Component {
	constructor(props) {
		super(props);
		this.submitNewArticle = this.submitNewArticle.bind(this);
		this.renderInput = this.renderInput.bind(this);
		this.renderInterface = this.renderInterface.bind(this);
		this.renderArticle = this.renderArticle.bind(this);
	}
	submitNewArticle(e) {
		e.preventDefault();
		if (!this.props.articles.submitting) {
			const newArticle = this.refs.newArticle;
			if (newArticle.value) {
				this.props.submitArticle(newArticle.value);
			}
			newArticle.value = '';
		}
	}
	renderInput(articles) {
		if (this.props.auth.uid) {
			return (
				<div>
					<form onSubmit={this.submitNewArticle}>
						<input ref="newArticle" placeholder="write something clever!" />
						<button type="submit" disabled={articles.submittingNew}>
							{articles.submittingNew ? 'Submitting...' : 'Submit'}
						</button>
					</form>
				</div>
			);
		}
		return <p>Log in to add a new article of your own!</p>;
	}
	renderInterface(articles, rows) {
		return (
			<div>
				{this.renderInput(articles)}
				{articles.errorMessage
					? <p>{articles.errorMessage}</p>
					: rows
				}
			</div>
		);
	}
	renderArticle(qid) {
		const { articles, auth: { uid }, ...handlers } = this.props;
		return (
			<Article
				key={qid}
				qid={qid}
				article={articles.data[qid]}
				status={articles.status[qid]}
				canEdit={uid === articles.data[qid].uid}
				{...handlers}
			/>
		);
	}
	render() {
		const articles = this.props.articles;
		if (articles.hasReceivedData) {
			const keys = Object.keys(articles.data || {});
			const rows = (keys.length === 0)
				? 'There are no articles to display...'
				: keys.map(this.renderArticle);
			return this.renderInterface(articles, rows);
		}
		return this.renderInterface(articles, 'Loading articles...');
	}
}

Articles.propTypes = {
	articles: React.PropTypes.object.isRequired,
	auth: React.PropTypes.object.isRequired,
	startArticleEdit: React.PropTypes.func.isRequired,
	cancelArticleEdit: React.PropTypes.func.isRequired,
	submitArticleEdit: React.PropTypes.func.isRequired,
	deleteArticle: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		articles: state.articles,
		auth: state.auth
	};
};

const mapDispatchToProps = {
	submitArticle,
	startArticleEdit,
	cancelArticleEdit,
	submitArticleEdit,
	deleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
