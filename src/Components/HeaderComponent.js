import React from 'react';
// import AppStateComponent from './AppStateComponent';

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
                    <td><h2>x</h2></td>
                    {/* <td><AppStateComponent /></td> */}
                </tr>
            </tbody>
        </table>
    );
};

export default HeaderComponent;


