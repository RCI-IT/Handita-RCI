import { FormValues } from "@/types/formValues";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottom: 4,
    borderBottomColor: '#18529E',
  },
  address: {
    width: '45%',
    flexDirection: 'column',
  },
  logo: {
    width: 140,
    height: 40,
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#18529E',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'column',
    marginLeft: 10,
  },
});

const PDF = ({ dataform }: any) => {

  return (
    <Document>
      <Page>
        <View style={styles.container}>
          <View style={styles.address}>
            {/* Uncomment the following Image component if you want to add the logo */}
            {/* <Image style={styles.logo} src={logo2} /> */}
            <View>
              <Text>Jl. Alumunium Perumahan Gatsu Town House, A05</Text>
              <Text>No.RT.00, Sei Sikambing C.II, Kec. Medan Helvetia,</Text>
              <Text>Kota Medan, Sumatera Utara 20123</Text>
            </View>
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>PURCHASE ORDER</Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text>Tanggal:</Text>
              <Text>{dataform.tanggal}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text>Nomor PO:</Text>
              <Text>{dataform.nomorPO}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text>Nomor PL:</Text>
              <Text>{dataform.nomorPL}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text>Nomor Kontrak:</Text>
              <Text>{dataform.nomorKontrak}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;

