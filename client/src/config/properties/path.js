import * as React from 'react';
import HomePage from '../../pages/HomePage';

function HomePageElement() {
    return (
        <HomePage />
    )
}

export const routes = [
    {
        path: '/',
        component: <HomePageElement />,
    },
    {
        path: '*',
        component: <p>Not Found</p>,
    },
];