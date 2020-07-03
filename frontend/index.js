import {
	initializeBlock,
	Heading
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import React, {Component} from 'react';

import Wizard from './Wizard'

const tableConfigs = [
	{
		"title" : "Configuring your Learning academy",
		"type": "school",
	},
	{
		"type": "table",
		"title" : "Configure Courses table",
		"subtitle" : "",
		"table" : "Courses",
		"fields" : [
			{ "field": "Name" },
			{ "field": "Description" },
			{ "field": "Lessons" }
		]
	},
	{
		"type": "table",
		"title" : "Configure Lessons table",
		"subtitle" : "",
		"table" : "Lessons",
		"fields" : [
			{ "field": "Name" },
			{ "field": "VideoURL" },
			{ "field": "Description" },
			{ "field": "Attachments" }
		]
	},
	{
		"type": "table",
		"title" : "Configure Students table",
		"subtitle" : "",
		"table" : "Students",
		"fields" : [
			{ "field": "Name" },
			{ "field": "Email" },
			{ "field": "Courses" }
		]
	},
	{
		"type": "table",
		"title" : "Configure Assignments table",
		"subtitle" : "",
		"table" : "Assignments",
		"fields" : [
			{ "field": "Student" },
			{ "field": "Lesson" },
			{ "field": "Attachments" }
		]
	},
	{
		"type" : "apikey",
		"title" : "Airtable API Key",
		"subtitle" : "We need your API Key to allow students to submit assignments"
	}
]

const wizardConfigIntro = {
	"steps" : [
		{
			"title" : "Let's create your Learning academy",
			"type": "intro",
		},
		...tableConfigs,
		{
			"type": "publish",
			"title" : "Review and Publish",
			"subtitle" : ""
		}
	]
}

const wizardConfigHome = {
	"steps" : [
		{
			"title" : "Welcome",
			"type": "home",
		},
		...tableConfigs
	]
}

class App extends Component {

	state = {
		wizardConfig : wizardConfigIntro
	}

	componentDidMount() {
		//globalConfig.setAsync('schoolPublished', false)
		this.updateWizard()
	}

	updateWizard() {
		if (globalConfig.get('schoolPublished')) {
			let newConfig = {...wizardConfigHome}
			newConfig.steps[0].title = 'Welcome, ' + globalConfig.get('schoolName')

			this.setState({
				'wizardConfig': newConfig
			})
		} else {
			this.setState({
				'wizardConfig': wizardConfigIntro
			})
		}
	}

	onFinishPublishing() {
		this.updateWizard()
	}

	render() {
		return <Wizard onFinishPublishing={this.onFinishPublishing.bind(this)} config={this.state.wizardConfig} />
	}
}

initializeBlock(() => <App/>);
