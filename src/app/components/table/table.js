/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import './table.css';
import { tableT, tableRowT } from './table.template';
import { noteTransform } from '../../lib/utils';
import engine from '../../lib/engine/engine';

import XhrHandler from './xhrHandler';
import FormInput from '../form/formInput';
import FormRemove from '../form/formRemove';

export default class Table {
    constructor() {
        this.container = document.querySelector('tbody');
        this.xhr = new XhrHandler();

        this.formInput = new FormInput(this.container);
        this.formInput.node.addEventListener('submit', (e) => this.onFormInputSub(e));

        this.formRemove = new FormRemove(this.container);
        this.formRemove.node.addEventListener('submit', (e) => this.onFormRemoveSub(e));

        this.addButton = document.querySelector('.plus-sign');
        this.addButton.addEventListener('click', () => this.formInput.show('Добавить тикет'));

        this.container.addEventListener('click', (e) => this.onClick(e));
    }

    render(notes) {
        const html = engine(tableT(notes));
        this.container.innerHTML = html;
        this.notes = [...this.container.children];
    }

    onFormInputSub(e) {
        this.formInput.clearErrors();
        if (this.formInput.checkSubmit(e)) {
            const note = this.formInput.getFormData();

            if (this.edited) {
                [...this.edited.children].forEach((td) => {
                    const keyTd = td.className.substring(4);

                    Object.entries(note).forEach(([key, value]) => {
                        if (key === keyTd) td.textContent = value;
                    });
                });

                const noteData = this.getNoteData(this.edited);
                this.xhr.sendRequest('updateTicket', {
                    id: this.edited.id,
                    ...noteData,
                });

                this.edited = null;
                return;
            }

            const formValues = this.formInput.getFormData();
            this.xhr.sendRequest('createTicket', {
                ...formValues,
            }).then((n) => {
                const noteTmp = noteTransform(n);
                const newNote = engine(tableRowT(noteTmp));
                this.container.insertAdjacentHTML('beforeend', newNote);

                this.formInput.clearFields();
            });
        }
    }

    onFormRemoveSub(e) {
        e.preventDefault();

        const { delRow } = this.formRemove;
        this.xhr.sendRequest('removeTicket', {
            id: delRow.id,
        });

        this.formRemove.removeRow();
        this.formRemove.hide();
    }

    onClick(e) {
        const row = e.target.closest('.table__row');

        if (row) {
            if (e.target.classList.contains('button__edit')) {
                const noteEl = e.target.closest('.table__row');
                this.edited = noteEl;

                const data = this.getNoteData(noteEl);
                this.formInput.show('Изменить тикет', data);
                return;
            }

            if (e.target.classList.contains('button__delete')) {
                this.formRemove.show(e.target.closest('.table__row'));
                return;
            }

            if (e.target.classList.contains('status')) {
                e.target.classList.toggle('status__checked');

                this.xhr.sendRequest('updateStatus', {
                    ...this.getStatus(e.target, row.id),
                });
                return;
            }

            row.querySelector('.td__descLong').classList.toggle('desc-active');
        }
    }

    getNoteData(noteEl) {
        return [...noteEl.children].reduce((total, td) => {
            const key = td.className.match(/td__([\w-]+)/).pop();
            const value = td.textContent;

            if (key.includes('desc')) total[key] = value;
            return total;
        }, {});
    }

    getStatus(target, id) {
        let status = 'empty';
        if (target.className.includes('checked')) {
            status = 'checked';
        }

        return {
            id, status,
        };
    }
}
