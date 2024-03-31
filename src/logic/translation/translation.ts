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
  }
}
