import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./AdminControlScreen.module.css";

const AdminControlScreen = ({ setValue, t}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')
  const handleSettlementProcess = async () => {
    setValue(11);
    console.log("hello")
    try {
      const response = await fetch('/generate_pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("this is before response.ok")
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('PDF URL:', data.pdf_url);
      setValue(11);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleTableSellsPdf = (e) => {
    setValue(12);
  }
  const handleProductSellsPdf = () => {
    setValue(13);
  };

  const handledone = () => {
    setValue(8);
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
    <Box className={styles.OperatorCode}>
          <h1 variant="h5"> {t('admin_code')} : {code}</h1>
    </Box>
      
    <Box className={styles.ButtonGroup}>
     
        <Box className={styles.secondBox}>
      
      {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleSettlementProcess}
          >
            {t('admin_option_2')}
          </Button>

     
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleTableSellsPdf}
          >
            {t('admin_option_3')}
          </Button>
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleProductSellsPdf}
          >
            {t('admin_option_4')}
          </Button>
          
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

export default AdminControlScreen;
