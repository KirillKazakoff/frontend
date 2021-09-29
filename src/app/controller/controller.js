import Table from '../components/table/table';
import { goToTable } from '../lib/utils';

export default class Controller {
    constructor() {
        window.onload = async () => {
            this.table = new Table();
            const { xhr } = this.table;
            const serverNotes = await xhr.sendRequest('initTable');

            const notes = goToTable(serverNotes);
            this.table.render(notes);
        };
    }
}
