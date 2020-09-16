import React from 'react';

const PayedItem = ({ item }) => {
  const editString = (string) => {
    const lowerCase = string.toLowerCase();
    return lowerCase.replace(/^./, lowerCase[0].toUpperCase())
  };

  return (
    <li>
      Item: {editString(item.description)} / Value: $ {item.bill.toFixed(2)}
    </li>
  );
};

export default PayedItem;