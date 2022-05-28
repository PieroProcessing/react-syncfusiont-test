import { PeopleDTO } from '../../store/entity/people/models';
import { ENDPOINTS } from '../endpoints';

export const getPeople = async (): Promise<PeopleDTO> => {
  const promise = await fetch(ENDPOINTS.people);
  return await promise.json();
};
