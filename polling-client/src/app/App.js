import React, {Component} from 'react';
import './App.css'
import {Layout} from 'antd'
import AppHeader from "../common/AppHeader";
import "antd/dist/antd.css";

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
            </Layout>
        );
    }
}

export default App;