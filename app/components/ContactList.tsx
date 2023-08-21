import React from 'react'
import { getContact, PersonType, PhoneType } from 'services/persons'
import Skeleton from 'react-loading-skeleton'
import { css } from '@emotion/css';
import { useHomeContext } from 'containers'
import { useRouter } from 'next/navigation'

export const ContactList = () => {
  const { search } = useHomeContext();
  const { data } = getContact();
  const router = useRouter();

  const findPhone = (phones: PhoneType[]) => {
    return phones.findIndex((phone: PhoneType) => phone.number.toLowerCase().includes(search.toLowerCase())) > -1;
  };

  const filterData = (listPerson: PersonType[]) => {
    return listPerson.filter((thisPerson: PersonType) => {
      const fullName: string = `${thisPerson.first_name} ${thisPerson.last_name}`;
      const phoneExist = findPhone(thisPerson.phones);

      if (search && (!fullName.toLowerCase().includes(search.toLowerCase()) && !phoneExist)) return false;
      return true;
    });
  };

  return (
    <div className={css`
      display: flex;
      flex-direction: column;
      padding: 1rem;
      overflow: auto;
      height: 100%;
      width: 100%;
    `}>
      <div className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 15%);
        color: #c2c2c2;
        font-weight: bold;
        font-size: 1rem;
        padding: 1rem;
      `}>
        <span className={css`flex: 1`}>Name</span>
        <span className={css`flex: 1`}>Phone Number</span>
      </div>
      {!data || !data.contact ? <Skeleton count={10} /> :
        filterData(data.contact).map((person: PersonType) => (
          <button className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 1rem;
            padding: 1rem;
            cursor: pointer;
            &:hover {
              background: #c2c2c2;
            }
            outline: none;
            background: transparent;
            border: none;
            text-align: left;
          `} key={person.id} type='button' onClick={() => router.push(`/${person.id}`)}>
            <span className={css`
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}>{person.first_name} {person.last_name}</span>
            <span className={css`
              flex: 1;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}>{person?.phones[0]?.number}</span>
          </button>
        ))
      }
    </div>
  );
}
