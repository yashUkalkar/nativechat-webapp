type UserDataType = {
  id: string;
  username: string;
  profileImage: string | null;
  autoTranslate: boolean;
  translateLanguage: string;
};

interface AuthResponseType extends UserDataType {
  accessToken: string;
}

export type { AuthResponseType, UserDataType };
