import React from 'react'
import { Link } from 'react-router-dom'
import {
    PlusCircleIcon
} from "@heroicons/react/outline"
import { TabPanel, useTabs } from "react-headless-tabs";
import { ThemeColorGray } from "src/components/Constants/constants"
import Controllers from 'src/Controllers';


const CreateServices = () => {
    const items = ["1.Service details", "2.Intake form"];
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
        <div className={`${ThemeColorGray} w-full`}>
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
                    &nbsp;
                    &gt;
                    &nbsp;
                    <Link to="/dashboard/services/create">
                        Create
                    </Link>
                </div>
                <div>
                    <span className='w-1/5 text-3xl font-bold'>Create Service</span>
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
                                left: `calc((100% / ${items.length}) * ${getSelectedTabIndex()}`,
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
                                            background: "#fff",
                                            textDecoration: "none",
                                            textAlign: "center",
                                            fontWeight: "500",
                                            color: selectedTab === item ? "rgb(99 102 241)" : "gray",
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
                            background: "#fff",
                            marginTop: "15px"
                        }}
                    >

                        <TabPanel key={0} hidden={selectedTab !== "1.Service details"}>
                            <div className='border-b-2'>
                                <h1 className='text-2xl font-semibold py-2'>Service details</h1>
                            </div>
                            <div className='grid grid-cols-2 gap-2 border-b-2'>
                                <div>
                                    <form>
                                        <Controllers.Input label="Service Name" />
                                        <Controllers.TextArea label="Description" />
                                    </form>
                                </div>
                                <div className='flex h-32 justify-between my-10'>
                                    <div className='py-5 px-5 text-center'>
                                        No item to preview
                                    </div>
                                    <div className='border p-2'>
                                        <p>Image </p>
                                        <p>Recommended: 390x190 px </p>
                                        <button className='p-2 mx-5 border whitespace-nowrap rounded-md'>Upload Image</button>
                                    </div>
                                </div>
                            </div>
                            <div className='pt-5'>
                                <span className='font-semibold text-gray-700 '>Pricing Details</span>
                            </div>
                            <div className='w-1/2'>
                                <Controllers.Select label="Type" options={[
                                    {
                                        id: 1, name: "One-off",

                                    },
                                    {
                                        id: 2, name: "Recurring",

                                    },
                                ]} />
                            </div>
                            <div className='flex justify-between'>
                                <button className='border py-2 px-3 rounded-md font-semibold'>
                                    Cancel
                                </button>
                                <button className='border bg-indigo-500 text-white py-2 px-3 rounded-md font-semibold'>
                                    Create
                                </button>
                            </div>
                        </TabPanel>
                        <TabPanel key={1} hidden={selectedTab !== "2.Intake form"}>
                            <div>
                                <h1>This is where you create services. Once created, you can add the link to your website or share it directly with clients so they can complete the check out process and payment.</h1>
                                <div className='text-center py-5'>
                                    <button className='py-3 px-2 bg-indigo-500 text-white rounded-md'>Create Services</button>
                                </div>
                            </div>
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateServices