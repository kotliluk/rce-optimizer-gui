# RCE Optimizer

This project provides a GUI for the Robotic cell energy (RCE) optimizer.
The GUI connects to the optimization server using GraphQL API.

## Project requirements

* [Node.js](https://nodejs.org/en) (developed with the version 16.15.1)
* [Yarn](https://yarnpkg.com/) package manager (developed with the version 1.22.10)

## Project run

The following commands work in Unix OS or in Windows Subsystem for Linux (WSL).

Open a terminal in the project root.

Install dependencies:

`yarn install`

Run the application:

`yarn start`

## Application usage

The application provides a simple interface to define a robotic cell and handle
basic types of definition errors.

On the home page, click the "New cell definition" link to start editing.

On the top of the page, you specify the name of the cell and the cycle time.
If you already have a valid JSON definition of the cell, you can upload it
using the "Load from JSON" button and then edit it. You can type a note about
the cell. All note fields in the definition are optional.

There must always be at least one robot in the cell. The first robot is added
by default. You can add more robots by the "Add robot" button. You can delete
a robot by the cross icon in the top-right corner of the robot form. You can
hide details about the robot by the arrow icon.

Each robot must have a unique ID. Furthermore, each robot must contain at least
one defined activity. There are 3 activities prepared in a robot by default.
You can add more activities by "Add movement" and "Add work" buttons. You can
delete movement and work activities by the cross icon in the top-right corner of
the activity form. Note that "static positions" are automatically added
between neighboring movement/work activities. You can hide details about the
activity by the arrow icon.

Each activity must have an ID which is unique in the whole cell (not only in
a robot). In static positions, you specify the coordinates (in millimeters).
The coordinates around the movement activity must be different (a movement
cannot have a zero length). In movement activities, you specify minimal
and maximal durations (in seconds, can be decimal). Also, you can set the fixed
start time or the fixed end time of the movement. It fixes the start/end time
relative to the cycle start. You cannot specify both (to do so, use a work activity
with a fixed start and given duration). In work activities, you specify a given
duration of the activity. Also, you can specify a fixed start time.

Use movement activities for all movements in the cell which might be optimized
(i.e., PTP movements, their duration might be changed). On the other hand, use work activities
for all activities which must be preserved (i.e., their duration is fixed) -
e.g., welding, preparation movements.

Once you finish definition of robots, use "Check robots" button to check
additional constraints. Any discovered error will be highlighted in the form.
If there is no error, a green "Data OK" text appears on the button.

In the next section of the page, you can specify time offsets between
activities. They are optional and a cell with no offsets is valid. To define
an offset, select ids of actions from the select box. Note that actions in
the select box are updated only when the "Check robots" button is clicked.
Selected activities must be different. In an offset definition, you can specify
minimal offset time, maximal offset time, or both (in seconds). Having selected activities A and B,
and given minimal offset X and maximal offset Y, the offset constraint ensures:
"Start time of A" + X <= "Start time of B" <= "Start time of A" + Y.

In the fourth section of the page, you can specify collisions. A collision is defined
by a pair of activities which must be from different robots. Again, activities in
select boxes are updated only when the "Check robots" button is clicked.
By default, a collision constraint ensures that the duration of the activity A is
distinct from the duration of the activity B, B's predecessor and B's successor.
This constraint might be too strict. You can define a relative part of B's predecessor
and successor to be distinct with the activity A. Having selected activities A and B,
and given B-prev skip ratio X and B-next skip ratio Y, the collision constraint ensures:
"End time of A" <= "Start time of B" + X * "Duration of B's predecessor" and
"Start time of A" >= "End time of B" + Y * "Duration of B's successor".

At the bottom of the page, you can check additional requirements by the "Check all"
button. When every check passes, you can download the definition of the cell as JSON.
If the application is connected to the optimization server, you can send the definition
directly to be optimized.

## Project code

The code of the project is structured as follows:

* `./public/` - HTML page skeleton
* `./src/apollo/` - GraphQL connection to the server
* `./src/assets/` - images and SVG icons
* `./src/components/` - React components
* `./src/logic/` - cross-cutting logic, e.g., translation and local storage
* `./src/pages/` - application pages (main React components for different URL routes)
* `./src/redux/` - application state handled by Redux
* `./src/styles/` - global styles using SCSS
* `./src/types/` - TS type definitions
* `./src/utils/` - util functions
* `./src/App.txs` - application main component
* `./src/index.tsx` - ReactDOM render script with framework providers
