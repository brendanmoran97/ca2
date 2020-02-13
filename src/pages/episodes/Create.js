/**
 * @Date:   2020-01-27T12:29:12+00:00
 * @Last modified time: 2020-02-13T16:54:17+00:00
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


export default class EpisodeCreate extends Component{
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

  }
  handleInputChange = e => {
    const target = e.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  showChange(e){
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });

  }


  componentDidMount() {

        fetch('http://localhost:4000/shows')
          .then(res => res.json())
          .then((data) => {
            this.setState({
              shows: data,
              showId: data[0]._id
            });
          })
          .catch(console.log);

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


    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.post('http://localhost:4000/episodes', episode)
         .then(res => {
           this.props.history.push("/episodes");
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
          <h3>Add a New Episode</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group as = {Row} controlId="formHorizontalSHOW">
              <Form.Label column sm = {2}>Please Select a Show:</Form.Label>
              <Col sm = {10}>
                <Form.Control as="select" onChange = {(e) => this.showChange(e)} name = "showId">
                  {this.state.shows.map((show) => (
                    <option value={show._id}>{show.name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
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
                              placeholder = "Please enter the episode's description"
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
                              placeholder = "Please enter the episodes season number"
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
                              placeholder = "Please enter the total episode number"
                              name = "episode_number"
                              value = {this.state.episode_number}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
              <Col>
                <Button type = "submit" className = "spaceRight">Add new Episode</Button>
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
