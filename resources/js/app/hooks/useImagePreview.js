import React, { useEffect } from 'react';

const useImagePreview = ({ watch }) => {
  const [pics, setPics] = useState([]);

  const images = watch('logo', []);

  useEffect(() => {
    Array.from(logo).forEach(file => {
      if (file) {
        setPic(URL.createObjectURL(file));
        console.log(URL.createObjectURL(file));
      }
    });
  }, [logo]);
};

export default useImagePreview;
