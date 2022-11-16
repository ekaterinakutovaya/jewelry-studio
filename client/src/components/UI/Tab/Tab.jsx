import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedTab } from "../../../store/FilterSlice";

import styles from "./Tab.module.scss";

const Tab = ({tabs, onClick}) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const { category } = useSelector(state => state.filter);

    useEffect(() => {
        setActiveTab(category);
    }, [])

    const onSelectTab = (index) => {
        setActiveTab(index);
        dispatch(changeSelectedTab(index));
    };

    return (
        <ul className={styles.tab}>
            {tabs &&
                tabs.map((tab, index) =>
                    <li
                        key={tab.value}
                        className={activeTab === index ? `${styles.item} ${styles.activeTab}` : styles.item}
                        onClick={() => onSelectTab(index)}
                    >
                        {tab.label}
                    </li>
                )
            }
        </ul>
    );
};

export default Tab;