import { Calc } from "@/types/formValues";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import logo2 from "../../../../../public/assets/logo-2.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottom: 4,
    borderBottomColor: '#18529E',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  logo: {
    marginVertical: 15,
    width: 140,
    height: 40,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: '#1F4E78',
  },
  // text: {
  //   fontSize: 12,
  //   marginBottom: 6,
  // },
  dokumenDetail: {
    display: "flex",
    border: "1px solid",
    width: '35%',
  },
  dokDetail: {
    display: "flex",
    flexDirection: 'row',
    width: '100%',
  },
  detailForm: {
    width: '30%',
  },

  content: {
    padding: 25,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1d4679',
    borderBottomStyle: 'solid',
    justifyContent: 'space-evenly',
  },
  tableCell: {
    padding: '10px',
  },
  tableHeader: {
    backgroundColor: '#18529E',
    color: 'white',
  },
  totalRow: {
    borderTopWidth: 4,
    borderTopColor: '#1d4679',
    borderTopStyle: 'solid',
  },
  totalCell: {
    backgroundColor: '#C8C8C8',
    color: '#282828',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  note: {
    marginTop: 10,
  },


  container: {
    border: 1,
    borderColor: '#282828',
    width: '100%',
  },

});

const PDF: React.FC<{
  data: Calc;
}> = ({ data }) => {

  return (
    <Document>
      {/** Page defines a single page of content. */}
      <Page size="A4" style={styles.body}>
        <View style={styles.header}>
          <View>
            {/* <Image
              style={styles.logo}
              src={logo2}
              alt="logo"
            /> */}
            <Text>Jl. Alumunium Perumahan Gatsu Town House, A05 </Text>
            <Text>No.RT.00, Sei Sikambing C.II, Kec. Medan Helvetia,</Text>
            <Text>Kota Medan, Sumatera Utara 20123</Text>
          </View>
          <View style={styles.dokumenDetail}>
            <Text style={styles.title}>PURCHASE ORDER</Text>
            <View style={styles.dokDetail}>
              <View style={styles.detailForm}>
                <Text>Date</Text>
                <Text>PO Number</Text>
                <Text>PL Number</Text>
                <Text>No. Kontrak</Text>
              </View>
              <View>
                <Text>: {data.tanggal}</Text>
                <Text>: {data.nomorPO}</Text>
                <Text>: {data.nomorPL}</Text>
                <Text>: {data.nomorKontrak}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.dokumenDetail}>
            <Text>SUPPLIER</Text>
            <View style={styles.dokDetail}>
              <View style={styles.detailForm}>
                <Text>Name</Text>
                <Text>Address</Text>
                <Text>Phone</Text>
                <Text>Reference</Text>
              </View>
              <View>
                <Text>: {data.namaSupplier}</Text>
                <Text>: {data.alamat}</Text>
                <Text>: {data.noTelephone}</Text>
                <Text>: {data.referensi}</Text>
              </View>
            </View>
          </View>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { width: '10%' }]}>Item#</Text>
              <Text style={[styles.tableCell, { width: '30%' }]}>Deskripsi</Text>
              <Text style={[styles.tableCell, { width: '10%' }]}>Code Budget</Text>
              <Text style={[styles.tableCell, { width: '10%' }]}>Qty</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>Harga</Text>
              <Text style={[styles.tableCell, { width: '20%' }]}>Total</Text>
            </View>
            {data.detailPembelian.map((value, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '10%' }]}>{index + 1}</Text>
                <Text style={[styles.tableCell, { width: '30%' }]}>{value.deskripsi}</Text>2
                <Text style={[styles.tableCell, { width: '10%' }]}>{value.kodeBudget}</Text>
                <Text style={[styles.tableCell, { width: '10%' }]}>{value.kuantitas}</Text>
                <Text style={[styles.tableCell, { width: '20%' }]}>{value.harga}</Text>
                <Text style={[styles.tableCell, { width: '20%' }]}>{value.total}</Text>
              </View>
            ))}
          </View>
          <View style={styles.tableFooter}>
            <View style={[{ width: '60%' }]}>
              <Text style={{ paddingVertical: '4px', width: '100%', backgroundColor: '#1d4679', color: 'white' }}>Terbilang : </Text>
              <Text style={{ marginVertical: '4px' }}>{data.terbilang}</Text>
            </View>
            <View style={[{ width: '40%', display: 'flex', flexDirection: 'row' }]}>
              <View style={[{ width: '50%' }]}>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>Subtotal</Text>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>Pajak</Text>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>Total</Text>
              </View>
              <View style={[{ width: '50%', textAlign: 'center', backgroundColor: '#c8c8c8' }]}>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>{data.subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0"}</Text>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>{data.pajak || 0}</Text>
                <Text style={{ marginVertical: '4px', marginHorizontal: '2px' }}>{data.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0"}</Text>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <Text style={{ width: '75%' }}>Reka Cipta Inovasi</Text>
              <Text>Vendor</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', height: '112px' }}>
              <Text style={{ width: '25%' }}>Dibuat</Text>
              <Text style={{ width: '25%' }}>Check</Text>
              <Text style={{ width: '25%' }}>Disetujui</Text>
            </View>

            <View style={{ flexDirection: 'row', width: '100%' }}>
              <View style={{ width: '25%' }}>
                <Text>Procurement</Text>
                <Text>Date : </Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text>Keuangan</Text>
                <Text>Date : </Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text>Direksi</Text>
                <Text>Date : </Text>
              </View>
              <View style={{ width: '25%' }}>
                <Text>Pelaksana</Text>
                <Text>Date : </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;

