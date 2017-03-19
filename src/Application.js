import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './SignIn';
import NewRestaurant from './NewRestaurant';
import Restaurants from './Restaurants';
import './Application.css';
import map from 'lodash/map';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser : null,
      restaurants : null,
    };

    this.restaruantRef = database.ref('/restaurants');

  }

  componentDidMount() {
    auth.onAuthStateChanged((currentUser) => {
      this.setState({ currentUser });

      //only listen for values when authenticated
      this.restaruantRef.on('value', (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          restaurants: snapshot.val()
        });

      });

    });
  }

  render() {

    const {currentUser, restaurants } = this.state;

    return (
      <div className="Application">
        <header className="Application--header">
          <h1>Lunch Rush</h1>
          <div>
            {!currentUser && <SignIn /> }
            {currentUser && 
            <div>
              <NewRestaurant />
              <Restaurants user={currentUser} restaurants={restaurants} />
              <CurrentUser user={currentUser} /> 
            </div>
            }
          </div>
        </header>
      </div>
    );
  }
}

export default Application;
