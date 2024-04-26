import { Language } from './index'


/**
 * App translation.
 */
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
    // errors
    errorRequired: string,
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
      loadFromJSONBtn: string,
    },
    robots: {
      robotsLabel: string,
      addRobotBtn: string,
      checkRobotsBtn: {
        NO: string,
        OK: string,
        ERROR: string,
      },
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
        addMovementBeforeBtn: string,
        changeToMovementActivity: string,
        changeToWorkActivity: string,
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
        errorMinMaxDurationOrder: string,
        errorBothFixedUsedInMovement: string,
        errorNegativeDuration: string,
        errorNegativeFixedTime: string,
        errorMovementWithSamePositions: string,
      },
    },
    timeOffsets: {
      timeOffsetsLabel: string,
      addTimeOffsetBtn: string,
      checkTimeOffsetsBtn: {
        NO: string,
        OK: string,
        ERROR: string,
      },
      timeOffsetLabel: string,
      aId: string,
      bId: string,
      minOffset: string,
      maxOffset: string,
      errorSameIds: string,
      errorMinMaxOffsetsOrder: string,
      errorMinMaxOffsetUndef: string,
    },
    collisions: {
      collisionsLabel: string,
      addCollisionBtn: string,
      checkCollisionsBtn: {
        NO: string,
        OK: string,
        ERROR: string,
      },
      collisionLabel: string,
      aId: string,
      bId: string,
      bPrevSkipRatio: string,
      bNextSkipRatio: string,
      errorSameRobotIds: string,
      errorNegativeSkipRatio: string,
    },
    cellDefControl: {
      checkAll: string,
      createJSON: string,
      downloadJSON: string,
      sendToServer: string,
      errorRobotCheck: string,
      errorTimeOffsetsCheck: string,
      errorCollisionsCheck: string,
      errorActivityOrder: string,
      errorMinDuration: string,
      errorServerOffline: string,
      optimizationOK: string,
      optimizationError: string,
      tableActivityColumn: string,
      tableDurationColumn: string,
      tableStartTimeColumn: string,
      tableEndTimeColumn: string,
    },
  }
}
