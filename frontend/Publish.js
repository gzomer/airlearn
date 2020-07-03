import React, {Component} from 'react';

import {
	Button,
	Text,
	Link,
	Heading,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import Summary from './Summary.js'
import FetchData from './FetchData.js'
import API from './API.js'


import footerStyles from './Footer.styles.js';
import publishStyles from './Publish.styles.js';
loadCSSFromString(footerStyles)
loadCSSFromString(publishStyles)

class FooterPublish extends Component {

	render() {
		return (
			<div className="footer">
				<Button className="prevButton" onClick={this.props.onPreviousClick}> Previous </Button>
				<Button
						disabled={!this.props.validState || this.props.publishing}
						className="publishButton"
						variant="primary"
						onClick={this.props.onPublishClick}>
							{this.props.publishing && 'Publishing...'}
							{!this.props.publishing && 'Publish'}
					</Button>
			</div>
		)
	}
}

class Publish extends Component {

	fetchData = new FetchData()

	state = {
	}

	componentDidMount(){
		this.checkValidState()

		this.setState({
			'name': globalConfig.get('schoolName') || '',
			'description': globalConfig.get('schoolDescription') || '',
			'domain': globalConfig.get('schoolDomain') || '',
			'theme': globalConfig.get('schoolTheme') || ''
		})
	}

	componentDidUpdate(){
		this.checkValidState()
	}

	checkValidState() {
		if (!this.props.validState) {
			this.props.onValidStepChange(true)
		}
	}

	render() {
		return (
			<div>
				<div className="summaryInfo">
					<Heading variant="caps" className="headingWrapper">
						{this.state.name}
					</Heading>
					<Text>
						{this.state.description}
					</Text>
					<div className="linkWrapper">
						<Link
						    href={'https://'+this.state.domain + ".airlearn.me"}
						    target="_blank"
						  >
						    {'https://'+this.state.domain + ".airlearn.me"}
						  </Link>
					</div>
				</div>
				<Summary />
				<FooterPublish
					footerConfig={this.props.footerConfig}
					publishing={this.props.publishing}
					onPublishClick={this.props.onPublishClick}
					onNextClick={this.props.onNextClick}
					onPreviousClick={this.props.onPreviousClick}
					validState={this.props.validState}
					/>
			</div>
		)
	}
}


export default Publish