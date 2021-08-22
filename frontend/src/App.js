import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import NavigationBar from './Components/NavigationBar'
import TestButton from './Components/TestButton';
import React, { useState } from 'react'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2e1667",
    },
    secondary: {
      main: "#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Inter'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
    },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },


})
function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    console.log('handleSubmission clicked');
    const formData = new FormData();

    formData.append('carFile', selectedFile);

    fetch(
      'http://35.202.137.102/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavigationBar />
      </ThemeProvider>
      <div class="centered">
        <div>
          <input type="file" name="file" onChange={changeHandler} />

          <br />
          {isFilePicked ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:{' '}
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
        </div>
        <div onClick={handleSubmission}>
          <TestButton txt="Submit" />
        </div>
      </div>

    </div>
  );
}

export default App;
