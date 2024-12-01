// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favicon from 'react-favicon';
import './App.css';
import AccountingPage from './components/AccountingPage/AccountingPage';
import PaymentsPage from './components/PaymentsPage/PaymentsPage';
import MethodsPage from './components/MethodsPage/MethodsPage';
import Settings from './components/Settings/Settings';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
    return (
        <Router>
            <div className="App">
                <Favicon url="https://habrastorage.org/getpro/moikrug/uploads/company/882/866/955/logo/medium_98240912ba85287d699989be4fdde631.jpg" />
                {/* Сайдбар будет всегда виден */}
                <Sidebar />

                {/* Контент страницы */}
                <div className="content-container">
                    <Routes>
                        <Route path="/accounting" element={<AccountingPage />} />
                        <Route path="/payments" element={<PaymentsPage />} />
                        <Route path="/methods" element={<MethodsPage />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
