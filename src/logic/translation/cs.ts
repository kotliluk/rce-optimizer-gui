import { Translation } from './translation'


export const CS: Translation = {
  language: 'Česky',
  languageShort: 'CS',
  common: {
    darkTheme: 'Tmavý motiv',
    lightTheme: 'Světlý motiv',
    language: 'Jazyk',
    about: 'O aplikaci',
    // user actions
    back: 'Zpět',
    reset: 'Reset',
    // errors
    errorRequired: 'Povinné pole',
  },
  mainPage: {
    title: 'RCE Optimizer',
    cellDefinition: {
      link: 'Definice nové buňky',
      annotation: 'Popis robotické buňky, pohybů robotů a návaznosti akcí pro optimalizaci spotřeby',
    },
  },
  cellDefPage: {
    title: 'Definice nové buňky',
    cellInfo: {
      name: 'Název',
      cycleTime: 'Doba taktu',
      note: 'Poznámka',
    },
    robots: {
      robotsLabel: 'Roboty',
      addRobotBtn: 'Přidat robota',
      checkRobotsBtn: 'Kontrola robotů',
      robotLabel: 'Robot',
      id: 'Id',
      note: 'Poznámka',
      errorIdEmpty: 'Id nemůže být prázdné',
      errorIdNotUnique: 'Id musí být jedinečné mezi všemi roboty',
      activities: {
        activitiesLabel: 'Aktivity',
        addMovementBtn: 'Přidat pohyb',
        addWorkBtn: 'Přidat práci',
        idleActivityLabel: 'Statická pozice',
        movementActivityLabel: 'Pohyb',
        workActivityLabel: 'Práce',
        changeToMovementActivity: 'Změnit na pohyb',
        changeToWorkActivity: 'Změnit na práci',
        id: 'Id',
        position: 'Pozice',
        note: 'Poznámka',
        minDuration: 'Min trvání',
        maxDuration: 'Max trvání',
        duration: 'Trvání',
        fixedStartTime: 'Fixní start',
        fixedEndTime: 'Fixní konec',
        errorIdEmpty: 'Id nemůže být prázdné',
        errorIdNotUnique: 'Id musí být jedinečné mezi všemi aktivitami',
        errorMinMaxDurationOrder: 'Min trvání je větší než maximální trvání',
        errorBothFixedUsedInMovement: 'Použijte "Práci" pro nastavení obou fixních časů',
      },
    },
    timeOffsets: {
      timeOffsetsLabel: 'Časové návaznosti',
      addTimeOffsetBtn: 'Přidat návaznost',
      timeOffsetLabel: 'Časová návaznost',
      aId: 'Aktivita 1',
      bId: 'Aktivita 2',
      minOffset: 'Min čas',
      maxOffset: 'Max čas',
      errorSameIds: 'Aktivity musí být různé',
      errorMinMaxOffsetsOrder: 'Min čas je větší než max čas',
    },
  },
}
