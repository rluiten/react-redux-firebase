import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as allArticleActions from '../actions/articles';
import Article from './Article';
import RenderInput from './RenderInput';

class Articles extends Component {
	constructor() {
		super();
		this.renderInterface = this.renderInterface.bind(this);
		this.renderArticle = this.renderArticle.bind(this);
	}
	renderInterface(rows) {
		const { articles, uid, submitArticle } = this.props;
		return (
			<div>
				<RenderInput
					{...{
						submitArticle,
						submittingNew: !!articles.submittingNew,
						validated: !!uid,
						submitting: !!articles.submitting,
					}}
				/>
				{articles.errorMessage
					? <p>{articles.errorMessage}</p>
					: rows
				}
			</div>
		);
	}
	renderArticle(qid) {
		const { articles: { data, status }, uid, ...handlers } = this.props;
		return (
			<Article
				key={qid}
				qid={qid}
				article={data[qid]}
				status={status[qid]}
				canEdit={uid === data[qid].uid}
				{...handlers}
			/>
		);
	}
	render() {
		const { articles } = this.props;
		if (articles.hasReceivedData) {
			const keys = Object.keys(articles.data || {});
			const rows = (keys.length === 0)
				? 'There are no articles to display...'
				: keys.map(this.renderArticle);
			return this.renderInterface(rows);
		}
		return this.renderInterface('Loading articles...');
	}
}

Articles.propTypes = {
	articles: React.PropTypes.object.isRequired,
	uid: React.PropTypes.string,
	startArticleEdit: React.PropTypes.func.isRequired,
	cancelArticleEdit: React.PropTypes.func.isRequired,
	submitArticleEdit: React.PropTypes.func.isRequired,
	deleteArticle: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		articles: state.articles,
		uid: state.auth ? state.auth.uid : undefined,
	};
};

// eslint-disable-next-line no-unused-vars
const { listenToArticles, ...restActions } = allArticleActions;
const mapDispatchToProps = { ...restActions };

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
