import { Router } from 'express'

const routes = Router();

routes.get('/claims', (req, res) => {
    res.json({
        what: "what?"
    })
})

export default routes;