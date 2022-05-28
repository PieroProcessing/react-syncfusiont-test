import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart } from '@fortawesome/free-regular-svg-icons';

export const templateCell =
  (field: string) =>
  ({ Gender, Emails, ...Others }) =>
    field === 'Gender' ? (
      <FontAwesomeIcon icon={Gender === 'Male' ? faThumbsUp : faHeart} />
    ) : field === 'Emails' ? (
      Emails?.length ? (
        <ul>
          {Emails?.map((email, i) => (
            <li key={i}>{email}</li>
          ))}
        </ul>
      ) : (
        <div> - </div>
      )
    ) : (
      <div>{Others[field] ?? '-'}</div>
    );
