'use client';

import { useReducer, useState } from 'react';
import styles from './page.module.css';

import Grid from '@/src/components/Grid/Grid';
import Form from '@/src/components/Form/Form';
import { initialState, reducer } from '@/src/reducers/reducer';
import { AppContext, AppDispatchContext } from '@/src/contexts/AppContext';

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [canEditForm, setCanEditForm] = useState(true);
  const [canEditGrid, setCanEditGrid] = useState(false);

  // const [gridTitle, setGridTitle] = useState('');

  return (
    <>
      <AppContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
          <div>
            <Form
              // gridTitle={gridTitle}
              canEditForm={canEditForm}
              setCanEditForm={setCanEditForm}
              setCanEditGrid={setCanEditGrid}
            />
          </div>
          <div className={styles.gridContainer}>
            <Grid
              // setGridTitle={setGridTitle}
              setCanEditGrid={setCanEditGrid}
              canEditGrid={canEditGrid}
              setCanEditForm={setCanEditForm}
            />
          </div>
        </AppDispatchContext.Provider>
      </AppContext.Provider>
    </>
  );
}
