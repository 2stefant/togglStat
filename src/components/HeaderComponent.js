import React from 'react';
import ConnectionStatusComponent from './ConnectionStatusComponent';

function HeaderComponent() {

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan="1"></th>
                    <th colSpan="2"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><h2>togglStat</h2></td>
                    <td><ConnectionStatusComponent/></td>
                </tr>
            </tbody>
        </table>
    );
};

export default HeaderComponent;


