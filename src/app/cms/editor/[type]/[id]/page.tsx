import { CMSEditor } from '@/components/cms/CMSEditor'

export default async function CMSEditorPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = await params
  return <CMSEditor type={type} id={id} />
}
