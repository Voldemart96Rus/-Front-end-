import {Request, Response} from 'express';

import Contact from 'models/contact';

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

export function list(_req: Request, res: Response) {
    const contacts = Contact.findAll();

    res.json(contacts);
}

export function create(req: Request, res: Response) {
    const {id, fio, email, tel, address} = req.body;

    const contact = new Contact({id, fio, email, tel, address});

    contact.save();
    saveInFile();

    res.sendStatus(201);
}

export function deleteContact(req: Request, res: Response) {
    Contact.setStorage(req.body);
    saveInFile(req.body);
    res.sendStatus(201);
}

function saveInFile(storageContacts: Contact[] = Contact.findAll()) {
    const fs = require('fs');
    fs.writeFile("server/mocks/contacts.json", JSON.stringify(storageContacts), (err: any) => {
        if (err) {
            return console.error(err);
        }
    });
}
