import { useState } from "react";

const useTabs = () => {
    const [value, setValue] = useState(0);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return {
        value,
        handleChangeTab
    }
}

export default useTabs