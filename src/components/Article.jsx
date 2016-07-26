import React, { Component } from 'react';
import C from '../constants';

class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
		this.startEdit = this.startEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.deleteArticle = this.deleteArticle.bind(this);
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
	render() {
		let button;
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
			button = '';
		} else if (this.props.status === C.ARTICLE_SUBMITTING) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = (
				<span>
					<button onClick={this.startEdit}>Edit</button>
					<button onClick={this.deleteArticle}>Delete</button>
				</span>
			);
		}
		return (
			<div>
				<span>{`${this.props.article.username} said:`}</span>
				{this.props.article.content} {button}
			</div>
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
