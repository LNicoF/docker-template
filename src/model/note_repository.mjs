import mysql from 'mysql'
import { getEnv } from '../lib/envreader.mjs'
import { Note } from './note.mjs'

const TABLE_NAME = 'note'
const FIELDS = {
    ID: 'id',
    CONTENT: 'content',
}

let connection = mysql.createConnection({
    host:     getEnv( 'MYSQL_HOST' ),
    user:     getEnv( 'MYSQL_USER' ),
    password: getEnv( 'MYSQL_PASS' ),
    database: getEnv( 'MYSQL_DB' ),
})

connection.connect( ( err ) => {
    if ( err ) throw err
    console.log( 'MYSQL CONNECTED' )
} )

/**
 * @param { string } id
 * @returns { Note }
 */
export const getNote = async ( id ) => {
    connection.query(
        `SELECT ${ Object.values( FIELDS ) } \
            FROM ${ TABLE_NAME } \
            WHERE ${ FIELDS.ID } = ?`,
        [ id ],
        ( err, res, fields ) => {
            console.log( 'got note', { err, res, fields } )
            if ( err ) throw err ;
        }
    )
}

/**
 * @param { Note } note
 */
export const saveNote = ( note ) => {
    const fields = Object.values( FIELDS )
    const values = fields.map( ( field ) => note[ field ] )
    connection.query(
        `INSERT INTO ${ TABLE_NAME }( ${ fields }) \
            VALUES ( ? ${ ',?'.repeat( fields.length ) } )`,
        values,
        ( err, res, fields ) => {
            console.log( 'saved', { err, res, fields } )
            if ( err ) throw err
        }
    )
}

export default {
    get: getNote,
    save: saveNote
}

