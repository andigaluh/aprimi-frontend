import React from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },

    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: 40,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20
    },

    header: {
        display: "flex",
        flexDirection: "column",
        marginBottom: 20
    },

    image: {
        height: 45,
        width: 173,
        marginBottom: 20
    },

    viewTextSecretarial: {
        display: "block",
        width: 200,
        marginBottom: 20
    },

    textSecretarial: {
        fontSize: 10
    },

    viewTitle: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000",
        padding: 2,
        textAlign: "center",
        marginBottom: 5
    },

    textTitle: {
        fontSize: 12
    },

    viewReturnDate: {
        textAlign: "center"
    },

    textReturnDate: {
        fontSize: 12,
        fontStyle: "italic"
    },

    content: {
        marginBottom: 10
    },

    viewContentText: {
        marginBottom: 20
    },

    contentText: {
        fontSize: 10
    },

    viewTitleCompanyDetails: {
        textAlign: "center",
        marginBottom: 10
    },

    textTitleCompanyDetails: {
        fontSize: 12,
        fontWeight: "bold"
    },

    containerCompanyDetails: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#000000",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start"
    },

    formGroup: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 2,
        marginTop: 2,
        alignItems: "center"
    },

    label: {
        textAlign: "right",
        display: "block",
        width: 100,
    },

    textLabel: {
        fontSize: 10
    },

    input: {
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#000000",
        textAlign: "left",
        display: "block",
        width: "80%"
    },

    textLabelSignature: {
        height: 60
    },

    footer: {

    },

    textFooter: {
        fontSize: 10
    }

});

function PdfGenerateFile({ namePdf, addressPdf, phonePdf, faxPdf, contact_person_namePdf, contact_person_titlePdf, contact_person_phonePdf, contact_person_emailPdf, authorized_namePdf, authorized_titlePdf, returnDate, logo_path, year_now, secretarial_address, return_date_pdf_membership, title_pdf_membership, subtitle_pdf_membership, content_pdf_membership, text_company_details, footer_pdf_membership, idMembership }) {
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image style={styles.image} source={`${logo_path}`} />
              <View style={styles.viewTextSecretarial}>
                <Text style={styles.textSecretarial}>
                  Secretariat: {"\n\n"} GoWork {"\n"} Pondok Indah Office Tower{" "}
                  {"\n"} Tower 2, 15th Floor {"\n"} Jl. Sultan Iskandar Muda{" "}
                  {"\n"} Kavling VTA {"\n"} Jakarta 12310
                </Text>
              </View>
              <View style={styles.viewTitle}>
                <Text style={styles.textTitle}>
                  {title_pdf_membership} {year_now}
                </Text>
              </View>
              <View style={styles.viewReturnDate}>
                <Text style={styles.textReturnDate}>
                  {subtitle_pdf_membership} {returnDate}
                </Text>
              </View>
            </View>
            <View style={styles.content}>
              <View style={styles.viewContentText}>
                <Text style={styles.contentText}>{content_pdf_membership}</Text>
              </View>
              <View style={styles.viewTitleCompanyDetails}>
                <Text style={styles.textTitleCompanyDetails}>
                  {text_company_details}
                </Text>
              </View>
              <View style={styles.containerCompanyDetails}>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      ID Registration&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{idMembership}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Company&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{namePdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      Company Address&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{addressPdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      Company Phone&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{phonePdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      Company Fax&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{faxPdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      Contact Person&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>
                      {contact_person_namePdf}
                    </Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Function&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>
                      {contact_person_titlePdf}
                    </Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Email&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>
                      {contact_person_emailPdf}
                    </Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Mobile No&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>
                      {contact_person_phonePdf}
                    </Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>
                      Authorized by&nbsp;:&nbsp;
                    </Text>
                  </View>
                  <View>
                    <Text></Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Name&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{authorized_namePdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Function&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>{authorized_titlePdf}</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Date&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabel}>&nbsp;</Text>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <View style={styles.label}>
                    <Text style={styles.textLabel}>Signature&nbsp;:&nbsp;</Text>
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.textLabelSignature}>&nbsp;</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.textFooter}>{footer_pdf_membership}</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
}

export default PdfGenerateFile
