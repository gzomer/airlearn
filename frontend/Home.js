import React, {Component} from 'react';

import {
	Button,
	Text,
	Link,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import homeStyles from './Home.styles.js';
loadCSSFromString(homeStyles)

import Summary from './Summary'

class Footer extends Component {

	render() {
		return (
			<div className="footer">
				<Button className="prevButton" onClick={this.props.onNextClick}> Edit </Button>
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

class Home extends Component {

	state = {}

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
				<Summary />
				<div className="linkWrapper">
					<Link
					    href={'https://'+this.state.domain + ".airlearn.me"}
					    target="_blank"
					  >
					    {'https://'+this.state.domain + ".airlearn.me"}
					  </Link>
				</div>
				<div className="infoChange">
					<Text textColor="light" alignContent="center">Don't forget to click Publish when you finish editing</Text>
				</div>
				<Footer
					footerConfig={this.props.footerConfig}
					publishing={this.props.publishing}
					onPublishClick={this.props.onPublishClick}
					onNextClick={this.props.onNextClick}
					validState={this.props.validState}
					/>
			</div>
		)
	}
}

export default Home
