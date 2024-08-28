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

export type TestRun = {
  id: string
  testName: string
  status: 'running' | 'success' | 'failed'
  startTime: string
  endTime: string
  duration: number // in seconds
  result: {
    totalTests: number
    passed: number
    failed: number
    skipped: number
  }
  logs: string
}

function formatDuration(seconds: number) {
  const duration = moment.duration(seconds, 'seconds')

  if (duration.asSeconds() < 60) {
    return duration.asSeconds() + ' second' + (duration.asSeconds() !== 1 ? 's' : '')
  } else if (duration.asMinutes() < 60) {
    return Math.floor(duration.asMinutes()) + ' minute' + (Math.floor(duration.asMinutes()) !== 1 ? 's' : '')
  } else {
    return Math.floor(duration.asHours()) + ' hour' + (Math.floor(duration.asHours()) !== 1 ? 's' : '')
  }
}

export const columns: ColumnDef<TestRun>[] = [
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
    accessorKey: 'testName',
    size: 300,
    header: () => <div className="">Test Name</div>,
    cell: ({ row }) => {
      return <div className="">{row.original.testName}</div>
    }
  },
  {
    accessorKey: 'status',
    size: 80,
    header: 'Status'
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    size: 100,
    cell: ({ row }) => {
      return moment(row.original.startTime).fromNow()
    }
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    size: 60,
    cell: ({ row }) => {
      return formatDuration(row.original.duration)
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(run.id)}>Copy Run ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Rerun Test</DropdownMenuItem>
              <DropdownMenuItem>Compare with Previous Run</DropdownMenuItem>
              <DropdownMenuItem>Download Results</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
