import React from 'react';

const ServiceDetails = (props) => {
  const {service} = props;

  return (
    <div style={{padding: 10}}>
      {service.name}: <pre>{JSON.stringify(service.alts)}</pre>
    </div>
  );
};

export default ServiceDetails;
