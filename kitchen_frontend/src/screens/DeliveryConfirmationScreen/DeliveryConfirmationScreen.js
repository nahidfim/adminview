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

const DeliveryConfirmationScreen = ({ setValue , data}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [language, setLanguage] = React.useState("English")
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleViewOrder = () => {
    fetch('/change_status/' + data.order_no).then((response) => {return response.json();}).then((data) => {
      console.log(data);
      return data
    });
    setValue(2);
  };

  return (
    <Container className={styles.outermostContainer}>
      <Box className={styles.tableNumber}>
      <Typography variant="h5"> Lan No. : {data.lane_no}</Typography>
      <Typography variant="h5"> Table No. : {data.table_no}</Typography>
      <Typography variant="h5"> Product code : {data.product_code}</Typography>
      <Typography variant="h5"> Quantity : {data.order_amount}</Typography>
     
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
