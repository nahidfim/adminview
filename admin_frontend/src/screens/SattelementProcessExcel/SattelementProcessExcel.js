import axios from 'axios';
import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./SattelementProcessExcel.module.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const SattelementProcessExcel = ({ setValue,t }) => {
  const [code, setCode] = React.useState('')
  const notify = () => toast("EXCEL出力完了!");
  const current = new Date();
  const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}/`;
  async function toBeCalledByEventListener() {
    try {
      // Get the CSRF token from the cookies
      const csrftoken = getCookie('csrftoken');
  
      // Send a POST request to the backend to generate the Excel file
      const response = await fetch('/generate_excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
        },
        credentials: 'same-origin', // Include credentials to send cookies
      });
  
      // Check if the response is successful
      if (!response.ok) {
        // Handle the case where the response is not ok
        toast("An unexpected error occurred, please try again later.");
        throw new Error('Network response was not ok');
      }
  
      // Read the response body as JSON
      const responseData = await response.json();
  
      // Get the URL of the generated Excel file from the response data
      const excelURL = responseData.excel_url;
  
      // Store the URL in localStorage for future use (optional)
      localStorage.setItem("excel_url", excelURL);
  
      // Display a notification or toast to indicate that the Excel file was generated successfully
      notify();
  
      // Optionally, you can open the Excel file in a new tab/window
      window.open(excelURL, '_blank');
    } catch (error) {
      // Handle errors, such as network errors or server errors
      console.error('Error generating Excel file:', error);
      toast("An unexpected error occurred, please try again later.");
    }

    try {
      // Get the CSRF token from the cookies
      const csrftoken = getCookie('csrftoken');
  
      // Send a POST request to the backend to generate the Excel file
      const response = await fetch('/generate_Item_excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
        },
        credentials: 'same-origin', // Include credentials to send cookies
      });
  
      // Check if the response is successful
      if (!response.ok) {
        // Handle the case where the response is not ok
        
        throw new Error('Network response was not ok');
      }
  
      // Read the response body as JSON
      const responseData = await response.json();
  
      // Get the URL of the generated Excel file from the response data
      const excelURL = responseData.excel_url;
  
      // Store the URL in localStorage for future use (optional)
      localStorage.setItem("excel_url", excelURL);
  
      // Display a notification or toast to indicate that the Excel file was generated successfully
     
  
      // Optionally, you can open the Excel file in a new tab/window
      window.open(excelURL, '_blank');
    } catch (error) {
      // Handle errors, such as network errors or server errors
      console.error('Error generating Excel file:', error);
      
    }

  }
  
 

  // Function to get CSRF token from cookies
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Check if the cookie contains the CSRF token
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
   
    // try {
    //   const response = await axios.get('/generate_excel_item', { responseType: 'blob' });

    //   // Create a download link
    //   const downloadLink = document.createElement('a');
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   downloadLink.href = url;
    //   downloadLink.setAttribute('download', 'Item_Sells_Report.xlsx');
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // } catch (error) {
    //   console.error('Error downloading Excel file:', error);
    // }

  };

  React.useEffect(() => {
    fetch('/get_admin').then((response) => {
      return response.text();
    }).then((response) => {
      console.log(response);
      setCode(response);
      return response
    });
  }, [])

  const handledone = () => {
    setValue(10);
  };

  return (
    <Container className={styles.outermostContainer}>
      
      <Box className={styles.admincode}>
        <h1 variant="h5"> {t('admin_code')} : {code}</h1>
      </Box>
      <Box className={styles.admindate}>
      <h1> 日付　：{date}</h1>
        {/* <h1 variant="h5"> {t('sells_date')} :  {"2023/12/19"} ~ {"2023/12/19"}</h1> */}
      </Box>
      <Box className={styles.ButtonGroup}>

        <Box className={styles.secondBox}>
        <ToastContainer/>
          {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={toBeCalledByEventListener}
            
          >
            {t('EXCEL出力')}
          </Button>
        </Box>

        <Box className={styles.thirdbox}>
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handledone}
          >
            {t('done')}
          </Button>
        </Box>
      </Box>

    </Container>
  );
};

export default SattelementProcessExcel;