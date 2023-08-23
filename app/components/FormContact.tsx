import React, { useState, Fragment } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { css } from '@emotion/css'
import { addContact, PayloadTypes, editContact, editPhoneNumber, addPhoneNumber, deleteContact } from 'services/persons'
import { toast } from 'react-toastify'
import { useLayoutContext } from 'components/Layout'

export type PayloadType = {
  first_name: string;
  last_name: string;
  phones: string[];
}

export const FormContact = ({ defaultValue }: { defaultValue?: PayloadType }) => {
  const { navigate, id } = useLayoutContext();
  const [totalNumber, setTotalNumber] = useState<number>(defaultValue?.phones.length || 0);
  const [submitContact] = addContact();
  const [saveContact] = editContact();
  const [savePhoneNumber] = editPhoneNumber();
  const [addNumber] = addPhoneNumber();
  const [removeContact] = deleteContact();

  const actionAddContact = async (values: PayloadTypes) => {
    try {
      await submitContact({ variables: values })
      toast.success('Add Contact Success', { onClose: () => navigate('/') })
    } catch (err) {
      toast.error('Failed to add contact')
    }
  }

  const actionEditContact = async (values: PayloadTypes) => {
    const { phones, ...others } = values;
    try {
      await saveContact({ variables: { id: Number(id), _set: others } })
      toast.success('Edit Contact Success', { onClose: () => navigate('/') })
    } catch (err) {
      toast.error('Failed to edit contact')
    }
  }

  const actionEditPhoneNumber = async (oldNumber: string, newNumber: string) => {
    try {
      await savePhoneNumber({ variables: {
        pk_columns: {
          number: oldNumber,
          contact_id: Number(id)
        },
        new_phone_number: newNumber
      } })
      toast.success('Edit Phone Number Success')
    } catch (err) {
      toast.error('Failed to edit phone number')
    }
  }

  const actionAddPhoneNumber = async (phone: string) => {
    try {
      await addNumber({ variables: {
        contact_id: Number(id),
        phone_number: phone
      } })
      toast.success('Add Phone Number Success')
    } catch (err) {
      toast.error('Failed to add phone number')
    }
  }

  const actionDeleteContact = () => {
    toast.error('Click to delete', { onClick: async () => {
      try {
        await removeContact({ variables: { id: Number(id) } });
        toast.success('Delete Contact Success', { onClose: () => navigate('/') })
      } catch (err) {
        toast.error('Failed to delete contact')
      }
    }})
  }

  const onSubmit = async (values: PayloadType) => {
    const payload: PayloadTypes = {
      ...values,
      ...{
        phones: values.phones.map((phone: string) => {
          return { number: phone };
        })
      }
    };
    if (id) actionEditContact(payload);
    else actionAddContact(payload);
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        first_name: defaultValue?.first_name || '',
        last_name: defaultValue?.last_name || '',
        phones: defaultValue?.phones || [],
      }}
      validationSchema={yup.object({
        first_name: yup.string().required('First Name is required'),
        last_name: yup.string().required('Last Name is requried'),
        phones: yup.array().of(yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid format Phone Number').required("Phone Number is required")).min(1, 'Phone Number is required').required("Phone Number is required")
      })}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleSubmit, setFieldValue, errors, setValues }) => {
        return (
          <form
            onSubmit={e => {
              handleSubmit(e);
            }}
            className={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              input {
                margin-top: 10px;
                outline: none;
                padding: 5px;
              }
              button {
                margin-top: 10px;
                cursor: pointer;
              }
            `}
          >
            <div className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              span {
                color: #c2c2c2;
              }
            `}>
              <span>{id ? 'Edit Contact' : 'Add New Contact'}</span>
            </div>
            <input value={values.first_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('first_name', e.target.value)} type='text' name='first_name' placeholder='First Name' />
            {errors.first_name && <span className={css`
              color: red;
              font-size: 0.8rem;
              margin-top: 5px;
            `}>{errors.first_name}</span>}
            <input value={values.last_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('last_name', e.target.value)} type='text' name='last_name' placeholder='Last Name' />
            {errors.last_name && <span className={css`
              color: red;
              font-size: 0.8rem;
              margin-top: 5px;
            `}>{errors.last_name}</span>}
            <div className={css`
              display: flex;
              flex-direction: column;
              width: 100%;
              input {
                margin-top: 0px !important;
              }
            `}>
              {Array.from(Array(totalNumber).keys()).map((idx: number) => (
                <Fragment key={`phone[${idx}]`}>
                  <div className={css`
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: center;
                    i {
                      font-size: 2rem;
                      cursor: pointer;
                      margin-left: 5px;
                    }
                    margin-top: 10px;
                  `}>
                    <input type='tel' value={values.phones[idx] || ''} name={`phones[${idx}]`} className={css`
                      width: 100%;
                    `} placeholder='Phone Number' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(`phones[${idx}]`, e.target.value)} />
                    <i className={`icon ${id ? 'ion-ios-save' : 'ion-ios-remove'} ${id ? css`color: green;` : css`color: red;`}`} onClick={() => {
                      if (!id) {
                        const newValues: string[] = values.phones;
                        delete newValues[idx];
                        setValues({
                          first_name: values.first_name,
                          last_name: values.last_name,
                          phones: newValues.filter((phone: string) => phone) as any
                        });
                        setTotalNumber(totalNumber - 1);
                      } else {
                        if (values.phones[idx]) {
                          if (idx > (defaultValue?.phones.length || 0) - 1) {
                            defaultValue?.phones.push(values.phones[idx]);
                            actionAddPhoneNumber(values.phones[idx]);
                          } else {
                            const oldNumber: string | undefined = defaultValue?.phones[idx];
                            actionEditPhoneNumber((oldNumber || '').toString(), values.phones[idx]);
                          }
                        }
                      }
                    }} />
                  </div>
                  {errors.phones && errors.phones !== 'Phone Number is required' && errors.phones[idx] && <span className={css`
                    color: red;
                    font-size: 0.8rem;
                    margin-top: 5px;
                  `}>{errors.phones[idx]}</span>}
                </Fragment>
              ))}
            </div>
            {errors.phones === 'Phone Number is required' && <span className={css`
              color: red;
              font-size: 0.8rem;
              margin-top: 5px;
            `}>{errors.phones}</span>}
            <button type='button' className={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              outline: none;
              cursor: pointer;
              border: none;
              background: transparent;
              color: #1d66dd;
            `} onClick={() => {
              setValues({
                first_name: values.first_name,
                last_name: values.last_name,
                phones: [...values.phones, ...['']] as any
              });
              setTotalNumber(totalNumber + 1);
            }}>
              Add New Number
            </button>
            <button type='submit' className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              background: #1d66dd;
              color: #ffffff;
              outline: none;
              border: none;
              padding: 10px;
            `}>Save</button>
            {id && <button type='button' className={css`
              display: flex;
              align-items: center;
              justify-content: center;
              background: red;
              color: #ffffff;
              outline: none;
              border: none;
              padding: 10px;
            `} onClick={actionDeleteContact}>Delete Contact</button>}
          </form>
        );
      }}
    </Formik>
  );
}
