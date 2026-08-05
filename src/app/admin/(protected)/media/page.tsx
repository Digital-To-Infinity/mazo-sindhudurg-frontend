import MediaCrudManager from '@/components/admin/MediaCrudManager'

export default function AdminMediaPage() {
  return (
    <div className="space-y-8 p-6 md:p-10 max-w-[1600px] mx-auto bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl m-4 lg:m-6 shadow-sm border border-slate-200/60">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-black text-slate-900">Media Library</h1>
        <p className="text-slate-500 font-medium text-sm">Upload, search, and manage all your assets and files across folders.</p>
      </div>
      <MediaCrudManager folder="general" label="Site Assets & Photos" />
    </div>
  )
}
