const headerT = {
    block: 'header',
    cls: 'header',
    content: '',
}

const rowT = (row) => ({
    block: 'div',
    cls: `row row__${row.cls}`,
    content: [
        {
            block: 'span',
            cls: `title title__${row.cls}`,
            content: row.title,
        },
        {
            block: 'input',
            cls: `input input__${row.cls}`,
            attrs: {
                required: true,
                name: row.name,
                pattern: row.pattern,
            },
        },
    ],
});

const rowGen = () => {
    const rowTemplates = [
        {
            cls: 'desc desc__short',
            title: 'Краткое описание',
            name: 'descShort',
            type: 'text',
            pattern: '.+',
        },
        {
            cls: 'desc desc__long',
            title: 'Подробное описание',
            name: 'descLong',
            type: 'text',
            pattern: '.+',
        },
    ];
    return rowTemplates.map(rowT);
};

const buttonT = (param, title, type) => ({
    block: 'button',
    cls: `controls__button ${param}-button`,
    content: title,
    attrs: { type },
});

const controlsT = {
    block: 'div',
    cls: 'controls',
    content: [buttonT('save', 'Сохранить', 'submit'), buttonT('cancel', 'Отмена', 'button')],
};

const formT = {
    block: 'form',
    cls: 'form form__input form__active',
    content: [headerT, rowGen(), controlsT],
    attrs: {
        novalidate: true,
    },
};

export default formT;
