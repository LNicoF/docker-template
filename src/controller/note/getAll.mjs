import { Note } from "../../model/note.mjs"
import { getNotes } from "../../model/note_repository.mjs";

/**
 * @returns { Promise< Note[] > }
 */
export const execute = async () => {
    const note = await getNotes()
    return note
}

export default { execute }

