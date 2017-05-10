import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from './Recipe';
import {MemoryRouter} from 'react-router-dom'
import {shallow} from 'enzyme';

it('renders without crashing', () => {
    const fakeMatch = {
        params: {
            id: 'k27'
        }
    }
    shallow(<Recipe match={fakeMatch}/>);
});