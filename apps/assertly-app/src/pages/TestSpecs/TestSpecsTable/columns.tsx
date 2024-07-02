import { ColumnDef } from "@tanstack/react-table"
import { TestSpec } from "./data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu"
import { Button } from "src/components/ui/button"
import { RiMoreFill, RiPlayLargeFill } from "react-icons/ri"
import moment from "moment"
import { Checkbox } from "src/components/ui/checkbox"

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
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
            return <div className="">{row.original.name}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "lastRanAt",
        header: "Last Run",
        size: 60,
        cell: ({ row }) => {
            return (moment(row.original.lastRanAt).fromNow())
        },
    },
    {
        id: "actions",
        size: 20,
        cell: ({ row }) => {
            const spec = row.original
            return (
                <div className="flex gap-4 items-end justify-end pr-8">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <RiPlayLargeFill className="h-4 w-4 " />
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
                                onClick={() => navigator.clipboard.writeText(spec.id)}
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
            )
        },
    },
]
