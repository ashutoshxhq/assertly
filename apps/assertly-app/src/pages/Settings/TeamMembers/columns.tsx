import { ColumnDef } from "@tanstack/react-table";
import { TeamMember } from "./data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Button } from "src/components/ui/button";
import { RiLoopRightLine, RiMoreFill } from "react-icons/ri";
import { Checkbox } from "src/components/ui/checkbox";

export const columns: ColumnDef<TeamMember>[] = [
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
        accessorKey: "sNo",
        size: 40,
        header: () => <div className="">S.No</div>,
        cell: ({ row }) => {
            return <div className="">{row.original.sNo}</div>;
        },
    },
    {
        accessorKey: "id",
        size: 200,
        header: "Member Id",
        cell: ({row}) => {
            return <div className="">{row.original.id}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        size: 100,
        cell: ({ row }) => {
            return <div className="">{row.original.name}</div>;
        },
    },
    {
        accessorKey: "role",
        header: "Role",
        size: 40,
        cell: ({ row }) => {
            return <div className="">{row.original.role}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 40,
        cell: ({ row }) => {
            return <div className="">{row.original.status}</div>;
        },
    },
    {
        accessorKey: "lastActive",
        header: "Last Active",
        size: 100,
        cell: ({ row }) => {
            return <div className="">{row.original.lastActive}</div>;
        },
    },
    {
        id: "actions",
        size: 60,
        cell: ({ row }) => {
            const member = row.original;
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
                                onClick={() =>
                                    navigator.clipboard.writeText(member.id)
                                }
                            >
                                Copy Member ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            <DropdownMenuItem>
                                Disable Member
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Re-invite Member
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
