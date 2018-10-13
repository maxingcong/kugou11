import React from 'react'

class User extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {}
    };
    render () {
        return (
            <div className='box'>
              
                <div className='content'>
                    个人中心内容
                </div>
            </div>
        )
    }
}
export default User