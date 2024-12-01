import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { useSelector } from 'react-redux';  // Используем useSelector для получения данных из Redux
import LogoIcon from '../LogoIcon';
import './AccountingPage.css'; // Импорт стилей для Бухгалтерии

const AccountingPage = () => {
    const [loading, setLoading] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(30);
    const timeoutId = useRef();

    // Получаем recommendedMethod из Redux
    const recommendedMethod = useSelector((state) => state.recommendedMethod.recommendedMethod);
    console.log(recommendedMethod);
    // Словарь для отображения текста, соответствующего каждому методу
    const recommendationDict = {
        QDSToken: "Кэп на токене",
        PayControl: "Приложение Альфа-Бизнес",
        QDSMobile: "КЭП в приложении",
        SMS: "СМС"
    };

    // Получаем соответствующий текст для рекомендованного метода
    const recommendationText = recommendationDict[recommendedMethod];

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
                <div className="logo-container">
                    <LogoIcon style={{ width: '3em', height: '3em', marginBottom: '8px' }} />
                    <TitleDesktop weight="bold" size="xlarge">
                        Бухгалтерия
                    </TitleDesktop>
                </div>
            </header>
            {/* Карточка с рекомендацией */}
            {recommendedMethod && recommendationText && (
                <div className="recommendation-card">
                    <Text size="medium" weight="bold" color="primary">
                        Рекомендуем вам новый способ подписания: {recommendationText}
                    </Text>
                </div>
            )}
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
                        {loading ? "Загружается..." : "Скачать отчет"}
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

export default AccountingPage;
