import { Note } from "../../model/note.mjs"
import { getNote } from "../../model/note_repository.mjs";

/**
 * @returns { Promise< Note > }
 */
export const execute = async ( { id } ) => {
    const note = await getNote( id )
    return note
}

export default { execute }

