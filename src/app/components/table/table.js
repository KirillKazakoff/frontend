/* eslint-disable no-param-reassign */
import './table.css';
import { tableT, tableRowT } from './table.template';
import { noteTransform } from '../../lib/utils';
import engine from '../../lib/engine/engine';

import XhrHandler from './xhrHandler';
import Form from '../form/form';

export default class Table {
    constructor() {
        this.container = document.querySelector('tbody');
        this.xhr = new XhrHandler();

        this.form = new Form(this.container);
        this.form.node.addEventListener('submit', (e) => this.onFormSubmit(e));

        this.addButton = document.querySelector('.plus-sign');
        this.addButton.addEventListener('click', () => this.form.show());

        this.container.addEventListener('click', (e) => this.onClick(e));
    }

    render(notes) {
        const html = engine(tableT(notes));
        this.container.innerHTML = html;
        this.notes = [...this.container.children];
    }

    onFormSubmit(e) {
        this.form.clearErrors();
        if (this.form.checkSubmit(e)) {
            const note = this.form.getFormData();

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

            const formValues = this.form.getFormData();
            this.xhr.sendRequest('createTicket', {
                ...formValues,
            }).then((note) => {
                const noteTmp = noteTransform(note);
                const newNote = engine(tableRowT(noteTmp));
                this.container.insertAdjacentHTML('beforeend', newNote);

                this.form.clearFields();
            })
        }
    }

    onClick(e) {
        const row = e.target.closest('.table__row');

        if (row) {
            if (e.target.classList.contains('button__edit')) {
                const noteEl = e.target.closest('.table__row');
                this.edited = noteEl;

                const data = this.getNoteData(noteEl);
                this.form.show(data);
                return;
            }

            if (e.target.classList.contains('button__delete')) {
                const noteEl = e.target.closest('.table__row');
                noteEl.remove();

                this.xhr.sendRequest('removeTicket', {
                    id: row.id,
                })
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
        }
    }
}
