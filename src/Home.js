import React, { Component } from 'react'
import AppNavbar from './AppNavbar'
import EntityList from './EntityList'

class Home extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return <div>
      <AppNavbar />
      <EntityList endpoint={process.env.REACT_APP_SPRING_IND} type="spring-independent" />
      <EntityList endpoint={process.env.REACT_APP_SPRING_DEP} type="spring-dependent"/>
    </div>
  }
}

export default Home
