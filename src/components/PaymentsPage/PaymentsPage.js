import LogoIcon from '../LogoIcon';
import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import { useDispatch } from 'react-redux';
import { setRecommendedMethod } from '../../store/recommendedMethodSlice'; // Импортируем экшн для Redux
import './PaymentsPage.css';

const PaymentsPage = () => {
    const [loadingState, setLoadingState] = useState({}); // Изменяем состояние для каждой кнопки
    const [loadTimeout, setLoadTimeout] = useState(30);
    const [error, setError] = useState(null);
    const [recommendedMethod, setRecommendedMethodState] = useState(null); // Для хранения рекомендованного метода
    const [recommendationText, setRecommendationText] = useState(""); // Для текста рекомендации
    const timeoutId = useRef();
    const dispatch = useDispatch();

    const recommendationDict = {
        QDSToken: "Кэп на токене",
        PayControl: "Приложение Альфа-Бизнес",
        QDSMobile: "КЭП в приложении",
    };

    // Маппинг значений для useContext
    const contextValues = {
        base_operation_signature: {
            clientId: "1",
            organizationId: "11",
            segment: "Малый бизнес",
            role: "Сотрудник",
            organizations: 1,
            currentMethod: "SMS",
            mobileApp: true,
            signatures: {
                common: { mobile: 5, web: 7 },
                special: { mobile: 2, web: 5 },
            },
            availableMethods: ["SMS"],
            claims: 3,
        },
        big_operation_signature: {
            clientId: "2",
            organizationId: "22",
            segment: "Большой бизнес",
            role: "ЕИО",
            organizations: 32,
            currentMethod: "SMS",
            mobileApp: true,
            signatures: {
                common: { mobile: 89, web: 81 },
                special: { mobile: 27, web: 64 },
            },
            availableMethods: ["SMS"],
            claims: 13,
        },
        sms_failure: {
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

    const handleClick = (context) => {
        setLoadingState((prevState) => ({
            ...prevState,
            [context]: true,
        }));
        setError(null);
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setLoadingState((prevState) => ({
                ...prevState,
                [context]: false,
            }));
        }, loadTimeout);

        if (!contextValues[context]) {
            setError("400 Bad Request");
            setLoadingState((prevState) => ({
                ...prevState,
                [context]: false,
            }));
            return;
        }

        const body = contextValues[context];
        const apiUrl = process.env.REACT_APP_API_URL;

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
                dispatch(setRecommendedMethod(method)); // Сохраняем метод в Redux
                setRecommendedMethodState(method); // Обновляем локальное состояние
                setRecommendationText(recommendationDict[method] || "Не найдено"); // Обновляем текст рекомендации
                setLoadingState((prevState) => ({
                    ...prevState,
                    [context]: false,
                }));
            })
            .catch((error) => {
                setError(error.message);
                setLoadingState((prevState) => ({
                    ...prevState,
                    [context]: false,
                }));
            });
    };

    return (
        <div className="main-page">
            <header className="main-header">
                <div className="logo-container">
                    <LogoIcon style={{ width: '3em', height: '3em', marginBottom: '8px' }} />
                    <TitleDesktop weight="bold" size="xlarge" style={{ display: 'flex' }}>
                        Платежи в работе
                    </TitleDesktop>
                </div>
            </header>

            <div className="content">
                {error && (
                    <Text size="medium" weight="regular" color="danger">
                        Ошибка: {error}
                    </Text>
                )}

                {/* Отображаем рекомендованный метод, если он есть */}
                {recommendedMethod && recommendationText && (
                    <div className="recommendation-card">
                        <Text size="medium" weight="bold" color="primary">
                            Рекомендуем вам новый способ подписания: {recommendationText}
                        </Text>
                    </div>
                )}

                <div className="payment-list">
                    {Object.keys(contextValues).map((context) => {
                        const data = contextValues[context];
                        return (
                            <div key={context} className="payment-item">
                                <div className="payment-header">
                                    <h3>{data.segment}</h3>
                                </div>
                                <Button
                                    view="primary"
                                    size="l"
                                    onClick={() => handleClick(context)}
                                    loading={loadingState[context] || false}
                                    disabled={loadingState[context] || false}
                                >
                                    {loadingState[context] ? "Загружается..." : `Подписать`}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;



// change_signature_method: {
//     clientId: "4",
//     organizationId: "44",
//     segment: "Средний бизнес",
//     role: "Сотрудник",
//     organizations: 6,
//     currentMethod: "SMS",
//     mobileApp: true,
//     signatures: {
//         common: { mobile: 13, web: 13 },
//         special: { mobile: 11, web: 11 },
//     },
//     availableMethods: ["SMS"],
//     claims: 9,
// },
