import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCredited } from '../../redux/actions/account';

const PayedItem = ({ item, changeCredited }) => {
  const editString = (string) => {
    if (string === undefined) {
      return;
    }
    const lowerCase = string.toLowerCase();
    return lowerCase.replace(/^./, lowerCase[0].toUpperCase())
  };

  const changeBill = () => {
    changeCredited(item._id);
  };

  return (
    <li className="payed-item-li">
      <button onClick={changeBill} className="btn">
        <i className="fas fa-trash"></i>
      </button> Item: {editString(item.description)} / Value: $ {item.bill.toFixed(2)}
    </li>
  );
};

PayedItem.propTypes = {
  changeCredited: PropTypes.func.isRequired,
  item: PropTypes.any.isRequired,
};

export default connect(null, { changeCredited })(PayedItem);