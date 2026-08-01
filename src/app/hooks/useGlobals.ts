import { createContext, useContext } from 'react';
import { Member } from '../../lib/types/member';

interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;

  orderBuilder: Date;
  setOrderBuilder: (date: Date) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
);

export const useGlobals = () => {
  // useGlobals orqali boshqa yerda biz setAuthMember va AuthMember larni qabul qila olamiz
  //context orqali qabul qilamiz.
  const context = useContext(GlobalContext);
  if (context === undefined) throw new Error('useGlobals within Provider ');
  return context;
};
