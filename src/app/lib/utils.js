// eslint-disable-next-line import/prefer-default-export

export function getRandomInt(min, max) {
    const minInt = Math.ceil(min);
    const maxInt = Math.floor(max);
    return Math.floor(Math.random() * (maxInt - minInt)) + minInt;
}

export const noteTransform = (note) => ({
    status: {
        block: 'div',
        cls: `status status__${note.status}`,
        content: '',
    },
    descShort: note.descShort,
    date: note.created,
    actions: {
        block: 'div',
        cls: 'actions__container',
        content: [
            {
                block: 'div',
                cls: 'table__button button__delete',
            },
            {
                block: 'div',
                cls: 'table__button button__edit',
            },
        ],
    },
    descLong: note.descLong,
    id: note.id,
});

export function goToTable(db) {
    const notes = Object.values(db);
    const resultArr = notes.map(noteTransform);

    return resultArr;
}
