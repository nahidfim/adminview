import React from "react";
import axios from 'axios';
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./SattelementProcess.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SattelementProcess = ({ setValue, t }) => {
  const notify = () => toast("精算中!");
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')
  const current = new Date();
  const date = `${current.getFullYear()}/${current.getMonth()+1}/${current.getDate()}/`;

  async function toBeCalledByEventListener() {

    //1st try-catch block
  
    try {
      const response = await fetch('/generate_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      const pdfURL = responseData.pdf_url; 
      localStorage.setItem("pdf_url",pdfURL)
      // window.open(pdfURL, '_blank');
      notify()
      if (!response.ok) {
        toast("An unexpected error occurred, please try again later.")
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    //2nd try-catch block
  
    try {
      const response = await fetch('/generate_pdf_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      const pdfURL = responseData.pdf_url; 
      localStorage.setItem("pdf_url",pdfURL)
      // window.open(pdfURL, '_blank');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
      //3nd try-catch block for excel file
    // 　　 try {
    //   const response = await axios.get('/generate_excel', { responseType: 'blob' });

    //   // Create a download link
    //   const downloadLink = document.createElement('a');
    //   const url = window.URL.createObjectURL(new Blob([response.data]));
    //   downloadLink.href = url;
    //   downloadLink.setAttribute('download', 'Table_Sells_Report.xlsx');
    //   document.body.appendChild(downloadLink);
    //   downloadLink.click();
    //   document.body.removeChild(downloadLink);
    // } catch (error) {
    //   toast("An unexpected error occurred, please try again later.")
    //   console.error('Error downloading Excel file:', error);
    // }
    // //4nd try-catch block for excel file
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


  }

  const handledone = () => {
    setValue(10);
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
            {t('print')}
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

export default SattelementProcess;
