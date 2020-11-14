import React from 'react';

function ListComponent(props) {

    const items = props.items.map((item, ix) => {
        let key=item.id + "_" + item.name + ix;
        return <li key={key}>{item.name}</li>;
    });

    return (
        <div className="ListComponent">
            <h2>{props.title}</h2>
            <ul>{items}</ul>
        </div>
    );
};

export default ListComponent;



