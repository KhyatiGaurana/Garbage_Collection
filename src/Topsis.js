import React, { useState, useEffect } from 'react';

function Topsis() {
  const [binsData, setBinsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/topsis');
        const data = await response.json();
        setBinsData(data.bin_list);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    binsData
  );
}

export default Topsis;