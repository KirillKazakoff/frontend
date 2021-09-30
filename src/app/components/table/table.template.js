// eslint-disable-next-line consistent-return
const tableRowTd = ([key, value]) => {
    if (key !== 'id') {
        return {
            block: 'td',
            cls: `td__${key}`,
            content: value,
        };
    }
};

const tableRowT = (note) => ({
    block: 'tr',
    cls: 'table__row',
    content: Object.entries(note).map(tableRowTd),
    attrs: {
        id: note.id,
    },
});

const tableT = (notes) => ({
    block: 'table',
    cls: 'table',
    content: notes.map(tableRowT),
});

export { tableT, tableRowT };
