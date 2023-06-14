import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

import {
  Form,
  LabelContainer,
  Label,
  InputContainer,
  Input,
  Button,
} from './ContactForm.styled';

export class ContactForm extends Component {
  contactId = nanoid();

  state = {
    name: '',
    number: '',
  };
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   onSubmit(
  //     e.currentTarget.elements.name.value,
  //     e.currentTarget.elements.number.value,
  //     (e.currentTarget.elements.name.value = ''),
  //     (e.currentTarget.elements.number.value = '')
  //   );
  // };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    // console.log(name, value);
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <InputContainer>
          <LabelContainer>
            <Input
              type="text"
              id={this.contactId}
              name="name"
              value={name}
              placeholder=" "
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
            ></Input>
            <Label htmlFor="name">Name</Label>
          </LabelContainer>

          <LabelContainer>
            <Input
              type="tel"
              id="number"
              name="number"
              value={number}
              placeholder=" "
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
            ></Input>
            <Label>Number</Label>
          </LabelContainer>
        </InputContainer>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
