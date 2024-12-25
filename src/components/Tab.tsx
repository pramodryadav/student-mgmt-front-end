import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



interface TabProps {
    tabs: { label: string; content: React.ReactNode }[];
    value: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void
}

export default function BasicTabs(props: TabProps) {

    const { tabs, value, handleChange } = props;

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {
                        tabs.map((tab, index) => <Tab key={tab.label} label={tab.label} {...a11yProps(index)} />)
                    }


                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
                <CustomTabPanel key={tab.label} value={value} index={index}>
                    {tab.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
