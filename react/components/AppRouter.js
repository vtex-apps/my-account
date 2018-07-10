import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import Menu from './Menu/Menu'
import Addresses from '../pages/Addresses'
import PersonalData from '../pages/PersonalData'
import PaymentData from '../pages/PaymentData'


const AppRouter = ({}) => {
    return (
        <HashRouter>
            <Media query="(max-width: 40em)">
                { matches =>
                    matches ? (
                        <main>
                            <Switch>
                                <Route 
                                    exact path="/" 
                                    render={() => <Menu className="mv5 mh6" />} />
                                <Route path="/addresses" component={Addresses} />
                                <Route path="/personal_data" component={PersonalData} />
                                <Route path="/payment_data" component={PaymentData} />
                            </Switch>
                        </main>
                    ) : (
                        <div className="flex ph7 pv9" >
                            <Menu className="mr5" />
                            <main>
                                <Switch>
                                    <Route path="/addresses" component={Addresses} />
                                    <Route path="/personal_data" component={PersonalData} />
                                    <Route path="/payment_data" component={PaymentData} />
                                    <Redirect from="/" to="/addresses" />
                                </Switch>
                            </main>
                        </div>
                    )
                }
            </Media>
        </HashRouter>
    )
}

AppRouter.propTypes = {
    
}

export default AppRouter
