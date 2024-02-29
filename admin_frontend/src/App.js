import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AdminHome from "./screens/AdminHome/AdminHome";
import AdminSignInSide from "./screens/AdminLoginAndRegister/Login";
import AdminSignUp from "./screens/AdminLoginAndRegister/Register";
import AdminControlScreen from "./screens/AdminControlScreen/AdminControlScreen";
import SattelementProcess from "./screens/SattelementProcess/SattelementProcess";
import TableSellsPdf from "./screens/TableSellsPdf/TableSellsPdf";
import TableSellsExcel from "./screens/TableSellsExcel/TableSellsExcel";
import ProductSellsPdf from "./screens/ProductSellsPdf/ProductSellsPdf";
import ProductSellsExcel from "./screens/ProductSellsExcel/ProductSellsExcel";
import { useTranslation } from 'react-i18next'
import "./i18n.js";
import axios from 'axios';
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
      </Tabs>
      <TabPanel value={value} index={0} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminHome setValue={setValue} t={t}/>
      </TabPanel>

      <TabPanel value={value} index={8} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminSignInSide setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={9} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminSignUp setValue={setValue} data={data} t={t}/>
      </TabPanel>

      <TabPanel value={value} index={10} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <AdminControlScreen setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={11} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <SattelementProcess setValue={setValue} data={data} t={t}/>
      </TabPanel>
      <TabPanel value={value} index={12} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <TableSellsPdf setValue={setValue} data={data} t={t}/>
      </TabPanel>

      <TabPanel value={value} index={13} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ProductSellsPdf setValue={setValue} data={data} t={t}/>
      </TabPanel>

      <TabPanel value={value} index={15} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <TableSellsExcel setValue={setValue} data={data} t={t}/>
      </TabPanel>

      <TabPanel value={value} index={16} sx={{ minWidth: "100%" }}>
        {/* Your content for Tab 1 goes here */}
        <ProductSellsExcel setValue={setValue} data={data} t={t}/>
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
