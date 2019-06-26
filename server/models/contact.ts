import {IContactData} from 'types';

let storage: Contact[] = [];

// Модели замыкают на себя работу с даннымии обычно представляют собой «класс»

class Contact {
    static findAll(): Contact[] {
        return storage;
    }

    static setStorage(newStoreg: Contact[]) {
        storage = newStoreg;
    }

    id: string;
    fio: string;
    email: string;
    tel: string;
    address: string;

    constructor({id, fio, email, address, tel}: IContactData) {
        this.id = id;
        this.fio = fio;
        this.email = email;
        this.address = address;
        this.tel = tel;
    }

    save(): void {
        storage.push(this);
    }
}

export = Contact;
