import React, { Component } from 'react';
import NotificationAlert from 'react-notification-alert';

var options = {};
options = {
    place: 'tl',
    message: (
        <div>
            <div>
                Welcome to <b>Now UI Dashboard React</b> - a beautiful freebie for every web developer.
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 7
}

class Alerts extends Component {
    myFunc(){
        this.refs.notify.notificationAlert(options);
    }
  render() {
    return (
      <div>
          <NotificationAlert ref="notify" zIndex={9999} onClick={() => this.myFunc()} />
        <button ref="myRef" onClick={() => this.myFunc()}>Hey</button>
      </div>
    );
  }
}

export default Alerts;