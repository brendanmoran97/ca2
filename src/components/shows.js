/**
 * @Date:   2020-01-27T11:47:11+00:00
 * @Last modified time: 2020-02-13T16:33:40+00:00
 */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import ShowModal from './modals/showmodal';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'




 class Show extends React.Component{
   constructor(props){
     super(props);

     this.state = {

       shows: [],
       filterRating: [],
       showRating: "reset"

     }
   }

   confirmDelete = () => {
     alert("Show Successfully Deleted")
   };


   componentDidMount() {

         fetch('http://localhost:4000/shows')
           .then(res => res.json())
           .then((data) => {
             this.setState({
               shows: data,
               filterRating: data
             });
           })
           .catch(console.log)
       }


       ratingChange(showRating){

         if(showRating === "reset"){
            this.setState({showRating: "reset"});
           return;
         }

         this.setState({showRating: showRating});
       }


       rgu = (id) => {
         let newShows = this.state.shows;
       };

       render(){
         const loggedIn = this.props.status;
         return(
              <Container>
                <Row className = "topSpace header headertext">

                  <Col>
                    <center>
                      <h2 className = "topSpace bottomSpace">Shows</h2>
                    </center>
                  </Col>
                  <Col>
                    <center>
                      <DropdownButton id = "dropdown-basic-button" title = "Filter Shows based on Rating" className = "topSpace bottomSpace" variant = "info">
                        <Dropdown.Item onClick = {() => this.ratingChange("reset")}>All Shows</Dropdown.Item>
                        {["5", "4", "3", "2", "1"].map((specificRating, i) => (
                          <Dropdown.Item key = {i} onClick={() => this.ratingChange(specificRating)}>{specificRating} <img alt = "All Episodes" src= "../../../images/star.png" height = "30px" width = "30px"/></Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </center>
                  </Col>
                </Row>
                <Row className = "topSpace">
                  {this.state.shows.filter((e, i) => {
                    return e.showRating === this.state.showRating || this.state.showRating === "reset";
                  }).map((show, i) => (
                    <div key = {i} className ="topSpace col-lg-4 col-sm-6">
                      <Card className = "cardItself">
                        <Card.Title className = "cardTitleShow">
                          <center>
                            <h2 className = "topSpace">
                              {show.name}
                            </h2>
                          </center>
                        </Card.Title>
                          <Card.Body>
                          <Col>
                            <h5 className="topSpace"><b>IMDB ID:</b> {show.imdb_id}</h5>
                          </Col>
                          <Col className = "topSpace">
                            <h5>It has {show.episode.length} episodes</h5>
                          </Col>
                          <Col className = "topSpace">
                            <h5><b>IMDB Rating: </b> {show.showRating}/5 <img alt = "All Episodes" src= "../../../images/star.png" height = "30px" width = "30px"/></h5>
                          </Col>
                          </Card.Body>
                          <Card.Footer>
                            <Row>
                              {(loggedIn) ? (
                                <Col>
                                  <Link to={`/shows/update/${show._id}`}><Button className="space float-left">Edit Show</Button></Link>
                                </Col>
                              ) : (
                                <>
                                </>
                              )}

                              <Col>
                                <ShowModal data={show} info ={this.confirmDelete} status={this.props.status} episode = {this.state.episode} removeEpisode={this.rgu}/>
                              </Col>
                            </Row>
                          </Card.Footer>
                      </Card>
                    </div>
                  ))}
                </Row>
              </Container>
         )
       }
 }

 export default Show;
