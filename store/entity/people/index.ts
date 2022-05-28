import { createModule } from 'saga-slice';
import { call, put, debounce } from 'redux-saga/effects';
import { getPeople } from '../../../services/people/get';
import { PeopleDTO, PeopleSlice } from './models';

export const peopleSlice = createModule<PeopleSlice>({
  name: 'people',
  initialState: {
    isLoading: undefined,
    isSuccess: undefined,
    isError: undefined,
    data: {
      people: undefined,
      size: 5,
    },
    error: undefined,
  } as PeopleSlice,
  reducers: {
    getPeople: (state: PeopleSlice) => {
      state.isLoading = true;
      state.isSuccess = undefined;
      state.isError = undefined;
    },
    getPeopleWithDebounce: () => {},
    fetchSuccess: (state: PeopleSlice, payload) => {
      state.isLoading = undefined;
      state.isSuccess = true;
      state.data = {
        ...state.data,
        people: payload.value,
      };
    },
    fetchFail: (state: PeopleSlice, payload) => {
      state.isLoading = undefined;
      state.isError = true;
      state.error = payload;
    },
    selectEvenRows: (state: PeopleSlice) => {
      state.data.people = state.data.people.filter((_, index) => index % 2);
    },
  },
  sagas: (Api) => ({
    *[Api.getPeople]() {
      yield requestApi(Api);
    },
    *[Api.getPeopleWithDebounce]() {
      yield debounceApi(Api);
    },
  }),
});

function* requestApi(Api) {
  {
    try {
      const data: PeopleDTO = yield call(getPeople);
      yield put(Api.fetchSuccess(data));
    } catch (e) {
      yield put(Api.fetchFail(e));
    }
  }
}

function* debounceApi(Api) {
  yield debounce(1000, Api.getPeopleWithDebounce, requestApi);
}

export const actions = peopleSlice.actions;
