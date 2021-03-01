import React from 'react';

interface Props {
    text: string;
    onRemove(): void;
}

const TodoItem: React.SFC<Props> = ({text, onRemove}) => (
    <li>
        <b>
            {text}
        </b>
        <button style={{all: 'unset' , marginLeft: '0.5rem'}} onClick={onRemove}>[Delete]</button>
    </li>
);

export default TodoItem;