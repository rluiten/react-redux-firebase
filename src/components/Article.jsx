import React, { Component } from 'react';
import C from '../constants';

class Article extends Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.startEdit = this.startEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
		this.renderArticle = this.renderArticle.bind(this);
	}
	submit(e) {
		e.preventDefault();
		this.props.submitArticleEdit(this.props.qid, this.refs.article.value);
		this.refs.article.value = '';
	}
	startEdit(e) {
		e.preventDefault();
		this.props.startArticleEdit(this.props.qid);
	}
	cancelEdit(e) {
		e.preventDefault();
		this.props.cancelArticleEdit(this.props.qid);
	}
	deleteArticle(e) {
		e.preventDefault();
		this.props.deleteArticle(this.props.qid);
	}
	renderArticle(button) {
		return (
			<div>
				<span>{`${this.props.article.username} said:`}</span>
				{this.props.article.content} {button}
			</div>
		);
	}
	render() {
		if (this.props.status === C.ARTICLE_EDITING) {
			return (
				<form onSubmit={this.submit}>
					<input ref="article" defaultValue={this.props.article.content} />
					<button type="button" onClick={this.cancelEdit}>Cancel</button>
					<button type="submit" onClick={this.submit}>Submit</button>
				</form>
			);
		}
		if (!this.props.canEdit) {
			return this.renderArticle('');
		}
		if (this.props.status === C.ARTICLE_SUBMITTING) {
			return this.renderArticle(<button disabled="disabled">Submitting...</button>);
		}
		return this.renderArticle(
			<span>
				<button onClick={this.startEdit}>Edit</button>
				<button onClick={this.deleteArticle}>Delete</button>
			</span>
		);
	}
}

Article.propTypes = {
	// key: React.PropTypes.string.isRequired,
	qid: React.PropTypes.string.isRequired,
	article: React.PropTypes.object.isRequired,
	status: React.PropTypes.string,
	canEdit: React.PropTypes.bool.isRequired,
	startArticleEdit: React.PropTypes.func.isRequired,
	cancelArticleEdit: React.PropTypes.func.isRequired,
	submitArticleEdit: React.PropTypes.func.isRequired,
	deleteArticle: React.PropTypes.func.isRequired,
};

export default Article;
