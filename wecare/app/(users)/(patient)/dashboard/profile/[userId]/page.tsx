import ProfileUI from "@/components/ProfileUI";

export default function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  return <ProfileUI userId={params.userId} />;
}
