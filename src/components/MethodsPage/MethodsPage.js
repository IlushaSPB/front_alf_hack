import React, { useState, useRef } from 'react';
import { Button } from '@alfalab/core-components/button';
import { TitleDesktop, Text } from '@alfalab/core-components/typography';
import { Link } from '@alfalab/core-components/link';
import { useSelector } from 'react-redux';  // Используем useSelector для получения данных из Redux
import LogoIcon from '../LogoIcon';
import { LaptopPhoneMIcon } from '@alfalab/icons-glyph/LaptopPhoneMIcon';
import { MobilePhoneMIcon } from '@alfalab/icons-glyph/MobilePhoneMIcon';
import { PaypassMIcon } from '@alfalab/icons-glyph/PaypassMIcon';
import { MailMIcon } from '@alfalab/icons-glyph/MailMIcon';
import './MethodsPage.css';

const MethodsPage = () => {
    const [loading, setLoading] = useState(false);
    const [loadTimeout, setLoadTimeout] = useState(30);
    const timeoutId = useRef();

    // Получаем recommendedMethod из Redux и достаем его значение
    const recommendedMethod = useSelector((state) => state.recommendedMethod.recommendedMethod);
    console.log('Recommended Method:', recommendedMethod); // Для отладки

    // Функция для проверки, является ли метод рекомендованным
    const isRecommended = (method) => recommendedMethod === method;
    console.log('Is SMS recommended:', isRecommended('SMS')); // Для отладки

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
            </div>
        </div>
    );
};

export default MethodsPage;
