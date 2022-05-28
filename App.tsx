import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from './store';
import { actions } from './store/entity';

import { Grid, Accordion } from './components';

import './style/index';
import './style/SyncFusion.css';

export default function App() {
  const dispatch = useDispatch();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data: { people, size } = {},
  } = useSelector((state: RootState) => state.people);
  React.useEffect(() => {
    dispatch(actions.getPeople());
  }, []);
  return (
    <div>
      <h1>Grid Test</h1>
      {!isLoading && isSuccess && (
        <Accordion header="Peoples">
          <Grid data={people} size={size} />
        </Accordion>
      )}
    </div>
  );
}
