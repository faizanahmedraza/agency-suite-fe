import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
    PlusCircleIcon
} from "@heroicons/react/outline"
import { TabPanel, useTabs } from "react-headless-tabs";


const Services = () => {
    const items = ["All", "Active", "One-off", "Subscription"];
    const [selectedTab, setSelectedTab] = useTabs(items);

    const changeTab = (e) => {
        e.preventDefault();
        const target = (e.target).dataset.tab;
        if (typeof target !== "string") {
            return;
        }
        setSelectedTab(target);
    };
    const getSelectedTabIndex = () => items.findIndex((item) => item === selectedTab);

    return (
        <div className='bg-gray-50 w-full'>
            <div className='container px-6'>
                <div className='py-5 text-gray-500 font-semibold'>
                    <Link to="/dashboard">
                        Dashboard
                    </Link >
                    &nbsp;
                    &gt;
                    &nbsp;
                    <Link to="/dashboard/services">
                        Services
                    </Link>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    <span className='w-1/5 text-3xl font-bold'>Services</span>
                    <button className='bg-white text-gray-600 font-semibold rounded-md shadow-sm  px-3 py-3'>Manage discount coupons</button>
                    <button className='bg-white text-gray-600 font-semibold rounded-md shadow-sm  px-3 py-3'>Preview service catalog</button>
                    <button className='bg-indigo-600 text-white font-semibold rounded-md shadow-sm  px-3 py-3'>Create service</button>
                </div>
                <div className='bg-white mt-5 py-5 '>
                    <Link to="/dashboard" className='flex justify-between'>
                        <span className='px-5 text-2xl text-indigo-500 font-semibold'>Get Started</span>
                        <span className='w-6 mx-3 text-gray-500'><PlusCircleIcon /></span>
                    </Link>
                </div>
                <div className='py-5'>
                        <nav
                            style={{
                                position: "relative"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    left: `calc((100% / ${items.length}) * ${getSelectedTabIndex()})`,
                                    height: "2px",
                                    width: `calc(100% / ${items.length})`,
                                    background: "rgb(99 102 241)",
                                    transition: "all ease 0.2s"
                                }}
                            />
                            <div
                                style={{
                                    display: "flex"
                                }}
                            >
                                {items.map((item) => {
                                    return (
                                        <a
                                            href="#tab"
                                            key={item}
                                            style={{
                                                flexGrow: 1,
                                                display: "block",
                                                padding: "1rem",
                                                textDecoration: "none",
                                                color: selectedTab === item ? "rgb(99 102 241)" : "black",
                                            }}
                                            onClick={changeTab}
                                            data-tab={item}
                                        >
                                            {item}
                                        </a>
                                    );
                                })}
                            </div>
                        </nav>
                        <div
                            style={{
                                padding: "2rem",
                                background: "#ececec"
                            }}
                        >
                            {items.map((item) => {
                                return (
                                    <TabPanel key={item} hidden={selectedTab !== item}>
                                        {item}
                                    </TabPanel>
                                );
                            })}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Services