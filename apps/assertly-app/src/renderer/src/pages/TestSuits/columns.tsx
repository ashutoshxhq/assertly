import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Button } from '@renderer/components/ui/button'
import { RiLoopRightLine, RiMoreFill } from 'react-icons/ri'
import moment from 'moment'
import { Checkbox } from '@renderer/components/ui/checkbox'

type Environment = {
  id: string
  name: string
  status: string | null
  teamId: string
  projectId: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<Environment>[] = [
  {
    id: 'select',
    size: 10,
    header: ({ table }) => (
      <div className="pl-2 flex items-center justify-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
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
    enableHiding: false
  },
  {
    accessorKey: 'name',
    size: 300,
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      return <div className="">{row.original.name}</div>
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 100,
    cell: ({ row }) => {
      return moment(row.original.createdAt).fromNow()
    }
  },
  {
    id: 'actions',
    size: 60,
    cell: ({ row }) => {
      const run = row.original
      return (
        <div className="flex gap-4 items-end justify-end pr-8">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <RiLoopRightLine className="h-4 w-4 " />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <RiMoreFill className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(run.id)}>Copy Session ID</DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
