import React from 'react'
// export default function Button(props) {
//     return (
//         <Link to="/user" className='btn' onClick={()=>{console.log('clicked ++++++++')}}><button type="submit" className=''>{props.type==="register"?"Register":"Login"}</button></Link>
        
//     )
// }

// import React, { Component } from 'react'

// export default class Button extends Component {
//     render() {
//         return (
//             <div>
//                 <Link to="/user" className='btn' onClick={()=>{console.log('clicked ++++++++')}}><button type="submit" className=''>{props.type==="register"?"Register":"Login"}</button></Link>
//         )
//     }
// }

class Button extends React.Component {
    
    render(props) {
      return (
        <button type="submit" className='' onClick={ this.props.authorization }>{this.props.type==="register"?"Register":"Login"}</button>
      );
    }
  }
  
export default Button;
