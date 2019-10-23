const AllTabProps = index => {
    return {
        id: `full-width-tab-${index}`,
        key: index,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default AllTabProps;