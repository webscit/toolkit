import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@webscit/registry";
import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableRow as ShadcnTableRow,
  TableHead as ShadcnTableHead,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption,
} from "@/components/ui/table";

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    status: "Paid",
    method: "Credit Card",
    amount: "$450.00",
  },
];

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead style={{ textAlign: "right" }}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell>{inv.invoice}</TableCell>
            <TableCell>{inv.status}</TableCell>
            <TableCell>{inv.method}</TableCell>
            <TableCell style={{ textAlign: "right" }}>{inv.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell style={{ textAlign: "right" }}>$1,200.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnTable>
          <ShadcnTableCaption>A list of recent invoices.</ShadcnTableCaption>
          <ShadcnTableHeader>
            <ShadcnTableRow>
              <ShadcnTableHead>Invoice</ShadcnTableHead>
              <ShadcnTableHead>Status</ShadcnTableHead>
              <ShadcnTableHead>Method</ShadcnTableHead>
              <ShadcnTableHead style={{ textAlign: "right" }}>Amount</ShadcnTableHead>
            </ShadcnTableRow>
          </ShadcnTableHeader>
          <ShadcnTableBody>
            {invoices.map((inv) => (
              <ShadcnTableRow key={inv.invoice}>
                <ShadcnTableCell>{inv.invoice}</ShadcnTableCell>
                <ShadcnTableCell>{inv.status}</ShadcnTableCell>
                <ShadcnTableCell>{inv.method}</ShadcnTableCell>
                <ShadcnTableCell style={{ textAlign: "right" }}>{inv.amount}</ShadcnTableCell>
              </ShadcnTableRow>
            ))}
          </ShadcnTableBody>
          <ShadcnTableFooter>
            <ShadcnTableRow>
              <ShadcnTableCell colSpan={3}>Total</ShadcnTableCell>
              <ShadcnTableCell style={{ textAlign: "right" }}>$1,200.00</ShadcnTableCell>
            </ShadcnTableRow>
          </ShadcnTableFooter>
        </ShadcnTable>
      ),
    },
  },
};
