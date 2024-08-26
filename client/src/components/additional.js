import React from 'react';
import './additional.css';

function AdditionalInfo() {
  return (
    <div className="additional">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.365985682167!2d84.80946307623412!3d25.12331467775856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d37003035e8a7%3A0x82c4c435c65d21c5!2sSrijan%20Home%20School%2C%20Kurtha!5e0!3m2!1sen!2sin!4v1716201949033!5m2!1sen!2sin" width="600" height="450" frameBorder="0" title="Location Map"></iframe>
      <div className='info'>
        <h2>Details:</h2>
        <p>Address: Srijan Home School, Behind Punjab National Bank, Kurtha, Arwal</p>
        <p>Contact: +91-7480034563</p>
        <p>Email: harshrajshs@gmail.com</p>
        <p>Website: https://srijanhomeschool.netlify.app</p>
      </div>
    </div>
  );
}

export default AdditionalInfo;