import React, {Component} from 'react';

import {
	Heading,
	Button,
	Text,
	Dialog,
	loadCSSFromString,
} from '@airtable/blocks/ui';

import {
	base,
	globalConfig
} from '@airtable/blocks';

import wizardStyles from './Wizard.styles.js';
import footerStyles from './Footer.styles.js';
loadCSSFromString(wizardStyles)
loadCSSFromString(footerStyles)

import FetchData from './FetchData.js'
import API from './API.js'

import ConfigurableTable from './ConfigurableTable'
import Publish from './Publish'
import School from './School'
import Intro from './Intro'
import Home from './Home'
import AskKey from './AskKey'

const SCHOOL_API_KEY = 'schoolApiKey'
const AIRTABLE_API_KEY = 'airtableApiKey'

class WizardStep extends Component {
	render() {
		return (
			<div className="wizardStep">
				<Heading>{this.props.config.title}</Heading>
				<Text textColor="light">{this.props.config.subtitle}</Text>

				{this.props.config.type == 'table' &&
					<ConfigurableTable
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						config={this.props.config}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
				{this.props.config.type == 'publish' &&
					<Publish
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						tablesConfig={this.props.tablesConfig}
						config={this.props.config}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
				{this.props.config.type == 'school' &&
					<School
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
				{this.props.config.type == 'intro' &&
					<Intro
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
				{this.props.config.type == 'apikey' &&
					<AskKey
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
				{this.props.config.type == 'home' &&
					<Home
						tablesConfig={this.props.tablesConfig}
						footerConfig={this.props.footerConfig}
						publishing={this.props.publishing}
						validState={this.props.validState}
						onValidStepChange={this.props.onValidStepChange}
						onPublishClick={this.props.onPublishClick}
						onNextClick={this.props.onNextClick}
						onPreviousClick={this.props.onPreviousClick}/>}
			</div>
		)
	}
}

class Wizard extends Component {

	state = {
		currentStep: 0,
		validState : false,
		publishing: false,
		footerConfig: {
			previous: false,
			next: true
		},
		isPublishedDialogOpen : false
	}

	fetchData = new FetchData()
	api = new API()

	componentDidMount() {
		this.setState({
			'tablesConfig' : this.props.config.steps.filter(item => item.type == 'table')
		})

		this.updateWizardButtonsVisibility()
	}

	componentDidUpdate() {
		this.updateWizardButtonsVisibility()
	}

	updateWizardButtonsVisibility() {
		let nextVisible = this.state.currentStep != this.props.config.steps.length - 1
		let previousVisible = this.state.currentStep > 0

		let footerConfig = {...footerConfig, next: nextVisible, previous: previousVisible}

		if (nextVisible != this.state.footerConfig.next || previousVisible != this.state.footerConfig.previous ) {
			this.setState({
				'footerConfig' : footerConfig
			})
		}
	}

	nextStep() {
		if (this.state.currentStep == this.props.config.steps.length - 1) {
			return
		}

		this.setState({
			'currentStep' : this.state.currentStep + 1,
			'validState': false
		})
	}


	previousStep() {
		console.log('Prev')

		if (this.state.currentStep == 0) {
			return
		}

		this.setState({

			'currentStep' : this.state.currentStep - 1
		})
	}

	getConfigKeyTable() {
		return 'config-' + this.props.config.table + '-Table'
	}

	onValidStepChange(valid) {
		this.setState({
			'validState' : valid
		})
	}

	setPublishedDialogOpen(value) {
		this.setState({
			isPublishedDialogOpen : value
		})
	}

	async onPublishClick() {
		await this.publish()
	}

	async publish() {

		this.setState({
			'publishing' : true
		})

		let allData = await this.fetchData.fetchAll(this.state.tablesConfig)
		let fieldsMappings = this.fetchData.getAllFieldMapping(this.state.tablesConfig)

		let apiKey = globalConfig.get(SCHOOL_API_KEY)
		let airtableApiKey = globalConfig.get(AIRTABLE_API_KEY)
		let theme = globalConfig.get('schoolTheme')

		if (theme) {
			theme = theme.name
		}
		let school = {
			'apiKey' : apiKey,
			'airtable' : {
				'apiKey': airtableApiKey,
				'base' : base.id,
				'fieldsMappings' : fieldsMappings
			},
			'data': allData,
			'name': globalConfig.get('schoolName') || '',
			'description': globalConfig.get('schoolDescription') || '',
			'domain': globalConfig.get('schoolDomain') || '',
			'theme': theme
		}
		let result = await this.api.publish(school)

		if (result.apiKey) {
			await globalConfig.setAsync(SCHOOL_API_KEY, result.apiKey)
		}

		await globalConfig.setAsync('schoolPublished', true)
		await globalConfig.setAsync('hasPendingChanges', false)

		this.setState({
			'publishing' : false,
			'currentStep' : 0,
			'validState': false
		})

		this.props.onFinishPublishing()
		this.setPublishedDialogOpen(true)
	}

	render() {
		return (
			<div>
				<WizardStep
					footerConfig={this.state.footerConfig}
					publishing={this.state.publishing}
					tablesConfig={this.state.tablesConfig}
					config={this.props.config.steps[this.state.currentStep]}
					validState={this.state.validState}
					onValidStepChange={this.onValidStepChange.bind(this)}
					onPublishClick={this.onPublishClick.bind(this)}
					onNextClick={this.nextStep.bind(this)}
					onPreviousClick={this.previousStep.bind(this)}
					/>

			      {this.state.isPublishedDialogOpen && (
			        <Dialog onClose={() => this.setPublishedDialogOpen(false)} width="320px">
			          <Dialog.CloseButton />
			          <Heading>Published</Heading>
			          <Text variant="paragraph">
			            Your academy has been published.
			          </Text>
			          <Button onClick={() => this.setPublishedDialogOpen(false)}>Close</Button>
			        </Dialog>
			      )}
			</div>
		)
	}
}

export default Wizard;