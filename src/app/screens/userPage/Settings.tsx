import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Button from '@mui/material/Button';
import { useGlobals } from '../../hooks/useGlobals';
import { T } from '../../../lib/types/common';
import { MemberUpdateInput } from '../../../lib/types/member';
import MemberService from '../../services/MemberService';
import { Messages, serverApi } from '../../../lib/config';
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
  sweetTopSuccessAlert,
} from '../../../lib/sweetAlert';

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : '/icons/default-user.svg',
  );

  // const [memberImage, setMemberImage] = useState<File | null>(null);
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick ?? '',
      memberPhone: authMember?.memberPhone ?? '',
      memberAddress: authMember?.memberAddress ?? '',
      memberDesc: authMember?.memberDesc ?? '',
      memberImage: authMember?.memberImage ?? '',
    },
  );

  /** HANDLERS **/
  const handleImageViewer = (e: T) => {
    const file = e.target.files?.[0];
    console.log('file:', file);
    const fileType = file.type,
      validateImageType = ['image/jpg', 'image/jpeg', 'image/png'];

    if (!validateImageType.includes(fileType)) {
      sweetErrorHandling(Messages.error5).then();
    } else {
      if (file) {
        memberUpdateInput.memberImage = file;
        setMemberUpdateInput({ ...memberUpdateInput });
        setMemberImage(URL.createObjectURL(file));
      }
    }
  };

  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput, memberNick: e.target.value });
  };

  const memberPhoneHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput, memberPhone: e.target.value });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({
      ...memberUpdateInput,
      memberAddress: e.target.value,
    });
  };

  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput, memberDesc: e.target.value });
  };

  const handleSubmitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === '' ||
        memberUpdateInput.memberPhone === '' ||
        memberUpdateInput.memberAddress === '' ||
        memberUpdateInput.memberDesc === ''
      ) {
        throw new Error(Messages.error3);
      }
      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);

      setAuthMember(result);

      await sweetTopSmallSuccessAlert('Modified Successfully !', 700);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // // Rasm ko'rinishi: yangi tanlangan bo'lsa - o'sha, bo'lmasa - saqlangani, bo'lmasa - default
  // const imagePath = memberImage
  //   ? URL.createObjectURL(memberImage)
  //   : authMember?.memberImage
  //     ? `${serverApi}/${authMember.memberImage}`
  //     : '/icons/default-user.svg';

  // const handleSubmitButton = async () => {
  //   try {
  //     const input: MemberUpdateInput = { ...memberUpdate };
  //     if (memberImage) (input as any).memberImage = memberImage;

  //     const member = new MemberService();
  //     const result = await member.updateMember(input);

  //     setAuthMember(result);
  //     await sweetTopSuccessAlert('Modified successfully!', 700);
  //   } catch (err) {
  //     console.log(err);
  //     sweetErrorHandling(err).then();
  //   }
  // };

  return (
    <Box className={'settings'}>
      <Box className={'member-media-frame'}>
        <img src={memberImage} className={'mb-image'} alt="user" />
        <div className={'media-change-box'}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={'up-del-box'}>
            <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input
                type="file"
                hidden
                accept="image/jpeg, image/jpg, image/png"
              />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={'input-frame'}>
        <div className={'long-input'}>
          <label className={'spec-label'}>Username</label>
          <input
            className={'spec-input mb-nick'}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdateInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={'input-frame'}>
        <div className={'short-input'}>
          <label className={'spec-label'}>Phone</label>
          <input
            className={'spec-input mb-phone'}
            type="text"
            placeholder={authMember?.memberPhone ?? 'no phone'}
            value={memberUpdateInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={'short-input'}>
          <label className={'spec-label'}>Address</label>
          <input
            className={'spec-input  mb-address'}
            type="text"
            placeholder={
              authMember?.memberAddress
                ? authMember?.memberAddress
                : 'no address'
            }
            value={memberUpdateInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={'input-frame'}>
        <div className={'long-input'}>
          <label className={'spec-label'}>Description</label>
          <textarea
            className={'spec-textarea mb-description'}
            placeholder={
              authMember?.memberAddress
                ? authMember?.memberAddress
                : 'no description'
            }
            value={memberUpdateInput.memberDesc}
            name="memberDesc"
            onChange={memberDescHandler}
          />
        </div>
      </Box>
      <Box className={'save-box'}>
        <Button variant={'contained'} onClick={handleSubmitButton}>
          Save
        </Button>
      </Box>
    </Box>
  );
}
