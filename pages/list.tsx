import React, {Component, Fragment} from 'react';

import Contact from '../components/contact';
import Form from '../components/form';

import {IContactData} from 'types';

interface IListPageProps {
    contacts: IContactData[];
}

interface IListPageState {
    contacts: IContactData[];
    loading: boolean;
}

export default class IndexPage extends Component<IListPageProps, IListPageState> {
    state: IListPageState = {
        loading: true,
        // tslint:disable-next-line:object-literal-sort-keys
        contacts: []
    };

    componentDidMount() {
        // После того как страница будет отрисована, делаем запрос за всеми доступными заметками
        this.fetchNotes();
    }

    fetchNotes = () => {
        fetch('/api/contacts')
            .then((response) => response.json())
            .then((contacts) => this.setState({loading: false, contacts}));
    }

    handleSubmit = (contact: IContactData) => {
        contact.id = Date.now() + '';
        fetch('/api/contacts', {
            body: JSON.stringify(contact),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(this.fetchNotes);
    }

    delContact = (id: string) => {
        const contacts: IContactData[] = this.state.contacts.filter((contact) => contact.id !== id);
        this.setState({contacts});
        fetch('/api/delContact', {
            body: JSON.stringify(contacts),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then(this.fetchNotes);
    }

    render() {
        const {contacts, loading} = this.state;

        // Если данные еще не получены, сообщаем об этом пользователю
        if (loading) {
            return <p>Loading...</p>;
        }

        return (
            <Fragment>
                <Contact contacts={contacts} delContact={this.delContact}/>
                <Form onSumbit={this.handleSubmit}/>
            </Fragment>
        );
    }
}
