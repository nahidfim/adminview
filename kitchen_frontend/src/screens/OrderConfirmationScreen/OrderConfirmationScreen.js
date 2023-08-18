import React from "react";
import {
  Box,
  Container,
  Button,
  Typography,
} from "@mui/material";
import styles from "./OrderConfirmationScreen.module.css";

const OrderConfirmationScreen = ({ setValue }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [code, setCode] = React.useState('')

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(2);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };

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
      <Typography variant="h5"> Operater Code :{code}</Typography>
      <Typography variant="h5"> Lan No. :5</Typography>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleViewOrder}
          >
            Order Confirmation Screen
          </Button>
         
        </Box>

        <Box className={styles.thirdbox}>
        <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleDeliveryConfirmationScreen}
          >
            Done
          </Button>
        </Box>
        </Box>
      
    </Container>
  );
};

export default OrderConfirmationScreen;
