import React from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./DeliveryConfirmationScreen.module.css";
import image from "../../static/Images/nigiri3.jpg";

const DeliveryConfirmationScreen = ({ setValue }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [language, setLanguage] = React.useState("English")
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    setValue(2);
  };

  return (
    <Container className={styles.outermostContainer}>
      <Box className={styles.tableNumber}>
      <Typography variant="h5"> Lan No. :1</Typography>
      <Typography variant="h5"> Tabe No. :4</Typography>
      <Typography variant="h5"> Item Name. :Item1</Typography>
      <Typography variant="h5"> Quantity. :2</Typography>
     
      <Box className={styles.firstBox}> 
      <img src={image} alt="img"/>
     </Box>
     
      </Box>
     
      <Box className={styles.secondBox}>
     
      <Button
            variant="large"
            className={styles.lightgreenButton}
            onClick={handleViewOrder}
          >
            Update/View Order
          </Button>
          <Button
            variant="large"
            className={styles.lightblueButton}
            onClick={handleViewOrder}
          >
           No
          </Button>
         
         
      
      </Box>
    </Container>
  );
};

export default DeliveryConfirmationScreen;
