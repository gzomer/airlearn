import {
	useBase,
	useRecords,
	Heading,
	loadCSSFromString
} from '@airtable/blocks/ui';

import {
	globalConfig
} from '@airtable/blocks';


import React from 'react';

import summaryStyles from './Summary.styles.js';
loadCSSFromString(summaryStyles)

function Summary() {
    const base = useBase()

    const tables = {
    	'courses': base.getTableById(globalConfig.get('config-Courses-Table')),
    	'lessons': base.getTableById(globalConfig.get('config-Lessons-Table')),
    	'students': base.getTableById(globalConfig.get('config-Students-Table'))
    }

    const records = {
    	'courses': useRecords(tables.courses),
    	'lessons': useRecords(tables.lessons),
    	'students': useRecords(tables.students),
    }

    return <div className="tableSummary">
    	<div className="tableSummaryCol">
    		<Heading>{records.courses.length} </Heading>
    		<div>courses </div>
    	</div>
    	<div className="tableSummaryCol">
    		<Heading>{records.lessons.length} </Heading>
    		<div>lessons</div>
    	</div>
    	<div className="tableSummaryCol">
    		<Heading>{records.students.length} </Heading>
    		<div>students</div>
    	</div>
    </div>
}

export default Summary