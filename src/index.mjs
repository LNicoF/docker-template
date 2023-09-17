import http from 'http'
import router from './lib/router.mjs'
import { parseTemplate } from './lib/templates.mjs'
import addNoteController from './controller/note/add.mjs'
import getNoteController from './controller/note/get.mjs'
import getNotesController from './controller/note/getAll.mjs'
import { getEnv } from './lib/envreader.mjs'

router.addGetRoute( '/', async ( _, res ) => {
    res.setHeader( 'Content-Type', 'text/html' )
    res.end( await parseTemplate( 'pub/index.html' ) )
} )

router.addGetRoute( '/note/get', async ( _, res, params ) => {
    const note = await getNoteController.execute( params )
    res.setHeader( 'Content-Type', 'application/json' )
    res.end( JSON.stringify( note ) )
} )

router.addGetRoute( '/note/getall', async ( _, res, params ) => {
    const notes = await getNotesController.execute( params )
    res.setHeader( 'Content-Type', 'application/json' )
    res.end( JSON.stringify( notes ) )
} )

router.addPostRoute( '/note/add', ( _, res, params ) => {
    const note = addNoteController.execute( params )
    res.setHeader( 'Content-Type', 'application/json' )
    res.end( JSON.stringify( note ) )
} )

let server = http.createServer( ( req, res ) => {
    router.run( req, res )
} )

const host = getEnv( 'HOST' )
const port = getEnv( 'PORT' )
server.listen( port, () => {
    console.log( `listenging on http://${ host }:${ port }/` )
} )
