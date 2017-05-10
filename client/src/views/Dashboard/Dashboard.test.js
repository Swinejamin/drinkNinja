import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Dashboard />);
});