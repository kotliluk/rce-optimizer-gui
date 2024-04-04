/**
 * App translation.
 */
import { Language } from './index'


export interface Translation {
  language: string
  languageShort: Language
  common: {
    darkTheme: string,
    lightTheme: string,
    language: string,
    about: string,
    // user actions
    back: string,
    reset: string,
  }
  mainPage: {
    title: string,
    cellDefinition: {
      link: string,
      annotation: string,
    },
  }
  cellDefPage: {
    title: string,
    cellInfo: {
      name: string,
      cycleTime: string,
      note: string,
    },
    robots: {
      robotsLabel: string,
      addRobotBtn: string,
      checkRobotsBtn: string,
      robotLabel: string,
      id: string,
      note: string,
      errorIdEmpty: string,
      errorIdNotUnique: string,
      activities: {
        activitiesLabel: string,
        addMovementBtn: string,
        addWorkBtn: string,
        idleActivityLabel: string,
        movementActivityLabel: string,
        workActivityLabel: string,
        id: string,
        position: string,
        note: string,
        minDuration: string,
        maxDuration: string,
        duration: string,
        fixedStartTime: string,
        fixedEndTime: string,
        errorIdEmpty: string,
        errorIdNotUnique: string,
      },
    },
  }
}
