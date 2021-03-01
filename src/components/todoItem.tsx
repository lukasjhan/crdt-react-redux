import React from 'react';

interface Props {
    text: string;
    done: boolean;
    onRemove(): void;
}

const TodoItem: React.SFC<Props> = ({text, onRemove}) => (
    <li>
        <b
            style={{
                textDecoration: 'none'
            }}
        >
            {text}
        </b>
        <button style={{all: 'unset' , marginLeft: '0.5rem'}} onClick={onRemove}>[Delete]</button>
    </li>
);

export default TodoItem;