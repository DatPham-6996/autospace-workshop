'use client'
import { useTakeSkip } from '@autospace/util/hooks/pagination'
import { useQuery } from '@apollo/client'
import { AdminsDocument } from '@autospace/network/src/gql/generated'
import { ShowData } from '../organisms/ShowData'
import { AdminCard } from '../organisms/admin/AdminCard'
import { RemoveAdminButton } from '../organisms/admin/RemoveAdminButton'
import { CreateAdmin } from '../organisms/admin/CreateAdmin'

export function ManageAdmins() {
  const { setSkip, setTake, skip, take } = useTakeSkip(0)

  const { data, loading } = useQuery(AdminsDocument, {
    variables: { skip, take },
  })

  return (
    <div className="relative min-h-screen">
      {/* Main background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Im-2.svg"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-end">
          <CreateAdmin />
        </div>
        <ShowData
          loading={loading}
          pagination={{
            skip,
            take,
            resultCount: data?.admins.length,
            totalCount: data?.adminsCount,
            setSkip,
            setTake,
          }}
          title={'Manage admins'}
        >
          {data?.admins.map((admin) => (
            <div key={admin.uid} className="pl-0.5 border-l-2 border-primary">
              <div className="flex items-center gap-4 bg-white rounded-lg p-4 mb-4">
                <img
                  src="/Logo.svg"
                  alt="Logo"
                  className="w-16 h-16"
                />
                <div className="flex-1">
                  <AdminCard admin={admin}>
                    <div className="flex justify-end">
                      <RemoveAdminButton uid={admin.uid} />
                    </div>
                  </AdminCard>
                </div>
              </div>
            </div>
          ))}
        </ShowData>
      </div>
    </div>
  )
}
