import React from 'react';
import { shallow } from 'enzyme';
import FormComp from '.';
import { fireEvent } from '@testing-library/react';


describe('Form Test', () => {
    let wrapper;
    // const setState = jest.fn();
    // const useStateSpy = jest.spyOn(React, "useState")
    // useStateSpy.mockImplementation((init) => [init, setState]);

    it('renders without crashing', () => {
        expect(shallow(<FormComp />)).toMatchSnapshot();
    });

    beforeEach(() => {
        wrapper = shallow(<FormComp />);
        // wrapper.toMatchSnapshot();
        // console.log(wrapper.state())
    });
    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    // eslint-disable-next-line jest/no-identical-title
    it("renders without crashing", () => {
        expect(shallow(<FormComp />)).toMatchSnapshot();
    });

    it("check field values", () => {
        const fname = wrapper.find("input[name='fname']");
        fname.value = "test";
        // fname.simulate('change', { target: { name: 'fname', value: "test" } });
        // fireEvent.change(fname);
        console.log(wrapper, "simulate");
        // wrapper.find('[id="submit"]').click  
        expect(fname.value).toEqual("test");
    })
});
