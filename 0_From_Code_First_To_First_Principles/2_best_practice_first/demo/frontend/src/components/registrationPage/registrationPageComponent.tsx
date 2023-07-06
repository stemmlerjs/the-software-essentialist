
import React from 'react';

const RegistrationPageComponent = () => {
  return (
    <div>
      <h1>Registration Page</h1>
      <input className='email registration' type='email'/>
      <input className='first-name registration' type='text'/>
      <input className='last-name registration' type='text'/>
      <input className='username registration' type='text'/>
      <button onClick={() => {
        alert('clicked!!')
      }} className='submit registration'>Submit</button>
    </div>
  );
};

export default RegistrationPageComponent;