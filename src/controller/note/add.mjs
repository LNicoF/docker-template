import { Note } from "../../model/note.mjs"
import { saveNote } from "../../model/note_repository.mjs";

/**
 * @returns { Note }
 */
export const execute = ( { content } ) => {
    let note = new Note( { content } )
    saveNote( note )
    return note
}

export default { execute }
