import React, { useState, useEffect } from 'react';

function IpAddress() {
  const [ipv4Address, setIpv4Address] = useState('');

  useEffect(() => {
    async function fetchIpv4Address() {
      const pc = new RTCPeerConnection();
      const offer = await pc.createOffer();
      const regex = /(\d+\.\d+\.\d+\.\d+)/g;
      const matches = offer.sdp.match(regex);
      const ipv4Address = matches.find(match => match.split('.').length === 4);
      setIpv4Address(ipv4Address);
    }
    fetchIpv4Address();
  }, []);

  return (
    <div>
      <p>Your IPv4 address is: {ipv4Address}</p>
    </div>
  );
}

export default IpAddress;
