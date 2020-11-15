import React from 'react';

function ListComponent(props) {

    const items = props.items.map((item, ix) => {
        let key=item.id + "_" + item.name + ix;
        return <li key={key}>{item.name}</li>;
    });

    const title=(!props.hideTitle || props.hideTitle===false) 
        ? <h2>{props.title}</h2>
        : <></>;

    return (
        <div className="ListComponent">
            {title}
            <ul>{items}</ul>
        </div>
    );
};

export default ListComponent;



