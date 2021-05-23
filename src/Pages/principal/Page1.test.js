import React from 'react'
import {Page1} from "./Page1";
import {MovieElement} from "./../../components/principal/MovieElement";
//import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { configure,shallow,mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Principal', () => {
    it('check principal is div', () => {
      const wrapper = shallow(<Page1 />);
      expect(wrapper.is('div')).toBe(true);
  
    }); 








  })
  test('test1', () => {


  });