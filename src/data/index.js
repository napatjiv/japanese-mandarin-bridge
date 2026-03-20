export const LEVELS = ['n5', 'n4', 'n3', 'n2', 'n1']

export const LEVEL_CONFIG = {
  n5: { label: 'N5', subtitle: 'Beginner', description: 'Basic everyday vocabulary', color: 'green', wordCount: 200 },
  n4: { label: 'N4', subtitle: 'Elementary', description: 'Simple daily conversations', color: 'lime', wordCount: 205 },
  n3: { label: 'N3', subtitle: 'Intermediate', description: 'Common written & spoken Japanese', color: 'yellow', wordCount: 260 },
  n2: { label: 'N2', subtitle: 'Upper Intermediate', description: 'Complex texts & conversations', color: 'orange', wordCount: 250 },
  n1: { label: 'N1', subtitle: 'Advanced', description: 'Professional & academic Japanese', color: 'red', wordCount: 350 },
}

const loaders = {
  n5: () => import('./n5.json'),
  n4: () => import('./n4.json'),
  n3: () => import('./n3.json'),
  n2: () => import('./n2.json'),
  n1: () => import('./n1.json'),
}

const cache = {}

export async function loadVocab(level) {
  if (cache[level]) return cache[level]
  const loader = loaders[level]
  if (!loader) return []
  const mod = await loader()
  cache[level] = mod.default
  return mod.default
}
