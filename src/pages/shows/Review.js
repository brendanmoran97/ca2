/**
 * @Date:   2020-01-27T12:29:12+00:00
 * @Last modified time: 2020-02-12T18:33:46+00:00
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Review extends Component{
  constructor(props){
    super(props);
      this.state = {
        personname: '',
        rating: '',
        reviewText: '',
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

    let review = {

      personname: this.state.personname,
      rating: this.state.rating,
      reviewText: this.state.reviewText
    }
    let newReview = this.state.show;
    console.log(newReview);
    newReview.review.push(review);

    const { id } = this.props.match.params;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios.put(`http://localhost:4000/shows/${id}`, newReview)

         .then(res => {
           console.log(res.data);
           this.props.history.push("/shows");
         })
         .catch(err => {
           console.log(err);
           this.props.history.push("/login");
         });
  };

   componentDidMount(){
     const { id } = this.props.match.params;
     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.get(`http://localhost:4000/shows/${id}`).then((result) => {
       console.log(result);
       this.setState({
         show: result.data
       }, () => console.log(this.state));
     });
   }

  render(){
    return(
      <div className = "container">
        <Card className = "topSpace">
          <Card.Body>
          <h3>Add a Rating for {this.state.name}</h3>
          <Form onSubmit={this.onSubmit}>
            <Form.Group as = {Row} controlId="formHorizontalIMDB">
              <Form.Label column sm = {2}>
                Name:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter your name"
                              name = "personname"
                              value = {this.state.personname}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalNAME">
              <Form.Label column sm = {2}>
                Rating:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter a rating"
                              name = "rating"
                              value = {this.state.rating}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row} controlId="formHorizontalNAME">
              <Form.Label column sm = {2}>
                Review:
              </Form.Label>
              <Col sm = {10}>
                <Form.Control
                              type = "text"
                              placeholder = "Please enter a review"
                              name = "reviewText"
                              value = {this.state.reviewText}
                              onChange = {this.handleInputChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as = {Row}>
            <Col>
              <Button type = "submit" className = "spaceRight">Add Rating</Button>
              <Link to = "/shows/"   ><Button className = "addEpisode" type = "submit" variant = "warning">Cancel</Button></Link>
            </Col>
            </Form.Group>
          </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }

}
