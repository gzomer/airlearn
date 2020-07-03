import React, {Component} from 'react';

import {
	Heading,
	Button,
	TablePickerSynced,
	FieldPickerSynced,
	FormField,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	base,
	globalConfig
} from '@airtable/blocks';

import Footer from './Footer.js'

class ConfigureFields extends Component {

	getConfigKeyField(field) {
		return 'config-' + this.props.config.table + '-' + field + '-Field'
	}

	render() {

		const View = this.props.config.fields.map(function(item) {
			return (
				<div key={item.field}>
					<FormField label={ item.field }>
				      <FieldPickerSynced
				      			onChange={this.props.onFieldChange}
				      			table={this.props.table}
				      			globalConfigKey={this.getConfigKeyField(item.field)}/>
				    </FormField>
				</div>
			)
		}.bind(this))

		return (
			<div>
				{View}
			</div>
		)
	}
}

class ConfigurableTable extends Component {

	state = {
		table : null
	}

	componentDidMount() {
		this.updateTable()
	}

	componentDidUpdate() {
		this.updateTable()
	}

	updateTable() {
		const tableId = globalConfig.get(this.getConfigKeyTable())
		const table = base.getTableByIdIfExists(tableId);

		if (this.state && this.state.table && this.state.table.id == tableId || table == null) {
			return
		}

		this.setState({
			table: table
		})
		this.checkValidState(table)
	}


	checkValidState(table) {

		let isValidTable = globalConfig.get(this.getConfigKeyTable())

		if (table) {
			let fieldIds = table.fields.map(field => field.id)

			let isValidFields = this.props.config.fields.filter(function(item) {
				let fieldConfig = globalConfig.get('config-' + this.props.config.table + '-' + item.field + '-Field')
				let configIsFromTable = fieldIds.indexOf(fieldConfig) != -1

				return !configIsFromTable || !fieldConfig
			}.bind(this)).length == 0

			let isValid = isValidFields && isValidTable

			if (this.props.validState != isValid) {
				this.props.onValidStepChange(isValid)
			}
		}
	}

	onFieldChange() {
		this.checkValidState(this.state.table)
	}

	getConfigKeyTable() {
		return 'config-' + this.props.config.table + '-Table'
	}

	render() {
		return (
			<div>
				<FormField label="Select table">
					<TablePickerSynced onChange={this.updateTable.bind(this)} globalConfigKey={this.getConfigKeyTable()}/>
				</FormField>
				{this.state.table && <ConfigureFields
						onFieldChange={this.onFieldChange.bind(this)}
						table={this.state.table}
						config={this.props.config}/>}
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

export default ConfigurableTable;