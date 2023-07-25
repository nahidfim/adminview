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

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(2);
  };
  const handleDeliveryConfirmationScreen = () => {
    setValue(3);
  };
  return (
    <Container className={styles.outermostContainer}>
     <Box className={styles.headerContent}>
     </Box>
      <Box className={styles.ButtonGroup}>
     
      <Box className={styles.secondBox}>
      <Typography variant="h5"> Operater Code :XXXXXX</Typography>
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
