import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  // Define your styles here
  // Example: 
  page: { margin: 20, backgroundColor: 'white' },
  section: { margin: 10 },
  title: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 6 },
  table: { flexDirection: 'row', borderBottomWidth: 1, alignItems: 'center' },
  tableCell: { flex: 1, padding: 6 },
  tableHeader: { backgroundColor: '#18529E', color: 'white' },
});



// Create Document Component
const MyDocument = () => (
  <Document>
    
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>PURCHASE ORDER</Text>
          <View style={styles.table}>
            <View style={styles.tableCell}>Tanggal</View>
            <View style={styles.tableCell}>:data.tanggal</View>
            <View style={styles.tableCell}>Nomor PO</View>
            <View style={styles.tableCell}>:data.nomorPO</View>
          </View>
          {/* Add more table rows as needed */}
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>SUPPLIER</Text>
          <View style={styles.table}>
            <View style={styles.tableCell}>Code</View>
            <View style={styles.tableCell}>:data.supplierCode</View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableCell}>Nama</View>
            <View style={styles.tableCell}>:data.namaSupplier</View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableCell}>Alamat</View>
            <View style={styles.tableCell}>:data.alamat</View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableCell}>No. Telp</View>
            <View style={styles.tableCell}>:data.noTelephone</View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableCell}>Reference</View>
            <View style={styles.tableCell}>:data.referensi</View>
          </View>
        </View>
        {/* Add the table for item details here */}
        <View style={styles.section}>
          {/* Terbilang */}
          <Text>Terbilang: data.terbilang</Text>
        </View>
      </Page>
    </Document>
  </Document>
);

const POPdf = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

export default POPdf;
