import React from 'react'

import classes from './HeroInput.css'

const HeroInput = (props) => {
  return (
    <div className={classes.HeroInput}>
      <input
            type='text'
            className={classes.HeroInput__input}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            ref={props.notref}
          />
          <label
            className={classes.HeroInput__label}>{props.label}</label>
    </div>
  )
}

export default HeroInput
