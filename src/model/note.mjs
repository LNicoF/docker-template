'use strict'

import { randomUUID } from "crypto"

export function Note( { content, id } ) {
    this.id = id ?? randomUUID()
    this.content = content
}

export default { Note }
