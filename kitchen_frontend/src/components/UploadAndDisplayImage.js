import React from 'react'

const UploadAndDisplayImage = ({selectedImage, setSelectedImage}) => {
    

    return (
      <div>
        <h1>Upload Image</h1>
  
        {selectedImage && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
  
        <br />
        <br />
        
        <input
          type="file"
          name="myImage"
          onChange={(event) => {
            console.log(event.target.files[0]);
            let reader = new FileReader() 
            setSelectedImage(reader.readAsDataURL(event.target.files[0]));
          }}
        />
      </div>
    );
  };
  
  export default UploadAndDisplayImage;