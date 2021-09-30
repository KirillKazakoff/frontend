import formRemoveT from './formRemove.tmp';
import engine from '../../lib/engine/engine';

export default class FormRemove {
    constructor(target) {
        this.container = document.body;
        this.render();
        this.position(target);
        this.hide();

        this.cancelButton = this.node.querySelector('.cancel-button');
        this.cancelButton.addEventListener('click', () => this.hide());
    }

    render() {
        const html = engine(formRemoveT);
        this.container.insertAdjacentHTML('beforeend', html);

        this.node = this.container.querySelector('.form__remove');
    }

    hide() {
        this.node.classList.remove('form__active');
    }

    removeRow() {
        this.delRow.remove();
        this.delRow = null;
    }

    show(delRow) {
        this.node.classList.add('form__active');
        this.delRow = delRow;
    }

    position(target) {
        const targetCoords = target.getBoundingClientRect();

        this.node.style.left = `${targetCoords.left - 10}px`;
        this.node.style.top = `${targetCoords.top - 110}px`;
    }
}
