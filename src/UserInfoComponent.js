import React from 'react';

class UserInfoComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="UserInfo">
                <h2>UserInfo</h2>
                <p>
                    <label>{!this.props.userInfo ? "-" : this.props.userInfo.fullname}</label>
                    <label>{!this.props.userInfo ? "-" : this.props.userInfo.email}</label>
                    <label>{!this.props.userInfo ? "-" : this.props.userInfo.timezone}</label>
                    <label>{!this.props.userInfo ? "-" : this.props.userInfo.date_format}</label>
                    <label>{!this.props.userInfo ? "-" : this.props.userInfo.timeofday_format}</label>
                    <label>{this.props.workspaceName}</label>
                </p>
            </div>
        );
    };
};

export default UserInfoComponent;



