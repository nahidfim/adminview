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
  };
  
  const handleTableSellsPdf = (e) => {
    setValue(12);
  }
  const handleProductSellsPdf = () => {
    setValue(13);
  };

  // const handleSattelementProcessExcel = () => {
  //   setValue(14);
  // };
  const handleTableSellsExcel = () => {
    setValue(15);
  };

  const handleProductSellsExcel = () => {
    setValue(16);
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
   
      <Box className={styles.ButtonGroup}>
        
      <Box className={styles.OperatorCode}>
        <h5 variant="h5"> {t('admin_code')} : {code}</h5>
      </Box>
        
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleSettlementProcess}
          >
            {t('settlement process')}
          </Button>

          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleTableSellsPdf}
          >
            {t('Tablet settlement Search')}
          </Button>
        
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleProductSellsPdf}
          >
            {t('Item settlement Search')}
          </Button>

          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleTableSellsExcel}
          >
            {t('端末EXCEL検索')}
          </Button>
        
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleProductSellsExcel}
          >
            {t('商品EXCEL検索')}
          </Button>

          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handledone}
          >
            {t('done')}
          </Button>

        </Box>
      
    </Container>
  );
};

export default AdminControlScreen;
