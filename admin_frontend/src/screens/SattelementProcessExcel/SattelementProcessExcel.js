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
      const response = await axios.get('/generate_excel', { responseType: 'blob' });

      // Create a download link
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'Table_Sells_Report.xlsx');
      notify()
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      toast("An unexpected error occurred, please try again later.")
      console.error('Error downloading Excel file:', error);
    }
   
    try {
      const response = await axios.get('/generate_excel_item', { responseType: 'blob' });

      // Create a download link
      const downloadLink = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([response.data]));
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'Item_Sells_Report.xlsx');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }

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