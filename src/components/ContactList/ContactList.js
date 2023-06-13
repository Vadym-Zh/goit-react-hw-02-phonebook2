import PropTypes from 'prop-types';

import {
  ContactsTable,
  ContactsTableHead,
  ContactsTableRow,
  ContactsTableCeil,
  ListBtn,
} from './ContactList.styled';

export const ContactList = ({ contacts, onRemove }) => {
  return (
    <>
      <ContactsTable>
        <ContactsTableHead>Name</ContactsTableHead>
        <ContactsTableHead>Phone number</ContactsTableHead>
        <ContactsTableHead>Contacts ({contacts.length})</ContactsTableHead>
      </ContactsTable>

      <div>
        {contacts.map(({ id, name, number }) => {
          return (
            <ContactsTableRow key={id}>
              <ContactsTableCeil>{name}</ContactsTableCeil>
              <ContactsTableCeil>{number}</ContactsTableCeil>
              <ContactsTableCeil>
                <ListBtn
                  type="button"
                  onClick={() => {
                    onRemove(id);
                  }}
                >
                  Delet
                </ListBtn>
              </ContactsTableCeil>
            </ContactsTableRow>
          );
        })}
      </div>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};
