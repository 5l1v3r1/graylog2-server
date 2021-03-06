// @flow strict
import * as React from 'react';
import { fireEvent, render } from 'wrappedTestingLibrary';
import selectEvent from 'react-select-event';

import Select from './Select';

const option = (label) => ({ value: label, label });
const inputId = 'ourselect';

const WrappedSelect = (props) => (
  <form>
    <label htmlFor={inputId}>{inputId}</label>
    <Select {...props} inputId={inputId} />
  </form>
);

describe('Select', () => {
  it('ignores case per default', async () => {
    const options = [option('ALL UPPER'), option('all lower')];
    const { getByLabelText, getByText } = render((
      <WrappedSelect formName="ourselect" options={options} />
    ));

    const input = getByLabelText(inputId);

    await selectEvent.openMenu(input);

    fireEvent.change(input, { target: { value: 'all' } });

    expect(getByText('ALL UPPER')).not.toBeNull();
    expect(getByText('all lower')).not.toBeNull();
  });

  it('considers case if `ignoreCase` is `false`', async () => {
    const options = [option('ALL UPPER'), option('all lower')];
    const { getByLabelText, getByText, queryByText } = render((
      <WrappedSelect formName="ourselect" options={options} ignoreCase={false} />
    ));

    const input = getByLabelText(inputId);

    await selectEvent.openMenu(input);

    fireEvent.change(input, { target: { value: 'all' } });

    expect(queryByText('ALL UPPER')).toBeNull();
    expect(getByText('all lower')).not.toBeNull();

    fireEvent.change(input, { target: { value: 'ALL' } });

    expect(getByText('ALL UPPER')).not.toBeNull();
    expect(queryByText('all lower')).toBeNull();
  });

  it('does not ignore accents per default', async () => {
    const options = [option('Los Pollos Hermaños')];
    const { getByLabelText, getByText, queryByText } = render((
      <WrappedSelect formName="ourselect" options={options} />
    ));

    const input = getByLabelText(inputId);

    await selectEvent.openMenu(input);

    fireEvent.change(input, { target: { value: 'hermanos' } });

    expect(queryByText('Los Pollos Hermaños')).toBeNull();

    fireEvent.change(input, { target: { value: 'hermaños' } });

    expect(getByText('Los Pollos Hermaños')).not.toBeNull();
  });

  it('ignores accents if `ignoreAccents` is `true`', async () => {
    const options = [option('Los Pollos Hermaños')];
    const { getByLabelText, getByText } = render((
      <WrappedSelect formName="ourselect" options={options} ignoreAccents />
    ));

    const input = getByLabelText(inputId);

    await selectEvent.openMenu(input);

    fireEvent.change(input, { target: { value: 'hermanos' } });

    expect(getByText('Los Pollos Hermaños')).not.toBeNull();
  });
});
