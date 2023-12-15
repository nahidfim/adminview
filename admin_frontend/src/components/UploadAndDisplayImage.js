import React from 'react'

const UploadAndDisplayImage = ({selectedImage, setSelectedImage}) => {
    const [imageBase64, setImageBase64] = React.useState(null)

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
            const file = event.target.files[0];
            const reader = new FileReader();
            setSelectedImage(reader.readAsDataURL(file))
    
        }
    }
        />
      </div>
    );
  };
  
  export default UploadAndDisplayImage;