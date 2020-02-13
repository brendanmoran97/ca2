/**
 * @Date:   2020-01-27T14:09:39+00:00
 * @Last modified time: 2020-02-13T16:32:32+00:00
 */



import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Link} from 'react-router-dom';
import axios from 'axios';


class Episode extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        shows: [],
        filterShow: [],
        filterSeason: [],
        changeSeason: 0
      }
    }

    componentDidMount(){
      fetch('http://localhost:4000/shows')
        .then(res => res.json())
        .then((data) => {
        this.setState({
          shows: data,
          filterShow: data,
          filterSeason: data
        });
      })
      .catch(console.log)
    }

    showChange(showId){
      let results = [];

      if(showId === "reset"){
        this.setState({filterShow: this.state.shows});
        return;
      }

      for(let i = 0; i < this.state.shows.length; i++){
        if(this.state.shows[i]._id === showId){
          results.push(this.state.shows[i]);
        }
      }
      this.setState({filterShow: results});
    }

    seasonChange(season_number){

      this.setState({changeSeason: season_number});
    }

    deleteEpisode(id){
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      if(!window.confirm("Are you sure you want to delete this episode?")){
        return;
      }
      axios.delete(`http://localhost:4000/episodes/${id}`).then(() => {

      });
      window.location = '/episodes';
    }

    render(){
      const loggedIn = this.props.status;
      return(
        <Container>
          <Row className = "topSpace header headertext">

            <Col>
              <center>
                <h2 className = "topSpace bottomSpace">Episodes</h2>
              </center>
            </Col>
            <Col>
              <center>
                <DropdownButton id = "dropdown-basic-button" title = "Filter Shows" className = "topSpace bottomSpace" variant = "info">
                  <Dropdown.Item onClick = {() => this.showChange("reset")}>All Shows</Dropdown.Item>
                  {this.state.shows.map((show, i) => (

                            <Dropdown.Item key = {i} onClick = {() => this.showChange(show._id)}>{show.name}</Dropdown.Item>

                  ))}
                </DropdownButton>
              </center>
            </Col>
          </Row>
          <Row className = "header">
          </Row>
          {this.state.filterShow.map((show, i) => (
            <React.Fragment key = {i}>
              <Row className = "showHeader">
                <Col>
                  <center><h3 className = "topSpace bottomSpace">{show.name}'s Episodes</h3></center>
                </Col>
                <Col>
                  <center>
                    <DropdownButton id = "dropdown-basic-button" title = "Filter Seasons" className = "topSpace bottomSpace" variant = "info">
                      {["All Seasons", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((specificEpisode, i) => (

                                <Dropdown.Item key = {i} onClick={() => this.seasonChange(i)}>Season {specificEpisode}</Dropdown.Item>

                      ))}
                    </DropdownButton>
                  </center>
                </Col>

              </Row>
              <Row key = {i} className = "cardSpace">



              {show.episode.filter((episode, i) => {
                if(this.state.changeSeason === 0){
                  return true;
                }else{
                  return episode.season_number === this.state.changeSeason;
                }

              }).map((episode, i) => {
                return (
                  <div key = {i} className = "topSpace col-lg-4 col-sm-6">
                    <Card className = "bottomSpace">
                      <Card.Title className = "cardTitleShow">
                        <center>
                          <h2 className = "topSpace">{episode.name}</h2>
                        </center>
                      </Card.Title>
                      <Card.Body>
                        <Row>
                          <Col>
                            <h5>Season: {episode.season_number}</h5>
                          </Col>
                          <Col>
                            <h5>Episode: {episode.episode_number}</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className = "topSpace">Duration: {episode.episode_length} minutes</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className = "topSpace">Description: <br/><br/> <i>{episode.description}</i></h5>
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <Row>
                          {(loggedIn) ? (
                            <>
                              <Col>
                                <Link to = {`/episodes/update/${episode._id}`}><Button className = "space float-left">Edit Episode</Button></Link>
                              </Col>
                              <Col>
                                <Button className = "float-right" variant = "danger" onClick = {() => this.deleteEpisode(episode._id)}>Delete Episode</Button>
                              </Col>
                            </>
                          ) : (
                            <>
                            </>
                          )}
                        </Row>
                      </Card.Footer>
                    </Card>
                  </div>
                );
              })}

              </Row>
            </React.Fragment>
          ))}
        </Container>
      )
    }
}

export default Episode;
