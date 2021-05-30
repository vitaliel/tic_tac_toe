import React from 'react';
import {LinkContainer} from "react-router-bootstrap";

const STEPS = [
  {id: 1,},
  {id: 2,},
  {id: 3,},
  {id: 4,},
  {id: 5,},
  {id: 6,},
  {id: 7,},
  {id: 8,},
  {id: 9,},
];

function gridItem() {

}

export default () => {
  const list = STEPS.map(step => {
    return (
      <div className='item' key={step.id}>
        <button>X</button>
      </div>
    )
  });
  return (
    <div className='row'>
      <div className="col-4">
        <div className='board'>{list}</div>
      </div>
    </div>
  )
}
