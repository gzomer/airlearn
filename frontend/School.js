import React, {Component} from 'react';

import {
	Button,
	FormField,
	Input,
	Label,
	Text,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';

import Footer from './Footer'
import styles from './School.styles.js';

loadCSSFromString(styles)

const THEMES = [
	{
		name : 'Litera'
	},
	{
		name : 'Lumen'
	},
	{
		name : 'Minty'
	},
	{
		name : 'Materia'
	},
	{
		name : 'Pulse'
	},
	{
		name : 'Sandstone'
	},
	{
		name : 'Simplex'
	},
	{
		name : 'Solar'
	},
	{
		name : 'United'
	},
	{
		name : 'Superhero'
	},
	{
		name : 'Yeti'
	},
	{
		name : 'Cerulean'
	},
	{
		name : 'Cosmo'
	},
	{
		name : 'Flatly'
	},
	{
		name : 'Journal'
	}
]

class Theme extends Component {

	render() {
		return (
			<div className="themeCard">
				<div className={'themeCardInner ' + (this.props.theme.active?'active':'')} onClick={(e) => this.props.onSelectTheme(this.props.theme)}>
					{this.props.theme.name && <img src={'https://bootswatch.com/' + this.props.theme.name.toLowerCase() + '/thumbnail.png'}/>}
					<span>{this.props.theme.name}</span>
				</div>
			</div>
		)
	}
}

class ThemeSelector extends Component {
	render() {

		let View = THEMES.map(item => {
			let theme = item
			if (this.props.theme && this.props.theme.name == item.name) {
				theme = {...item, active: true}
			}

			return <Theme key={theme.name} theme={theme} onSelectTheme={this.props.onSelectTheme}/>
		})

		return (<div className="themeWrapper">{View}</div>)
	}
}

class School extends Component {

	state = {
		name: '',
		description: '',
		domain: '',
		theme: ''
	}

	componentDidMount() {
		this.setState({
			'name': globalConfig.get('schoolName') || '',
			'description': globalConfig.get('schoolDescription') || '',
			'domain': globalConfig.get('schoolDomain') || '',
			'theme': globalConfig.get('schoolTheme') || ''
		})

		this.checkValidState()
	}

	componentDidUpdate() {
		this.checkValidState()
	}

	setInputValue(e) {
		let input = {}
		input[e.target.name] = e.target.value
		this.setState(input)
	}

	onSelectTheme(theme) {
		this.setState({
			theme: theme
		})
	}

	checkValidState() {
		let isValid = this.state.name &&
					  this.state.description &&
					  this.state.domain &&
					  this.state.theme

		if (this.props.validState != isValid) {
			this.props.onValidStepChange(isValid)
		}

		if (isValid) {
			globalConfig.setAsync('schoolName', this.state.name)
			globalConfig.setAsync('schoolDescription', this.state.description)
			globalConfig.setAsync('schoolDomain', this.state.domain)
			globalConfig.setAsync('schoolTheme', this.state.theme)
		}
	}

	render() {
		return (
			<div>
				<FormField label="Name">
			      <Input autoComplete="off" name="name" value={this.state.name} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Description">
			      <Input autoComplete="off" name="description" value={this.state.description} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    <FormField label="Domain">
			      <Input autoComplete="off" name="domain" value={this.state.domain} onChange={e => this.setInputValue(e)} />
			    </FormField>
			    {this.state.domain && <div className="domainText">
			    	<Text autoComplete="off">{this.state.domain}.airlearn.me</Text>
			    </div>}

			    <Label>Theme</Label>
			    <ThemeSelector theme={this.state.theme} onSelectTheme={this.onSelectTheme.bind(this)}/>
				<Footer
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

export default School
