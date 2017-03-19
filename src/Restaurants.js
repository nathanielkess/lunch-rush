import React, { Component, PropTypes } from 'react';
import Restaurant from './Restaurant';
import map from 'lodash/map';
import './Restaurants.css';
import { database } from './firebase';

class Restaurants extends Component {
  constructor(props) {
    super(props);

  }


  handleSelect(key) {

    const { user:currentUesr } = this.props;

    database.ref('/restaurants')
      .child(key)
      .child('votes')
      .child(currentUesr.uid)
      .set(currentUesr.displayName);

  }

  handleDeselect(key) {

    const { user:currentUesr } = this.props;
    
    database.ref('/restaurants')
      .child(key)
      .child('votes')
      .child(currentUesr.uid)
      .remove();
  }


  render () {

    const { restaurants, user } = this.props;

    return (
      <section className="Restaurants">
        {map(restaurants, (resto, key) => {
          return <Restaurant 
            key={key}
            {...resto}
            user={user}
            handleSelect={() => this.handleSelect(key) }
            handleDeselect={() => this.handleDeselect(key) }
          />;
          
        })}
      </section>
    );
  }
}

Restaurants.propTypes = {
  user: PropTypes.object,
  restaurantsRef: PropTypes.object,
  restaurants: PropTypes.object
};

export default Restaurants;
