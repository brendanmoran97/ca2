/**
 * @Date:   2019-10-21T16:12:46+01:00
 * @Last modified time: 2020-02-10T19:27:08+00:00
 */
 import React from 'react';
 import 'bootstrap/dist/css/bootstrap.css';
 import {Link} from 'react-router-dom';
 import Nav from 'react-bootstrap/Nav';
 import { Navbar } from 'react-bootstrap';




 class NavBar extends React.Component {

   logout = () => {
     localStorage.removeItem('jwtToken');
     this.props.onLogout();
   }

    render(){
      const loggedIn = this.props.loggedIn;
      return(
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand ><Link className = "otherNav" to="/">TV Show Guide</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    {(loggedIn) ? (
                      <>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/shows">View All Shows</Link></Nav.Item>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/shows/create">Create a Show</Link></Nav.Item>
                      </>
                    ) : (
                      <>
                        <Nav.Item><Link className = "smallerOtherNav space" to="/shows">List of All Shows</Link></Nav.Item>
                      </>
                    )
                    }
                    {(loggedIn) ? (
                      <>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/episodes">View All Episodes</Link></Nav.Item>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/episodes/create">Create an Episode</Link></Nav.Item>
                      </>
                    ) : (
                      <>
                        <Nav.Item><Link className = "smallerOtherNav space" to="/episodes">List of All Episodes</Link></Nav.Item>
                      </>
                    )
                    }
                    </Nav>
                    <Nav>
                      <Nav.Item><Link className = "smallerOtherNav space" to="/brendanMoran">Brendan Moran </Link></Nav.Item>

                      {(loggedIn) ? (
                        <Nav.Item><Link to ="#"className = "smallerOtherNav space" onClick={this.logout}> Logout</Link></Nav.Item>
                      ) : (
                        <>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/register">  Register  </Link></Nav.Item>
                          <Nav.Item><Link className = "smallerOtherNav space" to="/login"> Login</Link></Nav.Item>
                        </>
                      )
                      }



                    </Nav>
                  </Navbar.Collapse>
              </Navbar>
      );
    }
  }

  export default NavBar;
