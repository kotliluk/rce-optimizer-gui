import { Translation } from './translation'


export const EN: Translation = {
  language: 'English',
  languageShort: 'EN',
  common: {
    darkTheme: 'Dark theme',
    lightTheme: 'Light theme',
    language: 'Language',
    about: 'About',
    // user actions
    back: 'Back',
    reset: 'Reset',
    // errors
    errorRequired: 'Required field',
  },
  mainPage: {
    title: 'RCE Optimizer',
    cellDefinition: {
      link: 'New cell definition',
      annotation: 'Description of a robotic cell, robots\' movements, and action dependencies for energy optimization.',
    },
  },
  cellDefPage: {
    title: 'New cell definition',
    cellInfo: {
      name: 'Name',
      cycleTime: 'Cycle time',
      note: 'Note',
    },
    robots: {
      robotsLabel: 'Robots',
      addRobotBtn: 'Add robot',
      checkRobotsBtn: 'Check robots',
      robotLabel: 'Robot',
      id: 'Id',
      note: 'Note',
      errorIdEmpty: 'Id cannot be empty',
      errorIdNotUnique: 'Id must be unique among all robots',
      activities: {
        activitiesLabel: 'Activities',
        addMovementBtn: 'Add movement',
        addWorkBtn: 'Add work',
        idleActivityLabel: 'Static position',
        movementActivityLabel: 'Movement',
        workActivityLabel: 'Work',
        changeToMovementActivity: 'Change to Move',
        changeToWorkActivity: 'Change to Work',
        id: 'Id',
        position: 'Position',
        note: 'Note',
        minDuration: 'Min dur.',
        maxDuration: 'Max dur.',
        duration: 'Duration',
        fixedStartTime: 'Fixed start',
        fixedEndTime: 'Fixed end',
        errorIdEmpty: 'Id cannot be empty',
        errorIdNotUnique: 'Id must be unique among all activities',
        errorMinMaxDurationOrder: 'Min duration is less than max duration',
        errorBothFixedUsedInMovement: 'Use "Work" to set both fixed times',
      },
    },
  },
}
