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
	}
	submitNewArticle(e) {
		if (!this.props.articles.submitting) {
			e.preventDefault();
			if (this.refs.newArticle.value) {
				this.props.submitArticle(this.refs.newArticle.value);
			}
			this.refs.newArticle.value = '';
		}
	}
	render() {
		let rows = [];
		const { articles, ...restProps } = this.props;
		if (articles.data) {
			rows = Object.keys(articles.data).map((qid) => {
				const article = articles.data[qid];
				const status = articles.status[qid];
				return (
					<Article
						key={qid}
						qid={qid}
						article={article}
						status={status}
						canEdit={this.props.auth.uid === article.uid}
						{...restProps}
					/>
				);
			});
		}
		const content = this.props.auth.uid
			? <div>
				<form onSubmit={this.submitNewArticle}>
					<input ref="newArticle" placeholder="write something clever!" />
					<button type="submit" disabled={this.props.articles.submittingNew}>
						{this.props.articles.submittingNew ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</div>
			: <p>Log in to add a new article of your own!</p>;
		/* this.props.articles.hasReceivedData ? rows : 'Loading articles...' */
		const rowsOrLoading = this.props.articles.hasReceivedData
			? rows
			: 'Loading articles...';
		return (
			<div>
				{content}
				{this.props.articles.errorMessage
					? <p>{this.props.articles.errorMessage}</p>
					: rowsOrLoading
				}
			</div>
		);
	}
}

Articles.propTypes = {
	articles: React.PropTypes.object.isRequired,
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
