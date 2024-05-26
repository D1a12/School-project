import { useDispatch, useSelector } from 'react-redux'; 
import { useState } from 'react';

import { setWeather } from './features/slices/weatherSlice';

import './style.scss';
import { Icon } from './icons/Icon';
import Cities from './Components/Cities';

const App = () => {
    const dispatch = useDispatch();

    const location = useSelector(state => state.weather.location);
    const current = useSelector(state => state.weather.current);

    const isSuccesful = useSelector(state => state.weather.isSuccesful);
    const isLoading = useSelector(state => state.weather.isLoading);
    const isError = useSelector(state => state.weather.isError);

    const [form, setForm] = useState({
        location: ''
    });

    const handleUpdateForm = (formType, formName) => {
        setForm({
            ...form,
            [formType]: formName
        });
    }

    const handleGetWeather = () => {
        dispatch(setWeather(form.location));
    }

    const mostPopularCities = ['Нью Йорк', 'Сан Франциско', 'Лос Анджелес'];
 
    return (
        <div className='container'>
            <div className="weather-block">
                <div className="flex">
                    <input className='input' type="text" placeholder='Введіть ваше місто' onChange={(e) => handleUpdateForm('location', e.target.value)}/>
                    <button className='button' onClick={handleGetWeather}>Пошук</button>
                </div>
                { isSuccesful && 
                        <div className="info">
                        <h1>{location.country}</h1>
                        <h3>{location.name}, {location.region}</h3>
                        <div>
                            <p>Темепратура: {current.temp_c}</p>
                            <p>Відчувається як: {current.feelslike_c}</p>
                            <p>Швидкість вітру в км/год: {current.wind_kph}</p>
                        </div>
                    </div> }
                    { isLoading && 
                        <div className="info">
                            <Icon/>
                        </div>
                    }
                    { isError &&
                        <div className="info">
                            <h1>Ой! Здається, щось пішло не за планом...</h1>
                        </div>
                    }

                    <div className='ul'>
                        <Cities cities={mostPopularCities}/>
                    </div>

            </div>
        </div>
    );
}

export default App;