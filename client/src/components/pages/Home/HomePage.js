import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Page, Wrapper, Button, Loader, Filebase } from 'jdb-components';

import { useGlobalState, useTheme } from '../../../store/GlobalState';
import { uploadFile } from '../../../store/ducks/file';
const HomePage = props => {
  const [
    {
      file: { file, isLoading: fileIsLoading },
      user: { user, isLoading: userIsLoading },
    },
    dispatch,
  ] = useGlobalState();
  const theme = useTheme();
  const notify = () => toast('Wow so easy !');
  const getBaseFile = data => {
    const formData = new FormData();
    formData.append('test-image', data);
    uploadFile(dispatch, user, formData);
  };
  return (
    <Page>
      <Wrapper>
        <Loader theme={theme} isLoading={userIsLoading}>
          <span>I'm the Home Page</span>
          {user.details.email}
          <Loader theme={theme} isLoading={fileIsLoading}>
            {file && file.url ? (
              <Wrapper height="500px" width="500px">
                <img alt="uploaded result" src={file.url} />
              </Wrapper>
            ) : (
              <form encType="multipart/form-data">
                <Filebase name="test-image" onDone={getBaseFile} />
              </form>
            )}
          </Loader>
          <Button theme={theme} onClick={notify} message={'stuff'} />
        </Loader>
      </Wrapper>
    </Page>
  );
};

export default HomePage;
