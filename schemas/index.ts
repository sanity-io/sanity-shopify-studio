// Rich text annotations used in the block content editor
import {annotations} from './annotations'

// Document types
import {documents} from './documents'

// Singleton document types
import {singletons} from './singletons'

// Block content
import body from './blocks/body'

const blocks = [body]

// Object types
import {objects} from './objects'

export const schemaTypes = [...annotations, ...singletons, ...objects, ...blocks, ...documents]
