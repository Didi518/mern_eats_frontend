import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser, useUpdateMyUser } from "@/api/myUserApi";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (isGetLoading) {
    return <span>Chargement...</span>;
  }

  if (!currentUser) {
    return <span>Récupération des données utilisateur impossible</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
