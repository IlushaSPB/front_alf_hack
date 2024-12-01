import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import './MainPage.css';
import { Link } from '@alfalab/core-components/link';
import LogoIcon from '../LogoIcon';

const MainPage = () => {
    const [loading, setLoading] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(30);
    const timeoutId = useRef();

    const handleClick = () => {
        setLoading(true);
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setLoading(false);
        }, loadTimeout);
    };

    return (
        <div className="main-page">
            <header className="main-header">
                <TitleDesktop weight="bold" size="xlarge" style={{ display: 'flex' }}>
                    <LogoIcon style={{ width: '1em', height: '1em', marginRight: '8px' }} />
                    Бухгалтерия
                </TitleDesktop>
            </header>

            <div className="content">
                <Text size="medium" weight="regular" color="primary">
                    Здесь размещены все необходимые финансовые документы, отчёты и справки для вашей бухгалтерии.
                </Text>

                <div className="button-container">
                    {/* Кнопка с обработкой загрузки */}
                    <Button
                        view="primary" // Установим тип кнопки, например, primary
                        size="l" // Устанавливаем размер кнопки
                        onClick={handleClick}
                        loading={loading} // Отображаем лоадер при загрузке
                        disabled={loading} // Отключаем кнопку при загрузке
                    >
                        {loading ? "Загружается..." : "Скачать отчет"} {/* Текст кнопки в зависимости от состояния */}
                    </Button>

                    <div className="link-container">
                        <Link href="#" size="medium" weight="regular" target="_blank">
                            Ссылка на корпоративные модули
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
