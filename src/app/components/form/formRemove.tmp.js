const content = 'Вы действительно хотите удалить этот тикет??? Это действие необратимо!!!';

const rowT = {
    block: 'div',
    cls: `row row__delete`,
    content,
};

const header = {
    block: 'header',
    cls: 'header',
    content: 'Удалить тикет',
}

// const alertT = {
//     block: 'p',
//     cls: 'remove-alert',
//     content,
// };

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

const formRemoveT = {
    block: 'form',
    cls: 'form form__remove form__active',
    content: [header, rowT, controlsT],
};

export default formRemoveT;