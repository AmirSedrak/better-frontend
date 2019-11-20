import React, { Component } from 'react'
import AppNavbar from './AppNavbar'
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import {Link} from 'react-router-dom'


class EntityList extends Component{

  constructor(props){
    super(props);
    this.state = {entities:[], isLoading: true, type: this.props.type, endpoint: this.props.endpoint};
    this.remove = this.remove.bind(this);
  }

  componentDidMount(){
    this.setState({isLoading: true});
    fetch(`${this.state.endpoint}`)
    .then(response => response.json())
    .then(data => this.setState({entities: data, isLoading: false}))
  }

  async remove(id) {
    await fetch(`${this.state.endpoint}/${id}`,{
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedEntities = [...this.state.entities].filter(i => i.id !== id);
      this.setState({entities: updatedEntities});
    });
  }

  render(){
    const {entities, isLoading} = this.state;

    if(isLoading){
      return <p>Loading...</p>;
    }

    const entityList = entities.map(entity => {
      return <tr key={entity.id}>
        <td>{entity.property1}</td>
        <td>{entity.property2}</td>
        <td>{entity.property3}</td>
        <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={"/"+this.state.type+"/" + entity.id}>Edit</Button>
          <Button size="sm" color="danger" onClick={() => this.remove(entity.id)}>Delete</Button>
        </ButtonGroup>
        </td>
      </tr>
    })

    return <div>
      <Container fluid id={this.props.type}>
        <h3>Spring Entities</h3>
        <Table className="mt-4" id={this.props.type+"-table"}>
          <thead>
          <tr>
            <th>Property 1</th>
            <th>Property 2</th>
            <th>Property 3</th>
          </tr>
          </thead>
          <tbody>
          {entityList}
          </tbody>
        </Table>
        <div className="float-right">
          <Button color="success" tag={Link} to={"/"+this.state.type+"/new"}>Add Entity</Button>
        </div>
      </Container>
    </div>
  }
}

export default EntityList;
