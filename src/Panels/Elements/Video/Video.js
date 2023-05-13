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

export default function ImageStream(props) {
  const [image, setImage] = useState();

  // Assume you have received the image buffer as 'imageBuffer' from the server
  useEffect(() => {
    if(props.video) {
    //var blob = new Blob([props.video], { type: 'image/jpeg' });
   // var imageUrl = URL.createObjectURL(blob);
    //setImage(imageUrl);
  
   setImage(props.video);
    }
  }, [props.video])

  //I recieved the image data from the server as a buffer and trasnform it to an image and add it to the image state

  return (
    <div>
      <img src={image ? 'data:image/jpeg;base64,'+image : "https://placehold.co/800x600" } id="image" />
    </div>
  )
}