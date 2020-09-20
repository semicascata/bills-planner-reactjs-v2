import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteBill } from '../../redux/actions/account';

const PendentItem = ({ item, deleteBill }) => {
  const editString = (string) => {
    const lowerCase = string.toLowerCase();
    return lowerCase.replace(/^./, lowerCase[0].toUpperCase());
  };

  const delBill = () => {
    deleteBill(item._id);
  };

  return (
    <li className="pendent-item-li">
      <button onClick={delBill} className="btn"><i className="fas fa-trash"></i></button>Item: {editString(item.description)} / Value: $ {item.bill.toFixed(2)}
    </li>
  );
};

PendentItem.propTypes = {
  deleteBill: PropTypes.func.isRequired,
};

export default connect(null, { deleteBill })(PendentItem);