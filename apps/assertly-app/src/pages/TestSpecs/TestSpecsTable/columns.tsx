import { ColumnDef } from "@tanstack/react-table";
import { TestSpec } from "./data";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Button } from "src/components/ui/button";
import { RiMoreFill, RiPlayLargeFill } from "react-icons/ri";
import moment from "moment";
import { Checkbox } from "src/components/ui/checkbox";
import { Badge } from "src/components/ui/badge";
import { Link } from "react-router-dom";

export const columns: ColumnDef<TestSpec>[] = [
    {
        id: "select",
        size: 10,
        header: ({ table }) => (
            <div className="pl-2  flex items-center justify-center">
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
        header: () => <div className="">Name</div>,
        cell: ({ row }) => {
            return (
                <Link
                    to={"/specs/" + row.original.id}
                    className="hover:underline"
                >
                    {row.original.name}
                </Link>
            );
        },
    },
    {
        id: "actions",
        size: 20,
        cell: ({ row }) => {
            const spec = row.original;
            return (
                <div className="flex gap-4 items-end justify-end pr-8">
                    <div className="flex items-center justify-between gap-2">
                        {row.original.status === "failed" && (
                            <Badge variant="outline">
                                <div className="rounded-full bg-red-500 w-2 h-2 mr-2"></div>
                                Failed
                            </Badge>
                        )}

                        {row.original.status === "success" && (
                            <Badge variant="outline">
                                <div className="rounded-full bg-green-500 w-2 h-2 mr-2"></div>
                                Passed
                            </Badge>
                        )}
                        <span className="mx-2">
                            {moment(row.original.updatedAt).fromNow()}
                        </span>
                    </div>
                    <Button variant="secondary" size={"sm"}>
                        <RiPlayLargeFill className="h-4 w-4 text-green-500 mr-2" />
                        <span>Run</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <RiMoreFill className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Run Test</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(spec.id)
                                }
                            >
                                Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Clone Spec</DropdownMenuItem>
                            <DropdownMenuItem>Edit Spec</DropdownMenuItem>
                            <DropdownMenuItem>Delete Spec</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
