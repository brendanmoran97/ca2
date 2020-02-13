/**
 * @Date:   2019-10-15T10:57:10+01:00
 * @Last modified time: 2020-02-13T16:57:56+00:00
 */

import React from 'react';


class Brendan extends React.Component {
  render(){
    return(
      <div className = "container">
        <div className = "row ">
          <div className = "col-lg-6 col-sm-12 bigTopSpace">
            <div className = "card cardEpisode">
              <div className = "card-title">
                <center><h1 className = "topSpace">Contact</h1></center>
              </div>
              <div className ="card-body">
                <center>
                  <h3><img  alt="Icon" className = "icon" src= "../../../images/me.png"/> Brendan Moran</h3><br/>
                  <p className ="brendanSpace"><img  alt="Icon" className = "icon" src= "../../../images/email.png"/><b> Contact Email: </b> N00163619@student.iadt.ie</p><hr/>
                  <h3>Creative Computing DL836</h3>
                  <p className ="brendanSpace"><b>Module: </b> Advanced JavaScript</p><hr/>
                  <h3>
                    <a className="linkStyle" href="https://github.com/brendanmoran97/AdvJsCA1-React">GitHub</a>
                    <br/>
                    <br/>
                    <img alt="Icon"  className = "iconbigger" src= "../../../images/code.png"/>
                  </h3>
                </center>
              </div>
            </div>
          </div>
          <div className = "col-lg-6 col-sm-12 bigTopSpace">
            <div className = "card cardEpisode">
              <div className = "card-title">
                <center><h1 className = "topSpace">About</h1></center>
              </div>
              <div className ="card-body">
                <center>
                  <h3>TV Guide:</h3>
                  <p>This is an application built using the MERN stack method for Advanced JavaScript Continuous Assessment 2</p>
                  <p></p>
                  <h3 className = "topSpace">Features</h3>
                  <p>Once logged in you are able to Create, Read, Update and Delete Shows and Episodes.</p>
                  <p>You can leave Reviews and view other peoples ratings of your favourite shows</p>
                  <p>If you are not logged in you can still view everything but you cant not alter the shows or episodes or shows in any way</p>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Brendan;
