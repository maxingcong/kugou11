import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Header from '@/Components/Header/headerindex.jsx'
import Kind from '@/Components/Kind/kindindex.jsx'   
import Cart from '@/Components/Cart/cartindex.jsx'
import  User from '@/Components/User/userindex.jsx'
import  Home from '@/Components/Home/homeindex.jsx'
// import  MVweb from '@/Components/MVweb/index.jsx'
// import  Footer from '@/Components/Footer/footerindex.jsx/'//引入底部组件

class App extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
					
		}
    };
    
    render () {
        return (

            <div className='coutainer'>
                <Header/> 
                <Switch>
                    <Route path="/kind" component = {Kind} />
                    <Route path="/cart" component = {Cart} />
                    <Route path="/user" component = {User} />
                    <Route path="/kind" component = {Kind} />
                    <Route path="/home" component = {Home} />
                    <Redirect to={{pathname: '/home'}} /> 
                </Switch>
            </div>
        )
    }
}

export default App