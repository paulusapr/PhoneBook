import React from 'react'
import { FormContact } from 'components';
import { css } from '@emotion/css'
import { useLayoutContext, Navigation } from 'components';
import { getDetailContact, PhoneType } from 'services/persons';
import { PayloadType } from 'components';

const DetailContainer = () => {
  const { navigate, id } = useLayoutContext();
  const { data } = getDetailContact(Number(id));

  const defaultValue: PayloadType = {
    first_name: data?.contact_by_pk?.first_name,
    last_name: data?.contact_by_pk?.last_name,
    phones: data?.contact_by_pk?.phones.map((phone: PhoneType) => phone.number),
  };

  return (
    <>
      <div className={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 10px;
      `}>
        <button type='button' className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            margin-left: 5px;
          }
          cursor: pointer;
          outline: none;
          border: none;
          background: transparent;
          margin-bottom: 10px;
        `} onClick={() => navigate('/')}>
          <i className='icon ion-ios-arrow-back' />
          <span>Back</span>
        </button>
        <FormContact defaultValue={defaultValue} />
      </div>
      <Navigation />
    </>
  );
}

export default DetailContainer
