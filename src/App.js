import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios'

function App() {

  const [image,setImage] = useState(null)
  const [imageUrl,setImageUrl] = useState('')
  const [text,setText] = useState('')
  const [preview,setPreview] = useState('')

  // const handleUrlChange = (e) =>{
  //   setImageUrl(e.target.value)
  // }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
    //setImageUrl(URL.createObjectURL(e.target.files[0]))
  }

  const handleText = (e) => {
    setText(e.target.value)
  }

  const handleGenerate = async () => {

    const formData = new FormData() 
    formData.append('image',image)
    formData.append('text',text)

    console.log(formData)
    console.log(text)
    console.log(image)

    try {
      //const csrfToken = window.csrfToken
      const response = await axios.post('http://127.0.0.1:8000/generate',formData,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log("hey");
      console.log(response.data.image);
      setPreview(response.data.image)
    } catch (error) {
      console.log(error)
    }

   //setImage(imageUrl)
    //console.log(imageUrl)
  }

  return (
    <div className="App">

      <Button
        variant="contained"
        component="label"
        sx={{ mt: 2, mb: 2 }}
      >
        Upload Image
        <input
          type="file"
          hidden
          onChange={handleFileChange}
        />
      </Button> 

      <input
        type="text"
        value={text}
        onChange={handleText}
        placeholder='Enter the text'
      />

      <Button variant="contained" size="large" onClick={handleGenerate}>
          Generate
      </Button>
      <div>
        {image && <img src={URL.createObjectURL(image)} alt="preview" style={{ maxWidth: '50%', height: 'auto', marginTop: '20px' }} />}
      </div>
      <div>
        {preview && <img src={preview} alt="preview" style={{ maxWidth: '50%', height: 'auto', marginTop: '20px' }} />}
      </div>
    </div>
  );
}

export default App;




{/* <Button variant="contained" size="large" >
        Load Image from URL
      </Button>
      <div
        className="dragAndDrop"
        onDrop = {handleDrop}
        onDragOver = {handleDrag}
        onClick={handleSelectImage}
      >
        Drag and Drop an Image Here
      </div> */}



{/* Input image Url */}
{/* <input
type="text"
placeholder="Enter image URL"
value={imageUrl}
onChange={handleUrlChange}
style={{ marginBottom: '20px', padding: '10px', width: '70%' }}
/> */}
