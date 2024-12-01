import React, { useState } from 'react';
import { Button } from '@alfalab/core-components/button';
import { Text, TitleDesktop } from '@alfalab/core-components/typography';
import LogoIcon from "../LogoIcon";
import './Settings.css';

const Settings = () => {
    const [threshold, setThreshold] = useState(5); // Начальное значение 5
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSliderChange = (event) => {
        setThreshold(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/${threshold}`, {
                method: 'PUT',
            });

            if (response.ok) {
                alert('Настройка успешно обновлена!');
            } else {
                throw new Error('Неверное значение. Пожалуйста, выберите число от 2 до 10.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-page">
            <header className="main-header">
                <div className="logo-container">
                    <LogoIcon style={{ width: '3em', height: '3em', marginBottom: '8px' }} />
                    <TitleDesktop weight="bold" size="xlarge">
                        Настройки
                    </TitleDesktop>
                </div>
            </header>

            <div className="settings-container">
                <Text size="large" weight="bold">
                    Настройка частоты изменения способа подписания
                </Text>

                <div className="slider-container">
                    <Text size="medium" weight="regular">
                        Выберите частоту (от 2 до 10):
                    </Text>
                    <input
                        type="range"
                        min="2"
                        max="10"
                        value={threshold}
                        onChange={handleSliderChange}
                        className="slider"
                    />
                    <Text size="medium" weight="regular">
                        {threshold} итераций
                    </Text>
                </div>

                {error && <Text size="small" color="error">{error}</Text>}

                <Button
                    view="primary"
                    size="l"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                >
                    Сохранить настройки
                </Button>
            </div>
        </div>
    );
};

export default Settings;
