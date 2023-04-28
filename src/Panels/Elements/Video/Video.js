import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";


/*function BufferToImage({ buffer }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    return () => URL.revokeObjectURL(url); // cleanup
  }, [buffer]);

}*/

export default function ImageStream() {

  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  let k=0;
  /*const socket = io.connect('http://localhost:3030');

  socket.on('image', (image) => {

    k++;
    console.log(k);

    //Convert the array buffer image to base64
    //let image2 = new Buffer.from(image).toString('base64');

    //var enc = new TextDecoder("base64");
    //console.log(enc.decode(arr));

    const image2 = ab2str(image);

    // console.log('data', data);
    const img = document.getElementById('image');
    img.src = `data:image/jpeg;base64,${image}`;
  });*/

  return (
    <div>
      <img src="https://placehold.co/600x400" id="image" />
    </div>
  )
}