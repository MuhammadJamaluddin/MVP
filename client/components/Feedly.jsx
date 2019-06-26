import React from 'react';
import {
  Tabs,
  TabList,
  TabPanel,
  Tab,
} from 'react-re-super-tabs';
import CustomTab from './CustomTab';
import Search from './Search';
import NewsFeed from './NewsFeed';

const Feedly = () => (
  <div>
    <Tabs activeTab="search">
      <TabList>
        <Tab component={CustomTab} label="Search" id="search" />
        <Tab component={CustomTab} label="News Feed" id="newsFeed" />
      </TabList>
      <TabList>
        <TabPanel component={Search} id="search" />
        <TabPanel component={NewsFeed} id="newsFeed" />
      </TabList>
    </Tabs>
  </div>
);

export default Feedly;
