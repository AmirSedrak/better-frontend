import React, { Component } from 'react';
import {Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom'

class EntityEdit extends Component{

  emptyItem = {
    id:'',
    property1:'',
    property2:'',
    property3:''
  };

  endpoint = "";

  constructor(props){
    super(props);
    this.state = {item: this.emptyItem,
       endpoint: this.props.match.params.entityType == "spring-dependent" ? "http://localhost:8100/dependentEntity" : "http://localhost:8000/independentEntity"};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount(){
    if(this.props.match.params.id !== 'new') {
      const entity = await(await fetch(`${this.state.endpoint}/${this.props.match.params.id}`)).json();
      this.setState({item: entity});
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

  async handleSubmit(event){
    event.preventDefault();
    const {item} = this.state;
    await fetch(`${this.state.endpoint}`, {
      method: (item.id) ? 'PUT': 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    this.props.history.push('/');
  }

  render(){
    const {item} = this.state;
    const title = <h2>{item.id === "" ? 'Add Entity':'Edit Entity'}</h2>
    return <div>
    <AppNavbar />
    <Container>
      {title}
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="property1">Property 1</Label>
          <Input type="text" name="property1" id="property1" value={item.property1 || ''}
          onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="property2">Property 2</Label>
          <Input type="text" name="property2" id="property2" value={item.property2 || ''}
          onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="property3">Property 3</Label>
          <Input type="text" name="property3" id="property3" value={item.property3 || ''}
          onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Button color="primary" type="submit" id={item.id === "" ? 'add':'save'}>{item.id === "" ? 'Add':'Save'}</Button>{' '}
          <Button color="secondary" tag={Link} to="/" id="cancel">Cancel</Button>
        </FormGroup>
      </Form>
    </Container>
    </div>
  }
}

export default EntityEdit
