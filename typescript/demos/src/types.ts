type Info = {
  name: string;
  id: number;
  email: string;
  phone?: number;
};

type AdminInfoList = Info & {
  role: string;
  lastLogin: Date;
};

export { type Info, type AdminInfoList };
