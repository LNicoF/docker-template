import { Note } from "../../model/note.mjs"
import { getNote } from "../../model/note_repository.mjs";

/**
 * @returns { Note }
 */
export const execute = ( { id } ) => {
    const note = getNote( id )
    return note
}

export default { execute }

