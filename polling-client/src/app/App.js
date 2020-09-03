import React, {Component} from 'react'
import {Layout} from 'antd'
import AppHeader from "../common/AppHeader"
import 'antd/dist/antd.css'
import {Route} from "react-router-dom";
import Signup from "../user/signup/Signup";
import './App.css'

const {Content} = Layout

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Layout className="app-container">
                <AppHeader currentUser={true} />

                <Content className="app-content">
                    <div className="container">
                        {/*<Switch>*/}
                            <Route exact path="/">
                            </Route>
                            <Route path="/login">

                            </Route>
                            <Route path="/signup" component={Signup} />
                        {/*</Switch>*/}
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default App;