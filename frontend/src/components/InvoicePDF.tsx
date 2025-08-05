// InvoicePDF.tsx
import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
    header: { marginBottom: 10, fontSize: 18 },
    itemRow: { flexDirection: "row", marginBottom: 4 },
    col: { width: "33%" },
});

export const InvoiceDocument = ({ order }: any) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Invoice #{order._id.slice(-5)}</Text>
            {order.items.map((item: any, i: number) => (
                <View key={i} style={styles.itemRow}>
                    <Text style={styles.col}>{item.name}</Text>
                    <Text style={styles.col}>{item.quantity}</Text>
                    <Text style={styles.col}>₹{item.price.toFixed(2)}</Text>
                </View>
            ))}
            <Text>Total: ₹{order.total?.toFixed(2)}</Text>
        </Page>
    </Document>
);



