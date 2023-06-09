import React, { Component } from 'react';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { Layout } from './GlobalStyle/Layout/Layout.styled';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  static defaultProps = {
    initialContacts: [],
  };

  static propTypes = {
    initialContacts: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    contacts: this.props.initialContacts,
    filter: '',
  };

  addContact = (name, number) => {
    const normalizedName = name.toLowerCase();

    const currentName = this.state.contacts.find(
      item => item.name.toLowerCase() === normalizedName
    );

    if (normalizedName === currentName.name.toLowerCase()) {
      // if (currentName && name === currentName.name) {
      alert(`${name} is already exist!`);
      return;
    }

    this.setState(prevState => ({
      contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
    }));
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;

    const normalizedCaseContacts = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedCaseContacts)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <Layout>
        <Section title="Add contact">
          <ContactForm onSubmit={this.addContact} />
        </Section>
        {contacts.length > 0 && (
          <Section
            title="Contacts"
            headerContent={
              <Filter value={filter} onChange={this.changeFilter} />
            }
          >
            <ContactList
              contacts={filteredContacts}
              onRemove={this.removeContact}
            />
          </Section>
        )}

        <GlobalStyle />
      </Layout>
    );
  }
}
