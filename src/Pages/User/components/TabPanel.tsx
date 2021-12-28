import React from 'react'

interface TabPanelProps {
    value: number,
    index: number,
    children?: React.ReactNode
}

const TabPanel:React.FC<TabPanelProps> = ({value, index, children}): React.ReactElement => {
    return (
        <div hidden={value !== index} id={`tab-panel${index}`}>{children}</div>
    )
};

export default TabPanel