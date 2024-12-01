import React, { useState, useEffect } from 'react';
import { CalculatorMIcon } from '@alfalab/icons-glyph/CalculatorMIcon';
import { ArrowsRightLeftCurvedMediumMIcon } from '@alfalab/icons-glyph/ArrowsRightLeftCurvedMediumMIcon';
import { GearLineMIcon } from '@alfalab/icons-glyph/GearLineMIcon';
import { CalendarMIcon } from '@alfalab/icons-glyph/CalendarMIcon';
import './Sidebar.css';

const Sidebar = () => {
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
            setCollapsed(JSON.parse(savedState));
        }
        setLoading(false);
    }, []);

    const toggleSidebar = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    };

    if (loading) return null; // Или можно показывать лоадер

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${!loading ? 'visible' : ''}`} >
            <div className="logo-container" onClick={toggleSidebar}>
                <img src={process.env.PUBLIC_URL + '/logo-alfabank.svg'} alt="Logo" className="sidebar-logo"/>
            </div>
            <div className="tabs">
                <a href="/accounting" className="sidebar-tab">
                    <CalculatorMIcon height={30} width={30}/>
                    {!collapsed && <span>Бухгалтерия</span>}
                </a>
                <a href="/payments" className="sidebar-tab">
                    <ArrowsRightLeftCurvedMediumMIcon height={30} width={30}/>
                    {!collapsed && <span>Платежи в работе</span>}
                </a>
                <a href="/methods" className="sidebar-tab">
                    <CalendarMIcon height={30} width={30}/>
                    {!collapsed && <span>Способы подписания</span>}
                </a>
                <a href="/settings" className="sidebar-tab">
                    <GearLineMIcon height={30} width={30}/>
                    {!collapsed && <span>Настройки</span>}
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
