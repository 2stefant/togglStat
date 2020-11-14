import React from 'react';
// import AppStateComponent from './AppStateComponent';

function HeaderComponent() {

    return (
        <table>
            <thead>
                <tr><td colSpan="1"></td></tr>
                <tr><td colSpan="2"></td></tr>
            </thead>
            <tbody>
                <tr>
                    <td><h2>togglStat</h2></td>
                    {/* <td><AppStateComponent /></td> */}
                </tr>
            </tbody>
        </table>
    );
};

export default HeaderComponent;


