import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import Document from 'components/Document/Document';
import { apiFetch, hydrateWrapper } from 'utilities';

require('./search.scss');

const propTypes = {
	loginData: PropTypes.object.isRequired,
	locationData: PropTypes.object.isRequired,
	searchData: PropTypes.object.isRequired,
};

class Search extends Component {
	static fetchResults(searchData) {
		return apiFetch('/api/search', {
			method: 'POST',
			body: JSON.stringify(searchData)
		});
	}

	constructor(props) {
		super(props);
		this.state = { result: null };
	}

	componentDidMount() {
		Search.fetchResults(this.props.searchData).then(result => this.setState({ result }));
	}

	renderResults() {
		const { result } = this.state;
		if (result === null) {
			return null;
		}
		if (result.total === 0) {
			return <p>No results found</p>;
		}
		return (
			<ol>
				{result.hits.map(hit => <li><Document id={hit._id} {...hit._source} /></li>)}
			</ol>
		);
	}

	render() {
		return (
			<div id="search-container">
				<PageWrapper
					loginData={this.props.loginData}
					locationData={this.props.locationData}
					hideFooter={true}
				>
					<div className="container">
						<div className="row">
							<div className="col-12">
								<h1>Search</h1>
								{JSON.stringify(this.props.searchData)}
								{this.renderResults()}
							</div>
						</div>
					</div>
				</PageWrapper>
			</div>
		);
	}
}

Search.propTypes = propTypes;
export default Search;

hydrateWrapper(Search);
