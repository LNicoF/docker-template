import mysql from 'mysql'
import waitPort from 'wait-port'
import { getEnv } from '../lib/envreader.mjs'
import { Note } from './note.mjs'

const TABLE_NAME = 'note'
const FIELDS = {
    ID: 'id',
    CONTENT: 'content',
}

const connectionData = {
    host:     getEnv( 'MYSQL_HOST' ),
    user:     getEnv( 'MYSQL_USER' ),
    password: getEnv( 'MYSQL_PASS' ),
    database: getEnv( 'MYSQL_DB' ),
}

await waitPort( {
    host: connectionData.host,
    port: 3306,
    timeout: 10000,
    waitForDns: true,
} )

console.log( 'conecting to mysql', connectionData ) ;
let connection = mysql.createConnection( connectionData )

connection.connect( ( err ) => {
    if ( err ) throw err
    console.log( 'mysql connected' )
} )

/**
 * @param { string } id
 * @returns { Promise< Note > }
 */
export const getNote = ( id ) => {
    return new Promise( ( resolve ) => {
        connection.query(
            `SELECT ${ Object.values( FIELDS ) } \
                FROM ${ TABLE_NAME } \
                WHERE ${ FIELDS.ID } = ?`,
            [ id ],
            ( err, res ) => {
                if ( err ) throw err ;

                const note = new Note( res[ 0 ] )
                resolve( note )
            }
        )
    } )
}


/**
 * @returns { Promise< Note[] > }
 */
export const getNotes = () => {
    return new Promise( ( resolve ) => {
        connection.query(
            `SELECT ${ Object.values( FIELDS ) } \
                FROM ${ TABLE_NAME }`,
            ( err, res ) => {
                if ( err ) throw err ;

                let notes = []
                for ( const noteData of res ) {
                    const note = new Note( noteData )
                    notes.push( note )
                }
                resolve( notes )
            }
        )
    } )
}

/**
 * @param { Note } note
 */
export const saveNote = ( note ) => {
    const fields = Object.values( FIELDS )
    const values = fields.map( ( field ) => note[ field ] )
    connection.query(
        `INSERT INTO ${ TABLE_NAME }( ${ fields }) \
            VALUES ( ? ${ ',?'.repeat( values.length - 1 ) } )`,
        values,
        ( err ) => {
            if ( err ) throw err
            console.log( 'note saved', { note } )
        }
    )
}

export default {
    get: getNote,
    save: saveNote
}

