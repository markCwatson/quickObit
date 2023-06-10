import React from 'react';
import { Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { Person } from '@/types';

const styles = StyleSheet.create({
  body: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 40,
  },
  header: {
    fontSize: 10,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    margin: 12,
    textAlign: 'center',
  },
  image: {
    marginVertical: 5,
    marginHorizontal: 150,
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: 'justify',
  },
});

type Props = {
  person: Person | null;
  obit: string;
};

const MyDocument = ({ person, obit }: Props) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ Created with quickObit ~
      </Text>
      <Text style={styles.title}>{person?.name}</Text>
      <Text style={styles.subtitle}>
        {person?.dob} - {person?.dod}
      </Text>
      <Image style={styles.image} src="/logo.png" />
      <Text style={styles.text}>{obit}</Text>
    </Page>
  </Document>
);

export default MyDocument;
