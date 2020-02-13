/**
 * @Date:   2020-01-27T12:29:12+00:00
 * @Last modified time: 2020-02-13T14:08:21+00:00
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class ShowCreate extends Component{
  constructor(props){
    super(props);
      this.state = {
        imdb_id: '',
        name: '',
        description: '',
        showRating: ''
      };

  }
  handleInputChange = e => {
    const target = e.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit = e => {
    e.preventDefault();


    const show = {
      imdb_id: this.state.imdb_id,
      name: this.state.name,
      description: this.state.description,
      showRating: this.state.showRating
    }

    console.log(show);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('http://localhost:4000/shows', show)
         .then(res => {
           console.log(res.data);
           this.props.history.push("/shows");
         })
         .catch(err => {
           console.log(err);
           this.props.history.push("/login");
         });
  };


  render(){
    return(
      <Container>
        <Card className = "topSpace">
          <Card.Body>
          <h3>Add a New Show</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group as = {Row} controlId="formHorizontalIMDB">
              <Form.Label column sm = {2}>
                IMDB ID:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter an IMDB ID"
                              name = "imdb_id"
                              value = {this.state.imdb_id}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalNAME">
              <Form.Label column sm = {2}>
                Name:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter a name"
                              name = "name"
                              value = {this.state.name}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalDESCRIPTION">
              <Form.Label column sm = {2}>
                Description:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter a description"
                              name = "description"
                              value = {this.state.description}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalDESCRIPTION">
              <Form.Label column sm = {2}>
                Rating:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter a show rating"
                              name = "showRating"
                              value = {this.state.showRating}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Col>
                <Button type = "submit" className = "spaceRight">Add new Show</Button>
                <Link to = "/shows/"   ><Button className = "addEpisode" type = "submit" variant = "warning">Cancel</Button></Link>
              </Col>
            </Form.Group>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    )
  }

}
