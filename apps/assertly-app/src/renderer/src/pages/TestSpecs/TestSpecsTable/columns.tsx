import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { Button } from '@renderer/components/ui/button'
import { RiMoreFill, RiPlayLargeFill } from 'react-icons/ri'
import moment from 'moment'
import { Checkbox } from '@renderer/components/ui/checkbox'
import { Badge } from '@renderer/components/ui/badge'
import { Link } from 'react-router-dom'
import { TestSpec } from '../TestSpecs'
import { useAtom } from 'jotai'
import { deleteTestSpecAtom, selectedTestSpecIdAtom } from '@renderer/store/test-specs/testSpecs'
import { useEffect, useState } from 'react'

export const columns: ColumnDef<TestSpec>[] = [
  {
    id: 'select',
    size: 10,
    header: ({ table }) => (
      <div className="pl-2  flex items-center justify-center">
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
      const [, setSelectedTestSpecId] = useAtom(selectedTestSpecIdAtom)
      return (
        <Link
          to={'/specs/' + row.original.id}
          onClick={() => setSelectedTestSpecId(row.original.id)}
          className="hover:underline font-medium"
        >
          {row.original.name}
        </Link>
      )
    }
  },
  {
    id: 'actions',
    size: 20,
    cell: ({ row }) => {
      const [{ mutate, status }] = useAtom(deleteTestSpecAtom)
      const [open, setOpen] = useState(false)
      const spec = row.original
      const handleDelete = async () => {
        try {
          mutate({
            id: spec.id,
            where: {
              id: row.original.id
            }
          })
        } catch (e) {
          console.error(e)
        }
      }
      useEffect(() => {
        if (status === 'success' || status === 'error') {
          setOpen(false)
        }
      }, [status])

      return (
        <div className="flex gap-4 items-center justify-end pr-8">
          <div className="flex items-center justify-between gap-2">
            {row.original.status === 'failed' && (
              <Badge variant="outline">
                <div className="rounded-full bg-red-500 w-2 h-2 mr-2"></div>
                Failed
              </Badge>
            )}

            {row.original.status === 'success' && (
              <Badge variant="outline">
                <div className="rounded-full bg-green-500 w-2 h-2 mr-2"></div>
                Passed
              </Badge>
            )}
            <span className="mx-2">{moment(row.original.updatedAt).fromNow()}</span>
          </div>
          <Button variant="outline" size={'sm'}>
            <RiPlayLargeFill className="text-green-500 mr-2" />
            <span>Run</span>
          </Button>
          <DropdownMenu
            open={open}
            onOpenChange={(o) => {
              if (status === 'pending') return
              setOpen(o)
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <RiMoreFill className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Run Test</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(spec.id)}>Copy Link</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clone Spec</DropdownMenuItem>
              <DropdownMenuItem>Edit Spec</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>
                {status === 'pending' ? 'Deleting...' : 'Delete'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  }
]
