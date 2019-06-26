import React, { Component } from 'react';

import {IContactData} from 'types';

import './index.css';

interface IContactProps {
    contacts: IContactData[];
    delContact(id: string): void;
}

export default class Contact extends Component<IContactProps> {

    render() {
        const { contacts } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>ФИО</td>
                        <td>E-mail</td>
                        <td>Адрес</td>
                        <td>Телефон</td>
                        <td>Действие</td>
                    </tr>
                </thead>
                <tbody>
                {contacts.map((contact: IContactData) => {
                    return (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.fio}</td>
                            <td>{contact.email}</td>
                            <td>{contact.address}</td>
                            <td>{contact.tel}</td>
                            <td className="action">
                                <button onClick={() => this.props.delContact(contact.id)}>Удалить</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        );
    }
}
