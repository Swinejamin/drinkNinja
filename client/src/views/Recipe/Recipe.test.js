import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './Recipe';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Recipe />);
});