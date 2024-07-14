import { ColumnDef } from "@tanstack/react-table";
import { UserFlow } from "./data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Button } from "src/components/ui/button";
import { RiMoreFill } from "react-icons/ri";
import moment from "moment";
import { Checkbox } from "src/components/ui/checkbox";

export const columns: ColumnDef<UserFlow>[] = [
    {
        id: "select",
        size: 10,
        header: ({ table }) => (
            <div className="pl-2 flex items-center justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="pl-2 flex items-center justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        size: 300,
        header: () => <div className="">Flow Name</div>,
        cell: ({ row }) => {
            return <div className="">{row.original.name}</div>;
        },
    },
    {
        accessorKey: "steps",
        size: 10,
        header: "Steps",
        cell: ({ row }) => <div>{row.original.steps.length}</div>,
    },
    {
        accessorKey: "createdAt",
        size: 60,
        header: "Created",
        cell: ({ row }) => moment(row.original.createdAt).fromNow(),
    },
    {
        id: "actions",
        size: 60,
        cell: ({ row }) => {
            const flow = row.original;
            return (
                <div className="flex gap-4 items-end justify-end pr-8">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <RiMoreFill className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => console.log("Edit", flow.id)}
                            >
                                Edit Flow
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    console.log("Create Spec", flow.id)
                                }
                            >
                                Create Spec
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => console.log("Delete", flow.id)}
                            >
                                Delete Flow
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
