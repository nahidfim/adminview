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

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(11);
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
            className={styles.lightgreenButton}
            onClick={handleViewOrder}
          >
            {t('admin_option_2')}
          </Button>

     
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleProductInfoScreen}
          >
            {t('admin_option_3')}
          </Button>
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleCategoryMaster}
          >
            {t('admin_option_4')}
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

export default AdminControlScreen;
