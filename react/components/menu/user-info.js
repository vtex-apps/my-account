import React, { Component } from 'react';
import Plus from '@vtex/styleguide/lib/icon/Plus'

class UserInfo extends Component {
    state = {};
    render() { 
        return ( 
            <div className="flex items-end">
                <div className="mr5 relative">
                    {/* FIXME */}
                    <img className="br-100 w3" src="//www.uriux.com/wp-content/uploads/2017/09/male-placeholder.jpg" />
                    <span className="absolute bottom-0 right-0 blue"><Plus size="20" color="currentColor"/></span>
                </div>
                <div>
                    <div className="f5 fw3 helvetica black-40 mb2">Olá,</div>
                    <div className="f4 fw3 helvetica">Gustavo!</div>
                </div>
            </div>
        );
    }
}
 
export default UserInfo;