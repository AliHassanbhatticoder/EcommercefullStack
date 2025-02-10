import { type SchemaTypeDefinition } from 'sanity'
import { product } from '../data'
import { category } from '../categorydata'
import order from '../order'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,category,order],
}
