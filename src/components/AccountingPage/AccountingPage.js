import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import LogoIcon from '../LogoIcon';
import './AccountingPage.css'; // Импорт стилей для Бухгалтерии

const AccountingPage = () => {
    const [loading, setLoading] = useState(false);  // Стейт загрузки для кнопки
    const [recommendedMethod, setRecommendedMethod] = useState(null);  // Стейт для рекомендованного метода
    const [recommendationText, setRecommendationText] = useState("");  // Стейт для текста рекомендации
    const [error, setError] = useState(null);  // Стейт для ошибок

    const timeoutId = useRef();

    // Словарь для отображения текста, соответствующего каждому методу
    const recommendationDict = {
        QDSToken: "Кэп на токене",
        PayControl: "Приложение Альфа-Бизнес",
        QDSMobile: "КЭП в приложении",
    };

    const contextValues = {
        change_signature_method: {
            clientId: "4",
            organizationId: "44",
            segment: "Средний бизнес",
            role: "Сотрудник",
            organizations: 6,
            currentMethod: "SMS",
            mobileApp: true,
            signatures: {
                common: { mobile: 13, web: 13 },
                special: { mobile: 11, web: 11 },
            },
            availableMethods: ["SMS"],
            claims: 9,
        },
    };

    const handleRecommendClick = () => {
        setLoading(true);
        setError(null);

        const body = contextValues.change_signature_method;
        const apiUrl = process.env.REACT_APP_API_URL;

        fetch(`${apiUrl}?useContext=change_signature_method`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }
                return response.json();
            })
            .then((data) => {
                const method = data.recommendedMethod;
                if (method === "NoRecommendedMethod") {
                    return; // Прерываем выполнение дальнейших действий
                }
                setRecommendedMethod(method); // Устанавливаем рекомендованный метод
                setRecommendationText(recommendationDict[method] || "Не найдено"); // Обновляем текст рекомендации
                setLoading(false); // Закрываем лоадер
            })
            .catch((error) => {
                setError(error.message); // Обработка ошибок
                setLoading(false); // Закрываем лоадер в случае ошибки
            });
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

                {/* Ошибка, если есть */}
                {error && (
                    <Text size="medium" weight="regular" color="danger">
                        <p> Ошибка: {error} </p>
                    </Text>
                )}

                <div className="button-container">
                    {/* Кнопка для порекомендовать способ подписания */}
                    {!recommendedMethod && (
                        <Button
                            view="primary" // Установим тип кнопки, например, primary
                            size="l" // Устанавливаем размер кнопки
                            onClick={handleRecommendClick}
                            loading={loading} // Отображаем лоадер при загрузке
                            disabled={loading} // Отключаем кнопку при загрузке
                        >
                            {loading ? "Загружается..." : "Порекомендовать способ подписания"}
                        </Button>
                    )}

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
