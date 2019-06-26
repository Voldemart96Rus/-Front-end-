import React, {ChangeEvent, Component} from 'react';

import {IContactData} from 'types';

import './index.css';

interface IFromProps {
    onSumbit(note: IContactData): void;
}

export default class Form extends Component<IFromProps, IContactData> {
    state: IContactData = {
        id: '',
        // tslint:disable-next-line:object-literal-sort-keys
        fio: '',
        email: '',
        tel: '',
        address: ''
    };

    handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({id: event.target.value});
    }

    handleFioChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({fio: event.target.value});
    }

    handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({email: event.target.value});
    }

    handleTelChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({tel: event.target.value});
    }

    handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({address: event.target.value});
    }

    handleSubmit = () => {
        this.props.onSumbit(this.state);
        // После отправки формы очищаем её
        this.setState({
        fio: '',
        // tslint:disable-next-line:object-literal-sort-keys
        email: '',
        tel: '',
        address: ''});
    }

    render() {
        const {fio, email, tel, address} = this.state;

        // Кнопка должна быть активна только тогда, когда оба поля заполненны
        const isButtonDisabled = !fio || !email || !tel || !address;

        return (
            <div className="form">
                <input placeholder="ФИО" value={fio} onChange={this.handleFioChange} title="Фамилия Имя Отчество"/>
                <input placeholder="E-mail" value={email} onChange={this.handleEmailChange}/>
                <input placeholder="Телефон" value={tel} onChange={this.handleTelChange}/>
                <input placeholder="Адрес" value={address} onChange={this.handleAddressChange}/>
                <button disabled={isButtonDisabled} type="submit" onClick={this.handleSubmit}>
                    Добавить контакта!
                </button>
            </div>
        );
    }
}
