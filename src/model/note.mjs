'use strict'

import { randomUUID } from "crypto"

/**
 * @param { { content: string, id: string } }
 */
export function Note( { content, id } ) {
    this.id = id ?? randomUUID()
    this.content = content
}

export default { Note }
