import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import Media from 'react-media'
import Menu from './Menu/Menu'
import Addresses from '../pages/Addresses'
import PersonalData from '../pages/PersonalData'
import PaymentData from '../pages/PaymentData'

const AppRouter = () => {

    const mainRoutes = [<Route key="1" path="/addresses" component={Addresses} />,
                        <Route key="2" path="/personal_data" component={PersonalData} />,
                        <Route key="3" path="/payment_data" component={PaymentData} />]

    return (
        <HashRouter>
            <Media query="(max-width: 40em)">
                { matches =>
                    matches ? (
                        <main className="pa6">
                            <Switch>
                                <Route exact path="/" component={Menu}/>
                                {mainRoutes}
                            </Switch>
                        </main>
                    ) : (
                        <div className="flex pl7 pr9 pv9" >
                            <Menu className="mr8" />
                            <main className="flex-auto pt6">
                                <Switch>
                                    {mainRoutes}
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

export default AppRouter
