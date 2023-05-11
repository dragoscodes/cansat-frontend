import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import XPanel from './Panels/XPanel';
import YPanel from './Panels/YPanel';
import ZPanel from './Panels/ZPanel';
import UPanel from './Panels/UPanel';
import VPanel from './Panels/VPanel';

//If you want to defer rendering of each tab until that tab is selected, you can use the isLazy prop.
function TabMenu(props) {
  return (
    <Tabs size="md" align="center">
      <TabList>
        <Tab>X</Tab>
        <Tab>Y</Tab>
        <Tab>Z</Tab>
        <Tab>U</Tab>
        <Tab>V</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <XPanel {...props}/>
        </TabPanel>
        <TabPanel>
          <YPanel {...props}/>
        </TabPanel>
        <TabPanel>
          <ZPanel {...props}/>
        </TabPanel>
        <TabPanel>
          <UPanel {...props}/>
        </TabPanel>
        <TabPanel>
          <VPanel {...props}/>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default TabMenu;
