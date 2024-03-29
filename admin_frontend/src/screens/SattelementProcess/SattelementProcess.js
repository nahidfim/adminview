import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./SattelementProcess.module.css";

const SattelementProcess = ({ setValue, t }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = async () => {
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
      window.open(pdfURL, '_blank');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${year}-${month}-${day}`;
  console.log(currentDate); // "17-6-2022"

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
        <h1 variant="h5"> 本日 :{currentDate}</h1>
      </Box>
      <Box className={styles.ButtonGroup}>

        <Box className={styles.secondBox}>

          {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleViewOrder}
          >
            {t('admin_option_2')}
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
