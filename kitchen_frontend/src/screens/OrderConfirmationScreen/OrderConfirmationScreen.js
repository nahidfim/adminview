import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./OrderConfirmationScreen.module.css";

const OrderConfirmationScreen = ({ setValue, t}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(2);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(4);
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
     <Box className={styles.headerContent}>
     </Box>
      <Box className={styles.ButtonGroup}>
     
      <Box className={styles.secondBox}>
      <Typography variant="h5"> {t('operator_code')} : {code}</Typography>
      {/* <Typography variant="h5"> {t('lan_no')} : 5</Typography> */}
          <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleViewOrder}
          >
            {t('kitchen_option_2')}
          </Button>

     
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleProductInfoScreen}
          >
            {t('kitchen_option_3')}
          </Button>
          <Button
            variant="large"
            className={styles.redButton}
            onClick={handleCategoryMaster}
          >
            {t('kitchen_option_４')}
          </Button>
         
        </Box>

        <Box className={styles.thirdbox}>
        <Button
            variant="large"
            className={styles.redButton}
            onClick={handleDeliveryConfirmationScreen}
          >
            {t('done')}
          </Button>
        </Box>
        </Box>
      
    </Container>
  );
};

export default OrderConfirmationScreen;
