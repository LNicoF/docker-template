import http from 'http'
import router from './lib/router.mjs'
import { parseTemplate } from './lib/templates.mjs'
import addNoteController from './controller/note/add.mjs'
import getNoteController from './controller/note/get.mjs'

router.addGetRoute( '/', async ( _, res ) => {
    res.end( await parseTemplate( 'pub/index.html' ) )
} )

router.addGetRoute( '/note/get', ( _, res, params ) => {
    const note = getNoteController.execute( params )
    res.setHeader( 'Content-Type', 'application/json' )
    res.end( JSON.stringify( note ) )
} )

router.addPostRoute( '/note/post', ( _, res, params ) => {
    const note = addNoteController.execute( params )
    res.setHeader( 'Content-Type', 'application/json' )
    res.end( JSON.stringify( note ) )
} )

let server = http.createServer( ( req, res ) => {
    router.run( req, res )
} )
