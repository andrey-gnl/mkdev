import React from 'react';
import PropTypes from 'prop-types';

const Column = (props) => {
  return (
      <div className="column">
          <div className="column__inner">
              {props.children}
          </div>
      </div>
  );
};
export default Column;