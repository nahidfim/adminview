import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import KitchenHome from "./screens/KitchenHome/KitchenHome";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen/OrderConfirmationScreen";
import ViewOrder from "./screens/ViewOrder/ViewOrder";
import DeliveryConfirmationScreen from "./screens/DeliveryConfirmationScreen/DeliveryConfirmationScreen";
import SignInSide from "./screens/LoginAndRegister/Login";
import SignUp from "./screens/LoginAndRegister/Register";
import ProductInfo from "./screens/ProductInfo/ProductInfo";
import CategoryMaster from "./screens/CategoryMaster/CategoryMaster";
import { useTranslation } from 'react-i18next'
import "./i18n.js";

function App() {
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [image, setImage] = useState("");
  const [sum, setSum] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

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
        <Tab label="LoginScreen"/>
        <Tab label="SignupScreen"/>
        <Tab label="ProductInfoScreen"/>
        <Tab label="CategoryMaster"/>
      </Tabs>
      <TabPanel value={value} index={0} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <KitchenHome setValue={setValue} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={1} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <OrderConfirmationScreen setValue={setValue} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={2} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ViewOrder setValue={setValue} setData={setData} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={3} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <DeliveryConfirmationScreen setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={4} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <SignInSide setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={5} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <SignUp setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={6} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ProductInfo setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={7} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <CategoryMaster setValue={setValue} data={data} t={t}/>
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
