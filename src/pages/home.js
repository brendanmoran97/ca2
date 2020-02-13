/**
 * @Date:   2019-10-15T10:57:10+01:00
 * @Last modified time: 2020-02-13T15:14:21+00:00
 */

import React from 'react';
import {Link} from 'react-router-dom';


class Home extends React.Component {
  render(){
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-lg-6 col-sm-12 bigTopSpace">
            <div className = "card">
              <img alt = "All Episodes" src= "../../../images/actor.png"/>
              <div className ="card-body">
                <center>
                <Link to = "./shows" ><button type="button" className="btn-block btn btn-primary">Click here for a full list of Shows!</button></Link>
                </center>
              </div>
            </div>
          </div>
          <div className = "col-lg-6 col-sm-12 bigTopSpace">
            <div className = "card">
              <img alt = "All Episodes" src= "../../../images/tv.png"/>
              <div className ="card-body">
                <center>
                <Link to = "./episodes" ><button type="button" className="btn-block btn btn-primary">Click here for a full list of episodes!</button></Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home;
