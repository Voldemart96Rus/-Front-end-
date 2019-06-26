import {parse} from 'url';

import {Application} from 'express';

import {create, deleteContact, list} from 'controllers/contacts';

export = (app: Application) => {
    app.get('/', (_req, res) => res.renderPage('/list'));
    app.get('/contacts', (_req, res) => res.renderPage('/list'));

    app
        .route('/api/contacts')
        .get(list)
        .post(create);

    app
        .route('/api/delContact')
        .get(list)
        .post(deleteContact);

    app.all('*', (req, res) => {
        const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
};
