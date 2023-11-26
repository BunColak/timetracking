import type { MetaFunction } from "@remix-run/node";
import { Plus } from "lucide-react";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { TableBody, TableCell, TableRow, Table, TableFooter } from "~/components/ui/table";

export const meta: MetaFunction = () => {
  return [
    { title: "Timetracking" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container mt-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Timesheet</CardTitle>
            <Button size="sm">Change Month</Button>
          </div>
          <CardDescription>November: 14hrs</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Week 1</h4>
            <Table className="mt-2 border-separate border-spacing-y-2">
              <TableBody>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
                  <TableCell className="pl-0">
                    <Button size='sm' variant="secondary">
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  </TableCell>
                  <TableCell colSpan={2} className="text-end text-secondary-foreground">Total: 8hr</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <Separator className="mt-2 my-4" />
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Week 1</h4>
            <Table className="mt-2 border-separate border-spacing-y-2">
              <TableBody>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
                <TableRow className="bg-gray-100">
                  <TableCell>Mon - 20/11</TableCell>
                  <TableCell>10:00 - 18:00</TableCell>
                  <TableCell>8hr</TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
                  <TableCell className="pl-0">
                    <Button size='sm' variant="secondary">
                      <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                  </TableCell>
                  <TableCell colSpan={2} className="text-end text-secondary-foreground">Total: 8hr</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <Separator className="mt-2 my-4" />
          <div className="flex justify-between items-center">
            <Button size='sm' variant="default">
              <Plus className="mr-2 h-4 w-4" /> Add Week
            </Button>
            <small className="text-end text-sm font-bold leading-none">Total: 70 hrs</small>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
