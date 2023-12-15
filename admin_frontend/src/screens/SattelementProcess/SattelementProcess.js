import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./SattelementProcess.module.css";

const SattelementProcess = ({ setValue, t}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(2);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(8);
  };

  const handleProductInfoScreen = (e) => {
    setValue(6);
  }
  const handleCategoryMaster = (e) => {
    setValue(7);
  }

  React.useEffect(() => {
    fetch('/get_operator').then((response) => {
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
          <h1 variant="h5"> {t('sattlement_date')} : {"2023/12/15"}</h1>
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
            onClick={handleDeliveryConfirmationScreen}
          >
            {t('done')}
          </Button>
        </Box>
        </Box>
      
    </Container>
  );
};

export default SattelementProcess;
