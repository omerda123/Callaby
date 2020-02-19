import React from 'react';

export default function message(props) {
    const { author } = props;
    const {content} = props;

    return (
        <div className={`chat-bubble ${author}`}>{content}</div>
    );
}
