import { EN } from './en'
import { CS } from './cs'
import { Translation } from './translation'


export type Language = 'EN' | 'CS'

export const isValidLanguage = (value: any): boolean => {
  return value === 'EN' || value === 'CS'
}

export const getTranslation = (lang: Language): Translation => {
  switch (lang) {
    case 'EN':
      return EN
    case 'CS':
      return CS
  }
}

export const getAllTranslations = (): Translation[] => {
  return [EN, CS]
}
