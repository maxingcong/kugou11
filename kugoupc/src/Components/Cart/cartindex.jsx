import React from 'react'
// import axios from 'axios'
class Cart extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
            
        }
    };
    componentDidMount () {
        // fetch ('http://songsearch.kugou.com/song_search_v2?callback=jQuery191034642999175022426_1489023388639&keyword={%E7%94%9C%E7%94%9C%E7%9A%84}&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1489023388641')
        // .then ( (res) => res.json())
        // .then ((data) => {
        //     console.log(data)
        // })
        // axios.get('/kugou/song_search_v2?callback=jQuery191034642999175022426_1489023388639&keyword={%E7%94%9C%E7%94%9C%E7%9A%84}&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_=1489023388641')
        // .then(res =>{
        //     console.log(res)
        // })
    }
    
    render () {
        return (
            <div className='box'>
               
                <div className='content'>
                    购物车内容
                </div>
            </div>
        )
    }
}

export default Cart