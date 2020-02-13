/**
 * @Date:   2020-02-03T18:52:36+00:00
 * @Last modified time: 2020-02-13T16:35:06+00:00
 */
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Collapsible from 'react-collapsible';
import {Link} from 'react-router-dom';




function deleteShow(id, completed, show){
  console.log(id);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    console.log(show);
    if(show.length > 0){
      alert("Please delete the shows episodes before you delete this show")
      return;
    }
    else{
      if(!window.confirm("Are you sure you want to delete this show?")){
        return;
      }

      axios.delete(`http://localhost:4000/shows/${id}`).then((d) => {
        console.log("BRUH");
      });
    }
    window.location = '/shows';
    completed();
  };

function episodeStuff(e){

  axios.get(`http://localhost:4000/shows/${e._id}/episodes`)
    .then(response => {
  })
  .catch((error) => {
    console.log(error);
  })
}

 function ShowModal(props) {
   const [lgShow, setLgShow] = useState(false);

   return (

     <>
       <Button className = "float-right" onClick={() => setLgShow(true)}>View This Show</Button>

       <Modal
         size="lg"
         show={lgShow}
         onHide={() => setLgShow(false)}
         aria-labelledby="example-modal-sizes-title-lg"
       >
         <Modal.Header closeButton>
               <Col>
                <h2>{props.data.name}</h2>
               </Col>
               {(props.status) ? (
                 <>
                 <Col className = "float-right">
                  <center>
                   <Link className = "smallerOtherNav space float-right" to="/episodes/create">
                     <Button variant = "info"  className="btn btn-primary float-right">Add Episode</Button>
                   </Link>
                   </center>
                 </Col>
                 <Col>
                   <center>
                     <Link to = {`/shows/review/${props.data._id}`}><Button className = "addEpisode" type = "submit" variant = "warning">Add Review</Button></Link>
                   </center>
                 </Col>
                 </>
               ) : (
                 <>
                 </>
               )
               }
         </Modal.Header>
        <Modal.Body>
          <h5><b>Description</b></h5>
          <p><i>{props.data.description}</i></p>
          <Collapsible className="collapseHover" trigger="Click here to View all episodes for this show" onOpening={() => episodeStuff(props.data)}>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Episode Length</th>
                <th>Brief Description</th>
                <th>Season Number</th>
                <th>Episode Number</th>
                {(props.status) ? (
                  <>
                    <th>Actions</th>
                  </>
                ) : (
                  <>
                  </>
                )
                }
              </tr>
            </thead>
              {props.data.episode.map((e, i) => {
                return(
                  <tbody  className = "topSpace" key = {i}>
                  <tr className = "topSpace">
                    <td className = "topSpace">{e.name}</td>
                    <td className = "topSpace">{e.episode_length} minutes</td>
                    <td className = "topSpace">{e.description}</td>
                    <td className = "topSpace">{e.season_number}</td>
                    <td className = "topSpace">{e.episode_number}</td>
                    {(props.status) ? (
                      <>
                        <Link key = {i} to={`/episodes/update/${e._id}`}><Button className="topSpace float-left">Edit Episode</Button></Link>
                      </>
                    ) : (
                      <>
                      </>
                    )
                    }
                  </tr>
                  </tbody>
                );
              })}
            </Table>
          </Collapsible>
          <Collapsible className="collapseHover topSpace" trigger="Click here to View Reviews for this Show" onOpening={() => episodeStuff(props.data)}>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Rating</th>
                    <th>Review</th>
                  </tr>
                </thead>
                  {props.data.review.map((e, i) => {
                    return(
                      <tbody  className = "topSpace" key = {i}>
                        <tr className = "topSpace">
                          <td className = "topSpace">{e.personname}</td>
                          <td className = "topSpace">
                            {e.rating} /5 <img alt = "All Episodes" src= "../../../images/star.png" height = "30px" width = "30px"/>
                          </td>
                          <td className = "topSpace">{e.reviewText}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </Table>
              </Collapsible>



          {(props.status) ? (
            <>
              <Button className = "float-right" variant="danger"onClick={() => deleteShow(props.data._id, props.info, props.data.episode)}>Delete this show</Button>
            </>
          ) : (
            <>
            </>
          )
          }

        </Modal.Body>
        </Modal>
     </>
   );
 }

export default ShowModal;
