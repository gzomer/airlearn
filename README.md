## AirLearn - Easily build online courses
Learning Management System (LMS) powered by AirTable

## Inspiration

Education was severely disrupted by Covid-19, both for students and institutions.

Schools and training centres are unable to provide their services because of social distancing and it is really difficult for them to go online, as most of them don't have experience in creating online courses.

So what if schools and training centres could easily put their courses online, even without any experience?

Well, that's what AirLearn is for.

## What it does
AirLearn is a Learning Management System (LMS) powered by AirTable.

It allows schools and training courses to easily create and publish online courses. Students can watch videos, read materials and submit assignments. And the best part: all data is stored in AirTable, which can be easily customised for each school-specific demands.

Implemented features
- Setup wizard
- Configure themes
- Configure name and description
- Configure table for Courses
- Configure table for Lessons
- Configure table for Students
- Configure table for Assignments
- Automatically select fields and table based on the name
- Publish LMS
- View summary of LMS
- Allow to edit and republish LMS
- Register student
- Login student
- List courses by student
- List lessons by course
- View lesson videos
- View lesson materials
- Submit assignment
- Send assignment to AirTable base

## How I built it
I have used AirTable blocks for the frontend and Node.JS + Express for the backend. I have also used AirTable API to submit the students' assignments.

List of AirTable UI features used:

- Heading
- Button
- FormField
- Input
- Link
- Text
- Label
- Dialog
- TablePickerSynced
- FieldPickerSynced
- loadCSSFromString
- globalConfig
- useBase
- useRecords

## How to remix this block

1. Create a new base (or you can use an existing base).

2. Create a new block in your base (see [Create a new block](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block),
   selecting "Remix from Github" as your template.

3. From the root of your new block, run `block run`.
