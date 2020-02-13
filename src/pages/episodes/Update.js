/**
 * @Date:   2020-01-27T12:29:12+00:00
 * @Last modified time: 2020-02-10T19:24:12+00:00
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class EpisodeUpdate extends Component{
  constructor(props){
    super(props);
      this.state = {
        shows: [],
        showId: '',
        name: '',
        episode_length: '',
        description: '',
        season_number: '',
        episode_number: ''
      };
      console.log(props);
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

    const episode = {
      showId: this.state.showId,
      name: this.state.name,
      episode_length: this.state.episode_length,
      description: this.state.description,
      season_number: this.state.season_number,
      episode_number: this.state.episode_number
    }


    const { id } = this.props.match.params;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.put(`http://localhost:4000/episodes/${id}`, episode)

         .then(res => {
           console.log(res.data);
           this.props.history.push("/episodes");
         })
         .catch(err => {
           console.log(err);
           this.props.history.push("/login");
         });
  };

   componentDidMount(){
     const { id } = this.props.match.params;


           fetch('http://localhost:4000/shows')
             .then(res => res.json())
             .then((data) => {
               this.setState({
                 shows: data,
                 showId: data[0]._id
               });
             })
             .catch(console.log);


     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.get(`http://localhost:4000/episodes/${id}`).then((result) => {
       console.log(result);
       this.setState({
         showId: result.data.showId,
         name: result.data.name,
         episode_length: result.data.episode_length,
         description: result.data.description,
         season_number: result.data.season_number,
         episode_number: result.data.episode_number
       });
     });
   }

  render(){
    return(
      <Container>
        <Card className = "topSpace">
          <Card.Body>
          <h3>Add a New Episode</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group as = {Row} controlId="formHorizontalNAME">
              <Form.Label column sm = {2}>
                Name of Episode:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter the name of the episode"
                              name = "name"
                              value = {this.state.name}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalEPISODELENGTH">
              <Form.Label column sm = {2}>
                Total Length of Episode:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter the total length of the episode"
                              name = "episode_length"
                              value = {this.state.episode_length}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalEPISODELENGTH">
              <Form.Label column sm = {2}>
                Description for Episode:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter the description of the episode"
                              name = "description"
                              value = {this.state.description}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalEPISODELENGTH">
              <Form.Label column sm = {2}>
                Season Number:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter the total length of the episode"
                              name = "season_number"
                              value = {this.state.season_number}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalEPISODELENGTH">
              <Form.Label column sm = {2}>
                Episode Number:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter the total length of the episode"
                              name = "episode_number"
                              value = {this.state.episode_number}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Col>
                <Button type = "submit" className = "spaceRight">Save Episode</Button>
                <Link to = "/episodes/"   ><Button className = "addEpisode" type = "submit" variant = "warning">Cancel</Button></Link>
              </Col>
            </Form.Group>
          </Form>
          </Card.Body>
        </Card>
      </Container>
    )
  }

}
