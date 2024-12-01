import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import { useSelector, useDispatch } from 'react-redux';
import LogoIcon from '../LogoIcon';
import { LaptopPhoneMIcon } from '@alfalab/icons-glyph/LaptopPhoneMIcon';
import { MobilePhoneMIcon } from '@alfalab/icons-glyph/MobilePhoneMIcon';
import { PaypassMIcon } from '@alfalab/icons-glyph/PaypassMIcon';
import { MailMIcon } from '@alfalab/icons-glyph/MailMIcon';
import { setRecommendedMethod } from '../../store/recommendedMethodSlice'; // Импортируем экшн для Redux
import './MethodsPage.css';

// Словарь для отображения текста для каждого метода
const recommendationDict = {
    QDSToken: "Кэп на токене",
    PayControl: "Приложение Альфа-Бизнес",
    QDSMobile: "КЭП в приложении",
};

const MethodsPage = () => {
    const [loading, setLoading] = useState(false);  // Стейт для лоадера
    const [recommendedMethodState, setRecommendedMethodState] = useState(null);  // Локальное состояние для рекомендованного метода
    const [recommendationText, setRecommendationText] = useState("");  // Текст для отображения рекомендации
    const [error, setError] = useState(null);  // Стейт для ошибки
    const timeoutId = useRef();
    const dispatch = useDispatch();  // Используем dispatch

    // Получаем метод из Redux для проверки, является ли он рекомендованным
    const reduxRecommendedMethod = useSelector((state) => state.recommendedMethod.recommendedMethod);
    console.log('Recommended Method:', reduxRecommendedMethod);  // Для отладки

    // Функция для проверки, является ли метод рекомендованным
    const isRecommended = (method) => reduxRecommendedMethod === method;

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
        const context = 'change_signature_method';
        setLoading(true);
        setError(null);

        const body = contextValues[context];
        const apiUrl = process.env.REACT_APP_API_URL;

        // Запрос на сервер
        fetch(`${apiUrl}?useContext=${context}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('400 Bad Request');
                }
                return response.json();
            })
            .then((data) => {
                const method = data.recommendedMethod;
                if (method === "NoRecommendedMethod") {
                    return; // Прерываем выполнение дальнейших действий
                }
                dispatch(setRecommendedMethod(method));  // Сохраняем метод в Redux
                setRecommendedMethodState(method);  // Обновляем локальное состояние
                setRecommendationText(recommendationDict[method] || "Не найдено");  // Обновляем текст рекомендации
                setLoading(false);  // Убираем загрузку
            })
            .catch((error) => {
                setError(error.message);  // Обрабатываем ошибку
                setLoading(false);  // Убираем загрузку
            });
    };

    return (
        <div className="main-page">
            <header className="main-header">
                <div className="logo-container">
                    <LogoIcon style={{ width: '3em', height: '3em', marginBottom: '8px' }} />
                    <TitleDesktop weight="bold" size="xlarge" style={{ display: 'flex' }}>
                        Способы подписания
                    </TitleDesktop>
                </div>
            </header>

            <Text size="small" color="green" className="recommended-text">
                Рекомендованный способ <span className="highlight">отмечен зелёным</span> цветом.
            </Text>

            <div className="content">
                <div className="card-container">
                    {/* Кэп на токене */}
                    <div className={`method-card ${isRecommended('QDSToken') ? 'recommended' : ''}`}>
                        <LaptopPhoneMIcon height={50} width={50} style={isRecommended('QDSToken') ? { fill: 'green' } : {}} />
                        <Text size="medium" weight="regular" className="method-title">
                            Кэп на токене
                        </Text>
                        <Text size="small" weight="regular" className="method-description">
                            Понадобится компьютер и токен с сертификатом удостоверяющего центра.
                        </Text>
                    </div>

                    {/* Приложение Альфа-Бизнес */}
                    <div className={`method-card ${isRecommended('PayControl') ? 'recommended' : ''}`}>
                        <MobilePhoneMIcon height={50} width={50} style={isRecommended('PayControl') ? { fill: 'green' } : {}} />
                        <Text size="medium" weight="regular" className="method-title">
                            Приложение Альфа-Бизнес
                        </Text>
                        <Text size="small" weight="regular" className="method-description">
                            Понадобится смартфон с приложением Альфа-Бизнес.
                        </Text>
                    </div>

                    {/* КЭП в приложении */}
                    <div className={`method-card ${isRecommended('QDSMobile') ? 'recommended' : ''}`}>
                        <PaypassMIcon height={50} width={50} style={isRecommended('QDSMobile') ? { fill: 'green' } : {}} />
                        <Text size="medium" weight="regular" className="method-title">
                            КЭП в приложении
                        </Text>
                        <Text size="small" weight="regular" className="method-description">
                            Понадобится смартфон с приложением и токен NFC.
                        </Text>
                    </div>

                    {/* СМС */}
                    <div className={`method-card ${isRecommended('SMS') ? 'recommended' : ''}`}>
                        <MailMIcon height={50} width={50} style={isRecommended('SMS') ? { fill: 'green' } : {}} />
                        <Text size="medium" weight="regular" className="method-title">
                            СМС
                        </Text>
                        <Text size="small" weight="regular" className="method-description">
                            Понадобится смартфон с доступом к СМС.
                        </Text>
                    </div>
                </div>

                {/* Кнопка для порекомендовать способ подписания */}
                <div className="button-container">
                    <Button
                        view="primary"
                        size="l"
                        onClick={handleRecommendClick}
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? "Загружается..." : "Порекомендовать способ подписания"}
                    </Button>

                    {recommendationText && (
                        <Text size="medium" weight="bold" color="primary" className="recommendation-text">
                            Рекомендуем вам новый способ подписания: {recommendationText}
                        </Text>
                    )}

                    {error && (
                        <Text size="medium" weight="regular" color="danger">
                            Ошибка: {error}
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MethodsPage;
