import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { id, name } = this.props;
    return (
      <div>
        <Link
          data-testid={ `link-to-album-${id}` }
          to={ `/album/${id}` }
        >
          { `${name}` }
        </Link>

      </div>
    );
  }
}
export default Card;

Card.propTypes = {
  collectionId: PropTypes.number,
  collectionName: PropTypes.string,
}.isRequired;
