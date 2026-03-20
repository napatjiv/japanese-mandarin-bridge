import n5 from './n5.json'
import n4 from './n4.json'
import n3 from './n3.json'
import n2 from './n2.json'
import n1 from './n1.json'

const vocabByLevel = { n5, n4, n3, n2, n1 }

export const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']

export function getVocab(level) {
  return vocabByLevel[level] || []
}

export const LEVEL_CONFIG = {
  n5: { label: 'N5', subtitle: 'Beginner', description: 'Basic everyday vocabulary', color: 'green' },
  n4: { label: 'N4', subtitle: 'Elementary', description: 'Simple daily conversations', color: 'lime' },
  n3: { label: 'N3', subtitle: 'Intermediate', description: 'Common written & spoken Japanese', color: 'yellow' },
  n2: { label: 'N2', subtitle: 'Upper Intermediate', description: 'Complex texts & conversations', color: 'orange' },
  n1: { label: 'N1', subtitle: 'Advanced', description: 'Professional & academic Japanese', color: 'red' },
}
