import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import KitchenHome from "./screens/KitchenHome/KitchenHome";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen/OrderConfirmationScreen";
import ViewOrder from "./screens/ViewOrder/ViewOrder";
import DeliveryConfirmationScreen from "./screens/DeliveryConfirmationScreen/DeliveryConfirmationScreen";
function App() {
  const [value, setValue] = useState(0);
  const [image, setImage] = useState("");
  const [sum, setSum] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      {/* <Avatar sx={{ bgcolor: "red" }}>
        <LocalDiningIcon />
      </Avatar> */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable auto tabs example"
        sx={{backgroundColor:"lightblue", display:"none"}}
      >
        <Tab label="Homekitchen" />
        <Tab label="OrderConfirmationScreen" />
        <Tab label="ViewOrder" />
        <Tab label="DeliveryConfirmationScreen" />
      </Tabs>
      <TabPanel value={value} index={0} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <KitchenHome setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <OrderConfirmationScreen setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={2} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ViewOrder setValue={setValue}/>
      </TabPanel>
      <TabPanel value={value} index={3} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <DeliveryConfirmationScreen setValue={setValue}/>
      </TabPanel>

      <Box sx={{ p: 3 }}>{/* Your content goes here */}</Box>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default App;
